import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { privatePageMetadata } from "@/lib/seo/metadata";
import { SetupSaasDashboard } from "@/components/setup-saas-dashboard";
import { getKitDashboardChecks } from "@/lib/setup/kit-dashboard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = privatePageMetadata;

export default async function SetupPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const checks = await getKitDashboardChecks();
  return <SetupSaasDashboard checks={checks} />;
}
