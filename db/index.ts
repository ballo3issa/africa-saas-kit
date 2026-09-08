import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { assertServerOnlyEnv, requireEnv } from "@/lib/security/env";

assertServerOnlyEnv();
const sql = neon(requireEnv("DATABASE_URL"));
export const db = drizzle(sql, { schema });
