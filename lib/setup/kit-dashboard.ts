import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import providersCatalog from "@/config/providers.json";

export type KitStatus = "ok" | "missing" | "warning";
export type KitCheck = {
  id: string;
  label: string;
  status: KitStatus;
  detail: string;
  group: "Base" | "Services" | "Paiements" | "Qualité";
};

type KitConfig = {
  email?: string;
  emailPasswordEnabled?: boolean;
  providers?: string[];
  googleAuth?: boolean;
  searchConsole?: boolean;
  cloudinaryEnabled?: boolean;
  banani?: boolean;
  securityLevel?: string;
};

function exists(rel: string) {
  return fs.existsSync(path.join(process.cwd(), rel));
}

function readConfig(): KitConfig | null {
  const file = path.join(process.cwd(), "africa-saas.config.json");
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as KitConfig;
  } catch {
    return null;
  }
}

function hasEnv(name: string) {
  return Boolean(process.env[name]?.trim());
}

async function checkNeon(): Promise<KitCheck> {
  if (!hasEnv("DATABASE_URL")) {
    return { id: "neon", label: "Neon PostgreSQL", status: "missing", detail: "DATABASE_URL manquante.", group: "Services" };
  }
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await Promise.race([
      sql`select 1 as ok`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 4000)),
    ]);
    return { id: "neon", label: "Neon PostgreSQL", status: "ok", detail: "Connexion SQL réussie.", group: "Services" };
  } catch {
    return { id: "neon", label: "Neon PostgreSQL", status: "missing", detail: "DATABASE_URL présente mais connexion impossible.", group: "Services" };
  }
}

async function checkNgrok(): Promise<KitCheck> {
  try {
    const response = await fetch("http://127.0.0.1:4040/api/tunnels", {
      cache: "no-store",
      signal: AbortSignal.timeout(700),
    });
    if (!response.ok) throw new Error("ngrok unavailable");
    const data = (await response.json()) as { tunnels?: Array<{ public_url?: string }> };
    const publicUrl = data.tunnels?.find((t) => t.public_url?.startsWith("https://"))?.public_url;
    return publicUrl
      ? { id: "ngrok", label: "ngrok", status: "ok", detail: `Tunnel HTTPS détecté : ${publicUrl}`, group: "Paiements" }
      : { id: "ngrok", label: "ngrok", status: "missing", detail: "ngrok tourne mais aucun tunnel HTTPS n'est détecté.", group: "Paiements" };
  } catch {
    return { id: "ngrok", label: "ngrok local", status: "missing", detail: "Non lancé. Utilise npm run payments:ngrok pour tester les webhooks localement.", group: "Paiements" };
  }
}

