// File: lib/placeholder-data.ts
import { CardEventProps } from "@/components/CardEvent";

export interface NewsItem {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
}

export interface OrmawaItem {
  name: string;
  description: string;
  logoUrl: string;
  slug: string;
}

export const eventItems: CardEventProps[] = [
  // Add dummy event data here if needed
];

export const newsItems: NewsItem[] = [
  {
    title: "Berita 1: Judul Berita Pertama",
    excerpt: "Ini adalah ringkasan singkat dari berita pertama. Berisi informasi penting dan menarik.",
    imageUrl: "/placeholder-news.jpg",
    slug: "berita-1-judul-berita-pertama",
  },
  {
    title: "Berita 2: Judul Berita Kedua",
    excerpt: "Ringkasan berita kedua yang lebih panjang untuk menguji tampilan teks.",
    imageUrl: "/placeholder-news.jpg",
    slug: "berita-2-judul-berita-kedua",
  },
  {
    title: "Berita 3: Judul Berita Ketiga",
    excerpt: "Berita ketiga dengan detail menarik tentang kegiatan mahasiswa.",
    imageUrl: "/placeholder-news.jpg",
    slug: "berita-3-judul-berita-ketiga",
  },
];

export const ormawaItems: OrmawaItem[] = [
  {
    name: "Himpunan Mahasiswa Teknik Informatika",
    description: "Organisasi mahasiswa untuk mahasiswa Teknik Informatika.",
    logoUrl: "/placeholder-ormawa.png",
    slug: "himatif",
  },
  {
    name: "Badan Eksekutif Mahasiswa",
    description: "Organisasi eksekutif tertinggi di tingkat universitas.",
    logoUrl: "/placeholder-ormawa.png",
    slug: "bem",
  },
  {
    name: "Unit Kegiatan Mahasiswa Seni",
    description: "Wadah bagi mahasiswa yang memiliki minat di bidang seni.",
    logoUrl: "/placeholder-ormawa.png",
    slug: "ukm-seni",
  },
];
