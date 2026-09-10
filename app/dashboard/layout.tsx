import type { Metadata } from "next";
import { privatePageMetadata } from "@/lib/seo/metadata";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { requireUser } from "@/lib/auth/session";

export const metadata: Metadata = privatePageMetadata;
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Authoritative server-side guard for every current and future /dashboard page.
  await requireUser();
  return <>{children}<MobileBottomNav /></>;
}
