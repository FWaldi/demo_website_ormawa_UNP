
// components/OrmawaCard.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ImagePlaceholder } from "./shared/ImagePlaceholder";
import { Ormawa } from "@/lib/types/frontend";

type OrmawaCardProps = {
  ormawaItem: Ormawa;
};

export function OrmawaCard({ ormawaItem }: OrmawaCardProps) {
  return (
    <Link href={`/ormawa/${ormawaItem.slug}`} passHref legacyBehavior>
      <a className="group block h-full">
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-200 group-hover:shadow-lg group-hover:border-primary">
          <div className="relative aspect-square overflow-hidden p-4">
            <ImagePlaceholder color={ormawaItem.logo_placeholder_color} text={ormawaItem.name.split(" ").map(w => w[0]).join("")} className="rounded-full transition-transform duration-300 group-hover:scale-105" />
          </div>
          <CardHeader className="text-center">
            <Typography as='h3' variant='h4' className="line-clamp-2">{ormawaItem.name}</Typography>
          </CardHeader>
          <CardContent className="flex-grow">
            <Typography variant="muted" className="line-clamp-3 text-center">{ormawaItem.description}</Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
