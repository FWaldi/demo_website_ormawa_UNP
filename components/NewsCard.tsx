
// components/NewsCard.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ImagePlaceholder } from "./shared/ImagePlaceholder";
import { TagPill } from "./shared/TagPill";
import { News } from "@/lib/types/frontend"; // Akan dibuat nanti
import { format } from "date-fns";
import { id } from "date-fns/locale";

type NewsCardProps = {
  newsItem: News;
};

export function NewsCard({ newsItem }: NewsCardProps) {
  return (
    <Link href={`/berita/${newsItem.slug}`} passHref legacyBehavior>
      <a className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden transition-all duration-200 group-hover:shadow-lg group-hover:border-primary">
          <div className="relative aspect-[16/9] overflow-hidden">
            {/* TODO: Ganti dengan Next/Image saat URL gambar asli tersedia */}
            <ImagePlaceholder
              color={newsItem.image_placeholder_color}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardHeader>
            <Typography as='h3' variant='h4' className="line-clamp-2">{newsItem.title}</Typography>
            <Typography variant="small" className="text-muted-foreground">
              {newsItem.published_at? format(new Date(newsItem.published_at), "d MMMM yyyy", { locale: id }) : "Tanggal tidak tersedia"}
            </Typography>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <Typography variant="muted" className="mb-4 line-clamp-3">{newsItem.excerpt}</Typography>
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.slice(0, 3).map((tag) => (
                <TagPill key={tag.id} tag={tag} />
              ))}
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
