"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ContentDataTable, SimpleColumnDef } from "@/components/admin/ContentDataTable";
import { News } from "@/lib/types/backend";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // For Indonesian locale

// Define columns for the news table
const newsColumns: SimpleColumnDef<News>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "published",
    header: "Status",
    cell: (row: News) => (// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
      row.published ? "Published" : "Draft"),
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: (row: News) => (// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
      format(new Date(row.created_at), "dd MMMM yyyy", { locale: id })
    ),
  },
];

export default function AdminNewsPage({ params }: { params: { slug: string } }) {
  const { slug: ormawaSlug } = params;
  const router = useRouter();
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchNews();
  }, [ormawaSlug]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, you'd send the JWT token in the Authorization header
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/news/`, {
        headers: {
          // 'Authorization': `Bearer ${yourAuthTokenHere}`
          // For now, assuming backend allows access for testing or you're logged in
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }
      const data = (await response.json()) as News[];
      setNewsData(data);
    } catch (err: unknown) {
      console.error("Error fetching news:", err);
      if (err instanceof Error) {
        setError(`Gagal memuat berita: ${err.message}. Pastikan backend berjalan dan Anda terautentikasi.`);
      } else {
        setError("Gagal memuat berita. Terjadi kesalahan tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddNews = () => {
    router.push(`/admin/${ormawaSlug}/berita/baru`);
  };

  const handleEditNews = (id: string | number) => {
    router.push(`/admin/${ormawaSlug}/berita/${id}/edit`);
  };

  const handleDeleteNews = async (id: string | number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/admin/news/${id}`, {
        method: "DELETE",
        headers: {
          // 'Authorization': `Bearer ${yourAuthTokenHere}`
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete news: ${response.statusText}`);
      }
      alert("Berita berhasil dihapus!");
      void fetchNews(); // Refresh the list, explicitly ignore promise
    } catch (err: unknown) {
      console.error("Error deleting news:", err);
      if (err instanceof Error) {
        alert(`Gagal menghapus berita: ${err.message}. Pastikan backend berjalan dan Anda terautentikasi.`);
      } else {
        alert("Gagal menghapus berita. Terjadi kesalahan tidak diketahui.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Memuat berita...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col p-4 md:p-8">
      <ContentDataTable
        title={`Manajemen Berita ${ormawaSlug.toUpperCase()}`}
        addLabel="Tambah Berita Baru"
        columns={newsColumns}
        data={newsData}
        onAdd={handleAddNews}
        onEdit={handleEditNews}
        onDelete={(id) => { void handleDeleteNews(id); }}
      />
    </div>
  );
}