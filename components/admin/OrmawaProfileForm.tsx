"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ormawa, OrmawaUpdate } from "@/lib/types/backend"; // Import schemas
import { Typography } from "@/components/ui/typography";

interface OrmawaProfileFormProps {
  initialData?: Ormawa; // Optional: for editing existing profile
}

export function OrmawaProfileForm({ initialData }: OrmawaProfileFormProps) {
  const [formData, setFormData] = useState<OrmawaUpdate>(
    initialData ? { ...initialData } : {
      name: "",
      description: "",
      logo_url: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/profile/`; // Admin updates their own profile

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${yourAuthTokenHere}` // TODO: Add actual token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as unknown; // Cast to unknown first
        let errorMessage = `Failed to update ORMAWA profile.`;
        if (typeof errorData === 'object' && errorData !== null && 'detail' in errorData) {
          errorMessage = (errorData as { detail: string }).detail; // Safely access detail
        }
        throw new Error(errorMessage);
      }

      alert(`Profil ORMAWA berhasil diperbarui!`);
      // Optionally, refresh the page or update state to reflect changes
      // router.refresh(); // For Next.js 13+
    } catch (err: unknown) { // Use unknown for catch error type
      console.error("Error submitting ORMAWA profile:", err);
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat menyimpan profil ORMAWA.");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui saat menyimpan profil ORMAWA.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profil ORMAWA</CardTitle>
        <CardDescription>Perbarui informasi dasar organisasi Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { void handleSubmit(e); }} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Organisasi</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nama Lengkap Organisasi"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Deskripsi singkat tentang organisasi Anda"
              required
              value={formData.description}
              onChange={handleChange}
              rows={5}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="logo_url">URL Logo (Opsional)</Label>
            <Input
              id="logo_url"
              type="text"
              placeholder="https://example.com/logo.png"
              value={formData.logo_url || ""}
              onChange={handleChange}
            />
          </div>
          {error && <Typography variant='small' className='text-destructive text-center'>{error}</Typography>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Menyimpan..." : "Perbarui Profil"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}