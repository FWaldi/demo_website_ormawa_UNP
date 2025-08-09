
// app/ormawa/[slug]/page.tsx
// Halaman ini akan menjadi sangat kompleks dan akan dikembangkan lebih lanjut.
// Untuk saat ini, kita buat kerangka dasarnya.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Typography } from "@/components/ui/typography";
import { Ormawa } from "@/lib/types/frontend";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";

async function getOrmawaDetail(slug: string): Promise<Ormawa | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ormawa/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch ormawa detail');
  }
  return (await res.json()) as Ormawa;
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
        {/* Hero Section for Ormawa */}
        <section className="bg-secondary text-secondary-foreground py-16">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0">
              <ImagePlaceholder color={ormawa.logo_placeholder_color} text={ormawa.name.split(" ").map(w => w[0]).join("")} />
            </div>
            <div>
              <Typography as="h1" variant="h1">{ormawa.name}</Typography>
              <Typography as="p" variant="lead" className="mt-2 text-secondary-foreground/80">{ormawa.description}</Typography>
            </div>
          </div>
        </section>

        {/* Tab Navigation and Content */}
        <section className="container mx-auto py-8">
          <Typography variant="muted" className="text-center">
            Konten detail untuk setiap tab (Profil, Tentang, Anggota, Kegiatan, Galeri, Jadwal, Kontak) akan diimplementasikan di sini.
          </Typography>
        </section>
      </main>
      <Footer />
    </div>
  );
}
