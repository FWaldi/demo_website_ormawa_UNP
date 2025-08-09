
// app/kalender/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Typography } from "@/components/ui/typography";
import { CalendarView } from "@/components/CalendarView";
import { Event } from "@/lib/types/frontend";

async function getEvents(): Promise<Event[]> {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events`, { cache: 'no-store' });
   if (!res.ok) {
     throw new Error('Failed to fetch events');
   }
   return (await res.json()) as Event[];
}

export default async function CalendarPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Typography as='h1' variant='h1' className='text-center mb-4'>Kalender Kegiatan</Typography>
        <Typography as='p' variant='lead' className='text-center mb-8 max-w-2xl mx-auto'>
          Temukan semua jadwal kegiatan yang diselenggarakan oleh ORMAWA di Universitas Negeri Padang dalam satu tempat.
        </Typography>
        <div className="bg-card p-4 rounded-lg shadow-md">
            <CalendarView initialEvents={events} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
