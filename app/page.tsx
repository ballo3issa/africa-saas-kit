import type { Metadata } from "next";
import { SetupSaasDashboard } from "@/components/setup-saas-dashboard";
import { getKitDashboardChecks } from "@/lib/setup/kit-dashboard";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: process.env.NODE_ENV === "production" ? siteConfig.name : "Africa SaaS Kit — Setup",
  description: process.env.NODE_ENV === "production" ? siteConfig.description : "Tableau de préparation local du starter Africa SaaS Kit.",
  path: "/",
  noIndex: process.env.NODE_ENV !== "production",
});

export default async function Home() {
  if (process.env.NODE_ENV === "production") {
    return (
      <main className="shell">
        <section className="card">
          <h1>{siteConfig.name}</h1>
          <p className="muted">{siteConfig.description}</p>
        </section>
      </main>
    );
  }
  const checks = await getKitDashboardChecks();
  return <SetupSaasDashboard checks={checks} />;
}
