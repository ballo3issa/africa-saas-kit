import type { Metadata } from "next";
import { AuthPage } from "@/components/auth-page";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Connexion",
  description: "Connectez-vous à votre espace Etudeo.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
