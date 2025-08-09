
// app/berita/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { Typography } from "@/components/ui/typography";
import { News, Tag } from "@/lib/types/frontend";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function getNews(tag?: string): Promise<News[]> {
  const query = tag? `?tag=${tag}` : '';
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/news${query}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }
  return (await res.json()) as News[];
}

async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tags`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch tags');
  }
  return (await res.json()) as Tag[];
}

export default async function BeritaPage({ searchParams }: { searchParams: { tag?: string } }) {
  const selectedTag = searchParams.tag;
  const news = await getNews(selectedTag);
  const tags = await getTags();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Typography as='h1' variant='h1' className='text-center mb-4'>Berita & Kegiatan</Typography>
        <Typography as='p' variant='lead' className='text-center mb-8 max-w-2xl mx-auto'>
          Jelajahi semua informasi, pengumuman, dan laporan kegiatan terbaru dari seluruh ORMAWA di Universitas Negeri Padang.
        </Typography>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link href="/berita" className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors",!selectedTag? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary')}>
            Semua
          </Link>
          {tags.map(tag => (
            <Link key={tag.id} href={`/berita?tag=${tag.slug}`} className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-colors", selectedTag === tag.slug? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary')}>
              {tag.name}
            </Link>
          ))}
        </div>

        {news.length > 0? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((newsItem) => (
              <NewsCard key={newsItem.id} newsItem={newsItem} />
            ))}
          </div>
        ) : (
          <Typography variant="muted" className="text-center py-16">
            Tidak ada berita yang ditemukan {selectedTag? `dengan tag "${selectedTag}"` : ""}.
          </Typography>
        )}
      </main>
      <Footer />
    </div>
  );
}
