"use client";

import { NewsForm } from "@/components/admin/NewsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddNewsPage({ params }: { params: { slug: string } }) {
  const { slug: ormawaSlug } = params;

  return (
    <div className="flex min-h-screen w-full flex-col p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Tambah Berita Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <NewsForm ormawaSlug={ormawaSlug} />
        </CardContent>
      </Card>
    </div>
  );
}