# Setup SaaS guidé

Le workflow `/setup-saas` guide Africa SaaS Kit en **18 phases**. Chaque phase commence par une explication simple : **à quoi sert le service**, **ce qu’il apporte au SaaS**, **s’il est obligatoire ou optionnel**, puis seulement les étapes de configuration.

Le workflow n’affiche pas uniquement une checklist technique : il doit permettre à une personne non spécialiste de comprendre pourquoi Neon, Better Auth, Resend, Vercel, Cloudflare ou Cloudinary sont utilisés avant de les configurer.

## Principes
- une seule phase détaillée à la fois ;
- la roadmap complète reste visible ;
- aucune clé secrète dans le chat ;
- CONFIGURÉ ≠ TESTÉ ;
- paiements, Cloudflare et Cloudinary sont optionnels ;
- une phase n’est verte qu’après contrôle réel ou `skipped` explicite lorsqu’elle est optionnelle.

## Fin du parcours
La Phase 18 inclut le contrôle final :

```bash
npm run conformity:check
```

Ce test produit :
- `generated/conformity-report.md`
- `generated/conformity-report.json`

Il vérifie notamment les fichiers requis, JSON, scripts npm, `.gitignore`, absence de fichiers secrets locaux, propreté des audits/changelogs, règles `/setup-saas`, protections des paiements/webhooks, skeleton loaders, SEO, health/readiness, tests unitaires, lint/format et présence du lockfile.

Un `FAIL` doit être corrigé avant de considérer le kit conforme. Le test de conformité reste complémentaire au `build`, à `npm audit`, aux tests des services externes et au staging Vercel.

## Gates renforcés V0.8.16

En Phase 12, ajouter aux contrôles existants :

```bash
npm run runtime:check
npm run features:check
npm run smoke:system
```

`runtime:check` protège la compatibilité Node.js de toutes les Route Handlers. `features:check` empêche deux features de revendiquer la même route et vérifie les fichiers propriétaires. `smoke:system` s'exécute contre un serveur local ou un preview via `SMOKE_BASE_URL`.

En Phase 15, après activation de paiements :

```bash
npm run cron:generate
```

Cette commande ne fait rien si aucun provider n'est activé.
