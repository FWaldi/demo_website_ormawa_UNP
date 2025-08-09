
// lib/types/frontend.ts
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface News {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_placeholder_color: string;
  status: string;
  category: string;
  published_at: string | null;
  tags: Tag[];
  ormawa_id: number;
}

export interface Ormawa {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    logo_placeholder_color: string;
    // Tambahkan field lain sesuai kebutuhan
}

export interface Event {
    id: number;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    ormawa: {
        id: number;
        name: string;
        slug: string;
    };
}