export async function getKitDashboardChecks(): Promise<KitCheck[]> {
  const config = readConfig();
  const checks: KitCheck[] = [];

  const nodeMajor = Number(process.versions.node.split(".")[0] || 0);
  checks.push({ id: "node", label: "Node.js", status: nodeMajor >= 20 ? "ok" : "missing", detail: `Version active : ${process.versions.node} (>=20 requis).`, group: "Base" });
  checks.push({ id: "lockfile", label: "package-lock.json", status: exists("package-lock.json") ? "ok" : "missing", detail: exists("package-lock.json") ? "Lockfile présent." : "Exécute npm install puis conserve package-lock.json dans Git.", group: "Base" });
  checks.push({ id: "config", label: "Configuration du kit", status: config ? "ok" : "missing", detail: config ? "africa-saas.config.json présent." : "Lance /setup-saas ou npm run setup pour créer la configuration.", group: "Base" });
  let computerUseVerified = false;
  try {
    const state = JSON.parse(fs.readFileSync(path.join(process.cwd(), ".africa-saas/computer-use.json"), "utf8")) as { status?: string };
    computerUseVerified = state.status === "verified";
  } catch {}
  checks.push({ id: "computer-use", label: "Computer Use / Browser Tools", status: computerUseVerified ? "ok" : "missing", detail: computerUseVerified ? "Browser Subagent vérifié par un test réel." : "NON VÉRIFIÉ — exécute /computer-use ou npm run computer-use:check puis teste le Browser Subagent.", group: "Base" });
  checks.push({ id: "auth", label: "Better Auth", status: hasEnv("BETTER_AUTH_SECRET") ? "ok" : "missing", detail: hasEnv("BETTER_AUTH_SECRET") ? "Secret Better Auth configuré." : "BETTER_AUTH_SECRET manquant.", group: "Services" });
  const emailPasswordMode = process.env.AUTH_EMAIL_PASSWORD_ENABLED !== "false";
  checks.push({ id: "auth-mode", label: "Mode d’authentification", status: emailPasswordMode || (hasEnv("GOOGLE_CLIENT_ID") && hasEnv("GOOGLE_CLIENT_SECRET")) ? "ok" : "missing", detail: emailPasswordMode ? "Email/mot de passe activé (Resend requis en production)." : "Email/mot de passe désactivé : Google OAuth doit être configuré.", group: "Services" });

  checks.push(await checkNeon());

  const emailPasswordEnabled = config ? config.emailPasswordEnabled !== false : process.env.AUTH_EMAIL_PASSWORD_ENABLED !== "false";
  const resendRequired = config?.email === "resend" || emailPasswordEnabled;
  const emailFromValue = process.env.EMAIL_FROM ?? "";
  const resendOk = hasEnv("RESEND_API_KEY") && hasEnv("EMAIL_FROM") && !/@example\.(com|org|net)$/i.test(emailFromValue);
  checks.push({
    id: "resend",
    label: "Resend",
    status: resendOk ? "ok" : resendRequired ? "missing" : "warning",
    detail: resendOk ? "Clé API + adresse EMAIL_FROM présentes; l’envoi réel reste à tester." : resendRequired ? "Email/mot de passe est actif : RESEND_API_KEY + EMAIL_FROM sont requis avant production." : "Optionnel — email/mot de passe désactivé.",
    group: "Services",
  });

  const upstashParts = [hasEnv("UPSTASH_REDIS_REST_URL"), hasEnv("UPSTASH_REDIS_REST_TOKEN")];
  checks.push({
    id: "upstash",
    label: "Upstash Redis (optionnel)",
    status: upstashParts.every(Boolean) ? "ok" : upstashParts.some(Boolean) ? "missing" : "warning",
    detail: upstashParts.every(Boolean) ? "URL + token présents; /api/readyz effectuera une sonde Redis." : upstashParts.some(Boolean) ? "Configuration Upstash partielle." : "Non configuré — optionnel pour rate limiting/cache avancé.",
    group: "Services",
  });

  const googleRequired = Boolean(config?.googleAuth);
  const googleOk = hasEnv("GOOGLE_CLIENT_ID") && hasEnv("GOOGLE_CLIENT_SECRET");
  checks.push({ id: "google", label: "Google OAuth", status: googleOk ? "ok" : "missing", detail: googleOk ? "Client ID + secret configurés." : googleRequired ? "Google OAuth activé mais identifiants incomplets." : "Non configuré.", group: "Services" });

  const searchRequired = Boolean(config?.searchConsole);
  checks.push({ id: "search-console", label: "Google Search Console", status: hasEnv("GOOGLE_SITE_VERIFICATION") ? "ok" : "missing", detail: hasEnv("GOOGLE_SITE_VERIFICATION") ? "Jeton de vérification configuré. La validation dans Search Console reste à confirmer." : searchRequired ? "Search Console prévu mais GOOGLE_SITE_VERIFICATION manque." : "Non configuré.", group: "Services" });

  const cloudinaryOk = hasEnv("CLOUDINARY_CLOUD_NAME") && hasEnv("CLOUDINARY_API_KEY") && hasEnv("CLOUDINARY_API_SECRET");
  checks.push({ id: "cloudinary", label: "Cloudinary images (optionnel)", status: cloudinaryOk ? "ok" : "warning", detail: cloudinaryOk ? "Variables Cloudinary présentes; un upload réel reste à tester." : "Non configuré. Valide pour un SaaS sans upload d’images; décision en Phase 18.", group: "Services" });

  const enabledProviders = config?.providers ?? [];
  if (!enabledProviders.length) {
    checks.push({ id: "payments-config", label: "Paiements (optionnel)", status: "warning", detail: "Aucun provider activé. C’est valide : les paiements ne sont configurés qu’en Phase 16 si le SaaS en a besoin.", group: "Paiements" });
  }
  for (const id of enabledProviders) {
    const provider = providersCatalog[id as keyof typeof providersCatalog];
    if (!provider) continue;
    const present = provider.env.filter((name) => hasEnv(name));
    checks.push({
      id: `provider:${id}`,
      label: provider.label,
      status: present.length === provider.env.length ? "ok" : "missing",
      detail: present.length === provider.env.length ? `Variables requises présentes (${provider.readiness}).` : `${present.length}/${provider.env.length} variable(s) requise(s) configurée(s).`,
      group: "Paiements",
    });
  }

  if (enabledProviders.length) {
    checks.push({ id: "webhook-base", label: "URL webhooks", status: hasEnv("PAYMENT_WEBHOOK_BASE_URL") ? "ok" : "missing", detail: hasEnv("PAYMENT_WEBHOOK_BASE_URL") ? `PAYMENT_WEBHOOK_BASE_URL configurée.` : "Manquante. En local, utilise ngrok + npm run payments:local:apply.", group: "Paiements" });
    checks.push(await checkNgrok());
  }

  checks.push({ id: "health", label: "API health / readiness", status: exists("app/api/health/route.ts") && exists("app/api/readyz/route.ts") ? "ok" : "missing", detail: "Sondes /api/health et /api/readyz présentes.", group: "Qualité" });
  checks.push({ id: "runtime", label: "Runtime API Node.js", status: exists("scripts/runtime-check.mjs") ? "ok" : "missing", detail: "Gate runtime:check présent pour empêcher un passage accidentel en Edge.", group: "Qualité" });
  checks.push({ id: "features", label: "Inventaire anti-doublons", status: exists("config/features.json") && exists("scripts/feature-inventory.mjs") ? "ok" : "missing", detail: "Manifeste des responsabilités de features/routes présent.", group: "Qualité" });
  checks.push({ id: "observability", label: "Observabilité de base", status: exists("lib/observability/logger.ts") && exists("lib/observability/request-id.ts") ? "ok" : "missing", detail: "Logs structurés + redaction + request IDs présents.", group: "Qualité" });
  checks.push({ id: "tests", label: "Tests unitaires", status: exists("vitest.config.ts") && exists("tests/payments/provider-base.test.ts") ? "ok" : "missing", detail: "Vitest et tests des garde-fous sensibles présents.", group: "Qualité" });
  checks.push({ id: "lint-format", label: "Lint / format", status: exists("eslint.config.mjs") && exists(".prettierrc.json") ? "ok" : "missing", detail: "ESLint Next.js + Prettier configurés.", group: "Qualité" });
  checks.push({ id: "security", label: "Sécurité", status: exists("SECURITY.md") && exists("scripts/security-audit.sh") ? "ok" : "missing", detail: "Audit et contrôles de sécurité du kit.", group: "Qualité" });
  checks.push({ id: "mobile", label: "Mobile-first", status: exists("scripts/mobile-first-check.mjs") && exists("components/mobile-bottom-nav.tsx") ? "ok" : "missing", detail: "Navigation et gates mobile-first présents.", group: "Qualité" });
  checks.push({ id: "skeleton", label: "Skeleton loaders", status: exists("components/ui/skeleton.tsx") && exists("scripts/loading-check.mjs") ? "ok" : "missing", detail: "Primitives et contrôle de chargement présents.", group: "Qualité" });
  checks.push({ id: "seo", label: "SEO / Social Preview", status: exists("app/sitemap.ts") && exists("app/opengraph-image.tsx") && exists("scripts/seo-check.mjs") ? "ok" : "missing", detail: "Sitemap, Open Graph et SEO gate présents.", group: "Qualité" });
  {
    const codexPath = path.join(process.cwd(), ".codex/config.toml");
    const codexText = fs.existsSync(codexPath) ? fs.readFileSync(codexPath, "utf8") : "";
    const mcpOk = /\[\s*mcp_servers\.banani\s*\]/i.test(codexText) && /Authorization/i.test(codexText);
    checks.push({ id: "banani", label: "Banani MCP / Implementation Planner", status: mcpOk && exists("DESIGN.md") && exists("scripts/generate-implementation-plan.mjs") ? "ok" : "missing", detail: mcpOk ? "MCP Banani configuré localement; token non affiché." : "Exécute npm run banani:prepare puis complète .codex/config.toml manuellement.", group: "Qualité" });
  }

  return checks;
}
