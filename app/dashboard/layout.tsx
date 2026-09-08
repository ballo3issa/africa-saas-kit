import type { Metadata } from "next";
import { privatePageMetadata } from "@/lib/seo/metadata";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export const metadata: Metadata = privatePageMetadata;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<MobileBottomNav /></>;
}
