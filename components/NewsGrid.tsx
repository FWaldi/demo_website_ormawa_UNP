import { NewsCard } from "@/components/NewsCard";
import { News } from "@/lib/types/frontend";
import { Typography } from "@/components/ui/typography";

// to do: Ganti data dummy dengan data dari API
const newsItems: News[] = [
  {
    id: 1,
    slug: "berita-1",
    title: "Berita 1",
    excerpt: "Ini adalah ringkasan berita pertama.",
    content: "Ini adalah konten berita pertama.",
    image_placeholder_color: "#0D47A1",
    status: "published",
    category: "berita",
    published_at: new Date().toISOString(),
    tags: [{ id: 1, name: "Penting", slug: "penting" }],
    ormawa_id: 1,
  },
  {
    id: 2,
    slug: "berita-2",
    title: "Berita 2",
    excerpt: "Ini adalah ringkasan berita kedua.",
    content: "Ini adalah konten berita kedua.",
    image_placeholder_color: "#1565C0",
    status: "published",
    category: "berita",
    published_at: new Date().toISOString(),
    tags: [{ id: 2, name: "Event", slug: "event" }],
    ormawa_id: 2,
  },
  {
    id: 3,
    slug: "berita-3",
    title: "Berita 3",
    excerpt: "Ini adalah ringkasan berita ketiga.",
    content: "Ini adalah konten berita ketiga.",
    image_placeholder_color: "#1E88E5",
    status: "published",
    category: "berita",
    published_at: new Date().toISOString(),
    tags: [{ id: 1, name: "Penting", slug: "penting" }],
    ormawa_id: 1,
  },
  {
    id: 4,
    slug: "berita-4",
    title: "Berita 4",
    excerpt: "Ini adalah ringkasan berita keempat.",
    content: "Ini adalah konten berita keempat.",
    image_placeholder_color: "#42A5F5",
    status: "published",
    category: "berita",
    published_at: new Date().toISOString(),
    tags: [{ id: 3, name: "Info", slug: "info" }],
    ormawa_id: 3,
  },
];

export default function NewsGrid() {
  return (
    <section className="container mx-auto py-8">
      <Typography as='h2' variant='h2' className='text-center mb-8'>Berita Terkini</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <NewsCard
            key={news.id}
            newsItem={news}
          />
        ))}
      </div>
    </section>
  );
}
