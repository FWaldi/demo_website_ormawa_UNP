// app/berita/[slug]/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Typography } from "@/components/ui/typography";
import { News } from "@/lib/types/frontend";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { TagPill } from "@/components/shared/TagPill";
import Link from "next/link";

async function getNewsDetail(slug: string): Promise<News | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/news/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch news detail');
  }
  return (await res.json()) as News;
}

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const news = await getNewsDetail(params.slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <article className="container mx-auto max-w-3xl">
          <header className="mb-8">
            <Typography as="h1" variant="h1" className="mb-4">{news.title}</Typography>
            <div className="text-muted-foreground text-sm">
              <span>Dipublikasikan pada {news.published_at? format(new Date(news.published_at), "d MMMM yyyy, HH:mm", { locale: id }) : "N/A"}</span>
              {/* TODO: Tambahkan nama ORMAWA penulis di sini */}
            </div>
          </header>
          
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-8">
            <ImagePlaceholder color={news.image_placeholder_color} />
          </div>

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br />') }}>
          </div>

          <footer className="mt-12 pt-8 border-t">
            <Typography as="h4" variant="h4" className="mb-4">Tags</Typography>
            <div className="flex flex-wrap gap-2">
              {news.tags.map(tag => (
                <Link key={tag.id} href={`/berita?tag=${tag.slug}`}>
                  <TagPill tag={tag} />
                </Link>
              ))}
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}
