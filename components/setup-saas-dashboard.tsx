import Link from "next/link";
import type { KitCheck } from "@/lib/setup/kit-dashboard";

const groups: KitCheck["group"][] = ["Base", "Services", "Paiements", "Qualité"];

export function SetupSaasDashboard({ checks }: { checks: KitCheck[] }) {
  const ok = checks.filter((c) => c.status === "ok").length;
  const warnings = checks.filter((c) => c.status === "warning").length;
  const missing = checks.filter((c) => c.status === "missing").length;
  const score = checks.length ? Math.round(((ok + warnings) / checks.length) * 100) : 0;

  return (
    <main className="shell kit-home">
      <section className="card kit-hero">
        <div>
          <p className="kit-eyebrow">Africa SaaS Kit</p>
          <h1>État de préparation du kit</h1>
          <p className="muted">Aucune inscription n’est requise pour démarrer le starter. Configure les éléments rouges, puis demande <code>/setup-saas</code> à l’IA d’Antigravity pour être guidé pas à pas.</p>
        </div>
        <div className="kit-score" aria-label={`${score}% prêt`}>
          <strong>{score}%</strong>
          <span>{ok} prêts · {warnings} optionnels/à revoir · {missing} à configurer</span>
        </div>
      </section>

      <div className="kit-actions">
        <code>/setup-saas</code>
        <span className="muted">ou</span>
        <code>npm run setup-saas</code>
        <Link className="btn secondary" href="/setup">Actualiser les contrôles</Link>
      </div>

      <section className="card kit-next">
        <h2>Backend status</h2>
        <p className="muted">Sondes JSON rapides pour confirmer que le serveur tourne et que ses dépendances sont prêtes.</p>
        <div className="kit-actions">
          <a className="btn secondary" href="/api/health" target="_blank" rel="noreferrer">/api/health — liveness</a>
          <a className="btn secondary" href="/api/readyz" target="_blank" rel="noreferrer">/api/readyz — readiness</a>
        </div>
      </section>

      {groups.map((group) => {
        const items = checks.filter((c) => c.group === group);
        if (!items.length) return null;
        return (
          <section key={group} className="kit-section">
            <h2>{group}</h2>
            <div className="kit-check-grid">
              {items.map((item) => (
                <article className={`kit-check ${item.status}`} key={item.id}>
                  <span className="kit-dot" aria-hidden="true" />
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="card kit-next">
        <h2>Ce que le starter embarque</h2>
        <ul>
          <li>Auth Better Auth, organisations, rôles et 2FA</li>
          <li>Neon PostgreSQL + Drizzle + migrations versionnées</li>
          <li>Admin, paiements optionnels, webhooks, cron et uploads Cloudinary optionnels</li>
          <li>Health/readiness, tests Vitest, ESLint, Prettier, typecheck, build et audit npm</li>
          <li>Computer Use / Browser Tools, mobile-first, skeleton loaders, SEO, Banani planner et handoff GitHub/Vercel</li>
        </ul>
      </section>

      <section className="card kit-next">
        <h2>Ordre recommandé</h2>
        <p className="muted">1. Lance <code>/setup-saas</code> → 2. vérifie Computer Use / Browser Tools → 3. configure Neon et les services de base → 4. importe Banani et construis le SaaS → 5. teste/build → 6. prépare GitHub/Vercel → 7. configure les paiements seulement en Phase 16 si nécessaire → 8. décide si Cloudflare sera utilisé en Phase 17 → 9. décide si Cloudinary sera utilisé pour les images en Phase 18 → 10. finalise la production en Phase 19.</p>
      </section>
    </main>
  );
}
