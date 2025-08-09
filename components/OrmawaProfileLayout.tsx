import React from "react";
import { Typography } from "@/components/ui/typography";

export default function OrmawaProfileLayout({ children }: { children: React.ReactNode }) {
  // to do: Implementasikan state untuk mengubah konten di kolom kanan
  // berdasarkan navigasi yang aktif di sidebar.
  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1 bg-card p-4 rounded-lg shadow">
        <Typography as='h3' variant='h4' className='mb-4'>Navigasi Ormawa</Typography>
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className="block p-2 rounded hover:bg-muted">Tentang</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-muted">Anggota</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-muted">Kegiatan</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-muted">Galeri</a></li>
            {/* Tambahkan tautan navigasi lain sesuai kebutuhan */}
          </ul>
        </nav>
      </aside>
      <main className="md:col-span-3 bg-card p-6 rounded-lg shadow">
        {children}
      </main>
    </div>
  );
}