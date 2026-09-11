import type { Metadata } from "next";
import { AuthPage } from "@/components/auth-page";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Inscription",
  description: "Créez gratuitement votre espace Etudeo.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return <AuthPage mode="register" />;
}
