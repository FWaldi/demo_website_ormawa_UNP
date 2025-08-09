import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ContentDataTable, SimpleColumnDef } from '@/components/admin/ContentDataTable';
import { Typography } from '@/components/ui/typography';

interface DashboardData {
  id: string;
  name: string;
  status: string;
}

export default function AdminDashboardPage({ params }: { params: { ormawa_slug: string } }) {
  const columns: SimpleColumnDef<DashboardData>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nama',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  const data: DashboardData[] = [
    { id: '1', name: 'Contoh Data 1', status: 'Aktif' },
    { id: '2', name: 'Contoh Data 2', status: 'Tidak Aktif' },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <Typography as='h1' variant='h1' className='text-center mb-8'>Dashboard Admin {params.ormawa_slug.toUpperCase()}</Typography>
        <ContentDataTable
          columns={columns}
          data={data}
          title={`Data untuk ${params.ormawa_slug.toUpperCase()}`}
        />
      </main>
      <Footer />
    </>
  );
}