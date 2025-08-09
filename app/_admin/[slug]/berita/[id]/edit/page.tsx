"use client";

import { useState, useEffect } from "react";
import { NewsForm } from "@/components/admin/NewsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { News } from "@/lib/types/backend"; // Import News schema

export default function EditNewsPage({ params }: { params: { slug: string; id: string } }) {
  const { slug: ormawaSlug, id: newsId } = params;
  const [initialNewsData, setInitialNewsData] = useState<News | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/news/${newsId}`, {
          headers: {
            // 'Authorization': `Bearer ${yourAuthTokenHere}` // TODO: Add actual token
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        const data = (await response.json()) as News;
        setInitialNewsData(data);
      } catch (err: unknown) {
        console.error("Error fetching news for edit:", err);
        if (err instanceof Error) {
          setError(`Gagal memuat data berita: ${err.message}. Pastikan backend berjalan dan ID berita valid.`);
        } else {
          setError("Gagal memuat data berita. Terjadi kesalahan tidak diketahui.");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchNewsData();
  }, [newsId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Memuat data berita...</p>
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

  if (!initialNewsData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Berita tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Berita</CardTitle>
        </CardHeader>
        <CardContent>
          <NewsForm initialData={initialNewsData} ormawaSlug={ormawaSlug} />
        </CardContent>
      </Card>
    </div>
  );
}