import { OrmawaCard } from "@/components/OrmawaCard";
import { Ormawa } from "@/lib/types/frontend";
import { Typography } from "@/components/ui/typography";

type OrmawaGridProps = {
  ormawaItems: Ormawa[];
};

export default function OrmawaGrid({ ormawaItems }: OrmawaGridProps) {
  return (
    <section className="container mx-auto py-8">
      <Typography as='h2' variant='h2' className='text-center mb-8'>Daftar Organisasi Mahasiswa</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ormawaItems.map((ormawa) => (
          <OrmawaCard
            key={ormawa.id}
            ormawa={ormawa}
          />
        ))}
      </div>
    </section>
  );
}
