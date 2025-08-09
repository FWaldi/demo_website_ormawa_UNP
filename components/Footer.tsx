
// components/Footer.tsx
import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div>
          <Typography as='h3' variant='large' className='mb-4 font-semibold'>Tentang Portal ORMAWA UNP</Typography>
          <Typography as='p' variant='small' className="text-secondary-foreground/80">
            Pusat informasi terpadu untuk seluruh kegiatan, berita, dan profil Organisasi Mahasiswa di lingkungan Universitas Negeri Padang.
          </Typography>
        </div>
        <div>
          <Typography as='h3' variant='large' className='mb-4 font-semibold'>Tautan Cepat</Typography>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline text-secondary-foreground/80">Beranda</Link></li>
            <li><Link href="/berita" className="hover:underline text-secondary-foreground/80">Berita</Link></li>
            <li><Link href="/ormawa" className="hover:underline text-secondary-foreground/80">Ormawa</Link></li>
            <li><Link href="/kalender" className="hover:underline text-secondary-foreground/80">Kalender</Link></li>
          </ul>
        </div>
        <div>
          <Typography as='h3' variant='large' className='mb-4 font-semibold'>Hubungi Kami</Typography>
          <address className="not-italic text-sm space-y-2 text-secondary-foreground/80">
            <p>Universitas Negeri Padang</p>
            <p>Jl. Prof. Dr. Hamka, Air Tawar, Padang, Sumatera Barat</p>
            <p>Telepon: 0751 7058692</p>
            <p>Email: <a href="mailto:humas@unp.ac.id" className="hover:underline">humas@unp.ac.id</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-primary/20 py-4">
        <div className="container mx-auto text-center text-xs text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} Portal Informasi ORMAWA UNP. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
