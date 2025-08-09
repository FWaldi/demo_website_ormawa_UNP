
// components/OrmawaCard.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ImagePlaceholder } from "./shared/ImagePlaceholder";
import { Ormawa } from "@/lib/types/frontend";

type OrmawaCardProps = {
  ormawa: Ormawa;
};

export function OrmawaCard({ ormawa }: OrmawaCardProps) {
  return (
    <Link href={`/ormawa/${ormawa.slug}`} passHref legacyBehavior>
      <a className="group block h-full">
        <Card className="flex flex-col h-full overflow-hidden transition-all duration-200 group-hover:shadow-lg group-hover:border-primary">
          <div className="relative aspect-square overflow-hidden p-4">
            <ImagePlaceholder color={ormawa.logo_placeholder_color} text={ormawa.name.split(" ").map(w => w[0]).join("")} className="rounded-full transition-transform duration-300 group-hover:scale-105" />
          </div>
          <CardHeader className="text-center">
            <Typography as='h3' variant='h4' className="line-clamp-2">{ormawa.name}</Typography>
          </CardHeader>
          <CardContent className="flex-grow">
            <Typography variant="muted" className="line-clamp-3 text-center">{ormawa.description}</Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
