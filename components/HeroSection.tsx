import { Typography } from "@/components/ui/typography";

export default function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground py-20 text-center">
      <div className="container mx-auto">
        <Typography as='h1' variant='h1' className='mb-4'>Selamat Datang di Website Ormawa UNP</Typography>
        <Typography as='p' variant='lead' className='mb-8'>Temukan informasi terbaru, kegiatan, dan profil organisasi mahasiswa.</Typography>
        {/* Tambahkan tombol atau elemen lain di sini */}
      </div>
    </section>
  );
}