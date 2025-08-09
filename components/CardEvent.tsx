// File: components/CardEvent.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export interface CardEventProps {
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
}

export function CardEvent({ title, date, excerpt, imageUrl, slug }: CardEventProps) {
  return (
    <Card className="flex flex-col">
      <Image src={imageUrl} alt={title} width={400} height={225} className="rounded-t-lg object-cover w-full h-48" />
      <CardHeader>
        <Typography variant="h4" className="mb-2">{title}</Typography>
        <Typography variant="small" className="text-muted-foreground">{date}</Typography>
      </CardHeader>
      <CardContent className="flex-grow">
        <Typography variant="p">{excerpt}</Typography>
      </CardContent>
      <div className="p-6 pt-0">
        <Link href={`/acara/${slug}`} passHref>
          <Button className="w-full">Lihat Detail</Button>
        </Link>
      </div>
    </Card>
  );
}