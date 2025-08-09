"use client";

import { useState, useEffect } from "react";
import { OrmawaProfileForm } from "@/components/admin/OrmawaProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ormawa } from "@/lib/types/backend"; // Import Ormawa schema

export default function AdminOrmawaProfilePage({ params }: { params: { slug: string } }) {
  const { slug: ormawaSlug } = params;
  const [initialOrmawaData, setInitialOrmawaData] = useState<Ormawa | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrmawaData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch ORMAWA profile data for the logged-in admin's ORMAWA
        // The backend /api/admin/profile/ endpoint automatically filters by current_user.ormawa_id
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/profile/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ORMAWA profile: ${response.statusText}`);
        }
        const data = (await response.json()) as Ormawa;
        setInitialOrmawaData(data);
      } catch (err: unknown) {
        console.error("Error fetching ORMAWA profile:", err);
        if (err instanceof Error) {
          setError(`Gagal memuat profil ORMAWA: ${err.message}. Pastikan backend berjalan dan Anda terautentikasi.`);
        } else {
          setError("Gagal memuat profil ORMAWA. Terjadi kesalahan tidak diketahui.");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchOrmawaData();
  }, [ormawaSlug]); // Re-fetch if slug changes (though for admin profile, it's usually fixed per login)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Memuat profil ORMAWA...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!initialOrmawaData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Profil ORMAWA tidak ditemukan atau Anda tidak memiliki izin.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col p-4 md:p-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profil ORMAWA {initialOrmawaData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <OrmawaProfileForm initialData={initialOrmawaData} />
        </CardContent>
      </Card>
    </div>
  );
}