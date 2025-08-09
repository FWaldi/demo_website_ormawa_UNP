
// components/shared/ImagePlaceholder.tsx
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  color: string;
  text?: string;
  className?: string;
}

export function ImagePlaceholder({
  color,
  text = "Gambar Segera Tersedia",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center p-4 text-center text-sm font-medium text-white",
        className
      )}
      style={{ backgroundColor: color }}
    >
      <span>{text}</span>
    </div>
  );
}
