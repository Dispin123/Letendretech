import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type SqlClient = NeonQueryFunction<false, false>;

let client: SqlClient | null = null;

function getClient(): SqlClient {
  if (client) return client;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  client = neon(databaseUrl);
  return client;
}

// Delay environment validation until an API route actually queries the database.
export const sql = new Proxy(() => undefined, {
  apply(_target, _thisArg, argumentsList) {
    return Reflect.apply(getClient(), undefined, argumentsList);
  },
}) as unknown as SqlClient;

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
