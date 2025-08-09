// app/ormawa/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrmawaCard } from "@/components/OrmawaCard";
import { Typography } from "@/components/ui/typography";
import { ormawaItems } from "@/lib/placeholder-data"; // Menggunakan data statis

export default function OrmawaDirectoryPage() {
  const ormawaList = ormawaItems;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Typography as='h1' variant='h1' className='text-center mb-4'>Direktori ORMAWA</Typography>
        <Typography as='p' variant='lead' className='text-center mb-8 max-w-2xl mx-auto'>
          Kenali lebih dekat berbagai Organisasi Mahasiswa yang ada di Universitas Negeri Padang.
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ormawaList.map((ormawa, index) => (
            <OrmawaCard key={index} ormawa={ormawa} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}