// app/ormawa/[slug]/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Typography } from "@/components/ui/typography";
import { Ormawa } from "@/lib/types/frontend";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { ormawaItems } from "@/lib/placeholder-data"; // Menggunakan data statis

export async function generateStaticParams() {
  return ormawaItems.map((ormawa) => ({
    slug: ormawa.slug,
  }));
}

async function getOrmawaDetail(slug: string): Promise<Ormawa | undefined> {
  return ormawaItems.find((o) => o.slug === slug);
}

export default async function OrmawaProfilePage({ params }: { params: { slug: string } }) {
  const ormawa = await getOrmawaDetail(params.slug);

  if (!ormawa) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-secondary text-secondary-foreground py-16">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0">
              <ImagePlaceholder text={ormawa.name.substring(0, 2).toUpperCase()} color={ormawa.logo_placeholder_color} />
            </div>
            <div>
              <Typography as="h1" variant="h1">{ormawa.name}</Typography>
              <Typography as="p" variant="lead" className="mt-2 text-secondary-foreground/80">{ormawa.description}</Typography>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-8">
          <Typography variant="muted" className="text-center">
            Konten detail untuk setiap tab akan diimplementasikan di sini.
          </Typography>
        </section>
      </main>
      <Footer />
    </div>
  );
}