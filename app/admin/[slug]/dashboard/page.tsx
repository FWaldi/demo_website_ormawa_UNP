// app/admin/[slug]/dashboard/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";

// This page will be a Server Component
export default function AdminDashboardPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // In a real application, you would fetch dashboard data specific to this ORMAWA
  // and ensure authorization based on the JWT token.
  // For now, we'll just display the slug.

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href={`/admin/${slug}/dashboard`} className="text-foreground transition-colors hover:text-foreground">
            Dashboard {slug.toUpperCase()}
          </Link>
          <Link href={`/admin/${slug}/berita`} className="text-muted-foreground transition-colors hover:text-foreground">
            Berita
          </Link>
          <Link href={`/admin/${slug}/acara`} className="text-muted-foreground transition-colors hover:text-foreground">
            Acara
          </Link>
          <Link href={`/admin/${slug}/anggota`} className="text-muted-foreground transition-colors hover:text-foreground">
            Anggota
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="outline" size="sm" className="ml-auto">Logout</Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Berita</CardTitle>
              {/* Icon placeholder */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div> {/* Placeholder data */}
              <Typography as='p' className='text-xs text-muted-foreground'>+5 dari bulan lalu</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Acara</CardTitle>
              {/* Icon placeholder */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div> {/* Placeholder data */}
              <Typography as='p' className='text-xs text-muted-foreground'>+2 dari bulan lalu</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengunjung Profil</CardTitle>
              {/* Icon placeholder */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div> {/* Placeholder data */}
              <Typography as='p' className='text-xs text-muted-foreground'>+15% dari bulan lalu</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anggota Aktif</CardTitle>
              {/* Icon placeholder */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div> {/* Placeholder data */}
              <Typography as='p' className='text-xs text-muted-foreground'>+3 dari bulan lalu</Typography>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Berita Terbaru</CardTitle>
                <CardDescription>Berita yang baru saja Anda publikasikan.</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href={`/admin/${slug}/berita/baru`}>
                  Tambah Berita
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {/* to do: Tampilkan daftar berita terbaru */}
              <p className="text-muted-foreground">Daftar berita terbaru akan muncul di sini.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {/* to do: Tampilkan log aktivitas */}
              <p className="text-muted-foreground">Log aktivitas akan muncul di sini.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}