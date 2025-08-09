// File: components/EventGrid.tsx
import { CardEvent, CardEventProps } from "@/components/CardEvent"; // Impor tipe data
import { eventItems } from "@/lib/placeholder-data";
import { Typography } from "@/components/ui/typography";

export function EventGrid() {
  return (
    <section className="container mx-auto py-8">
      <Typography variant="h2" className="text-center mb-8">Kegiatan Mendatang</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Terapkan tipe data di sini untuk menghilangkan error 'any' */}
        {eventItems.map((event: CardEventProps, index: number) => (
          <CardEvent
            key={index}
            slug={event.slug}
            title={event.title}
            date={event.date}
            excerpt={event.excerpt}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}