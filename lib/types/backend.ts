export interface User {
  id: number;
  email: string;
  is_active: boolean;
  role: string;
  ormawa_id: number | null;
}

export interface Ormawa {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  created_at: string; // ISO 8601 string
  updated_at: string | null; // ISO 8601 string
}

export interface OrmawaCreate {
  name: string;
  slug: string;
  description: string;
  logo_url?: string | null;
}

export interface OrmawaUpdate {
  name?: string;
  description?: string;
  logo_url?: string | null;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string; // ISO 8601 string
  updated_at: string | null; // ISO 8601 string
  author_id: number;
  ormawa_id: number;
}

export interface NewsCreate {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string | null;
  published?: boolean;
}

export interface NewsUpdate {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image_url?: string | null;
  published?: boolean;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  event_date: string; // ISO 8601 string
  image_url: string | null;
  published: boolean;
  created_at: string; // ISO 8601 string
  updated_at: string | null; // ISO 8601 string
  creator_id: number;
  ormawa_id: number;
}

export interface EventCreate {
  title: string;
  slug: string;
  description: string;
  location: string;
  event_date: string;
  image_url?: string | null;
  published?: boolean;
}

export interface EventUpdate {
  title?: string;
  slug?: string;
  description?: string;
  location?: string;
  event_date?: string;
  image_url?: string | null;
  published?: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface TokenData {
  email?: string;
}
