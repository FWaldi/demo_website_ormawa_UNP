// File: lib/placeholder-data.ts
import { CardEventProps } from "@/components/CardEvent";

export interface NewsItem {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
}

import { Ormawa } from './types/frontend';

export interface NewsItem {
  title: string;
  excerpt: string;
  imageUrl: string;
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

export const ormawaItems: Ormawa[] = [
  {
    id: 1,
    name: "Himpunan Mahasiswa Teknik Informatika",
    description: "Organisasi mahasiswa untuk mahasiswa Teknik Informatika.",
    logo_url: "/placeholder-ormawa.png",
    slug: "himatif",
    logo_placeholder_color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Badan Eksekutif Mahasiswa",
    description: "Organisasi eksekutif tertinggi di tingkat universitas.",
    logo_url: "/placeholder-ormawa.png",
    slug: "bem",
    logo_placeholder_color: "bg-yellow-500",
  },
  {
    id: 3,
    name: "Unit Kegiatan Mahasiswa Seni",
    description: "Wadah bagi mahasiswa yang memiliki minat di bidang seni.",
    logo_url: "/placeholder-ormawa.png",
    slug: "ukm-seni",
    logo_placeholder_color: "bg-red-500",
  },
];

