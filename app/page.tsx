
// app/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { OrmawaCard } from "@/components/OrmawaCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { News, Ormawa } from "@/lib/types/frontend";

async function getLatestNews(): Promise<News[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/news?limit=3`, { cache: 'no-store' });
  if (!res.ok) return [];
  return (await res.json()) as News[];
}

async function getFeaturedOrmawa(): Promise<Ormawa[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ormawa?limit=3`, { cache: 'no-store' });
  if (!res.ok) return [];
  return (await res.json()) as Ormawa[];
}

export default async function HomePage() {
  const latestNews = await getLatestNews();
  const featuredOrmawa = await getFeaturedOrmawa();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20 text-center">
          <div className="container mx-auto">
            <Typography as='h1' variant='h1' className='mb-4'>Selamat Datang di Portal ORMAWA UNP</Typography>
            <Typography as='p' variant='lead' className='mb-8'>Temukan informasi terbaru, kegiatan, dan profil organisasi mahasiswa.</Typography>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg"><Link href="/berita">Lihat Berita</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/ormawa">Jelajahi ORMAWA</Link></Button>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <Typography as='h2' variant='h2' className='text-center mb-8'>Berita Terbaru</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((newsItem) => (
                <NewsCard key={newsItem.id} newsItem={newsItem} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild><Link href="/berita">Lihat Semua Berita</Link></Button>
            </div>
          </div>
        </section>

        {/* Featured ORMAWA */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto">
            <Typography as='h2' variant='h2' className='text-center mb-8'>ORMAWA Unggulan</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredOrmawa.map((ormawaItem) => (
                <OrmawaCard key={ormawaItem.id} ormawaItem={ormawaItem} />
              ))}
            </div>
             <div className="text-center mt-8">
              <Button asChild><Link href="/ormawa">Lihat Semua ORMAWA</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
