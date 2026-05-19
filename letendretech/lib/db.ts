import { neon, neonConfig } from "@neondatabase/serverless";

neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export type Lead = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  business_type: string | null;
  town: string | null;
  service_interest: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Job = {
  id: number;
  client_name: string;
  project_name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  value: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  id: number;
  key: string;
  value: string;
  updated_at: string;
};

export type SiteImage = {
  id: number;
  label: string;
  url: string;
  section: string | null;
  created_at: string;
};
