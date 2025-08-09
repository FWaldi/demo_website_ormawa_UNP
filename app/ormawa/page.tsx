
// app/ormawa/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrmawaCard } from "@/components/OrmawaCard";
import { Typography } from "@/components/ui/typography";
import { Ormawa } from "@/lib/types/frontend";

async function getOrmawa(): Promise<Ormawa[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ormawa`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch ormawa list');
  }
  return (await res.json()) as Ormawa[];
}

export default async function OrmawaDirectoryPage() {
  const ormawaList = await getOrmawa();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Typography as='h1' variant='h1' className='text-center mb-4'>Direktori ORMAWA</Typography>
        <Typography as='p' variant='lead' className='text-center mb-8 max-w-2xl mx-auto'>
          Kenali lebih dekat berbagai Organisasi Mahasiswa yang ada di Universitas Negeri Padang.
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ormawaList.map((ormawa) => (
            <OrmawaCard key={ormawa.id} ormawaItem={ormawa} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
