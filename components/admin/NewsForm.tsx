"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsCreate, NewsUpdate, News } from "@/lib/types/backend"; // Import schemas
import { Typography } from "@/components/ui/typography";

interface NewsFormProps {
  initialData?: News; // Optional: for editing existing news
  ormawaSlug: string;
}

export function NewsForm({ initialData, ormawaSlug }: NewsFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<NewsCreate | NewsUpdate>(
    initialData ? { ...initialData } : {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      published: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/news/${initialData.id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/news/`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${yourAuthTokenHere}` // TODO: Add actual token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as unknown; // Cast to unknown first
        let errorMessage = `Failed to ${initialData ? "update" : "create"} news.`;
        if (typeof errorData === 'object' && errorData !== null && 'detail' in errorData) {
          errorMessage = (errorData as { detail: string }).detail; // Safely access detail
        }
        throw new Error(errorMessage);
      }

      alert(`Berita berhasil di${initialData ? "perbarui" : "buat"}!`);
      router.push(`/admin/${ormawaSlug}/berita`); // Redirect back to news list
    } catch (err: unknown) { // Use unknown for catch error type
      console.error("Error submitting news:", err);
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat menyimpan berita.");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui saat menyimpan berita.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Berita" : "Tambah Berita Baru"}</CardTitle>
        <CardDescription>
          {initialData
            ? "Perbarui detail berita Anda."
            : "Buat berita baru untuk organisasi Anda."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { void handleSubmit(e); }} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Judul Berita</Label>
            <Input
              id="title"
              type="text"
              placeholder="Judul Berita Anda"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug (URL Friendly)</Label>
            <Input
              id="slug"
              type="text"
              placeholder="judul-berita-anda"
              required
              value={formData.slug}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Ringkasan</Label>
            <Textarea
              id="excerpt"
              placeholder="Ringkasan singkat berita Anda"
              required
              value={formData.excerpt}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Konten Berita</Label>
            <Textarea
              id="content"
              placeholder="Tulis konten berita lengkap di sini..."
              required
              value={formData.content}
              onChange={handleChange}
              rows={10}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image_url">URL Gambar (Opsional)</Label>
            <Input
              id="image_url"
              type="text"
              placeholder="https://example.com/image.jpg"
              value={formData.image_url || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="published"
              checked={formData.published}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="published">Publikasikan Berita</Label>
          </div>
          {error && <Typography variant='small' className='text-destructive text-center'>{error}</Typography>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Menyimpan..." : initialData ? "Perbarui Berita" : "Buat Berita"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}