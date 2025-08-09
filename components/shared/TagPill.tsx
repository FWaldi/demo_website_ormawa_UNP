
// components/shared/TagPill.tsx
import { cn } from "@/lib/utils";
import { Tag } from "@/lib/types/frontend";

const tagColorMap: { [key: string]: string } = {
  seminar: 'bg-tag-seminar text-yellow-900',
  kompetisi: 'bg-tag-kompetisi text-orange-900',
  olahraga: 'bg-tag-olahraga text-green-900',
  seni: 'bg-tag-seni text-purple-900',
  teknologi: 'bg-tag-teknologi text-sky-900',
  pengabdian: 'bg-tag-pengabdian text-pink-900',
};

export function TagPill({ tag }: { tag: Tag }) {
  const colorClass = tagColorMap[tag.slug] || 'bg-muted text-muted-foreground';
  
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", colorClass)}>
      {tag.name}
    </span>
  );
}
