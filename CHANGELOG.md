# Changelog

## V0.8.15 — Health, tests et CI de qualité
- Ajout de `/api/health` et `/api/readyz`.
- Ajout de Vitest et de tests unitaires sur les garde-fous de paiement/providers.
- Ajout ESLint Next.js, Prettier et contrôle d’hygiène de format.
- CI enrichie : format, lint, conformité, typecheck, tests, build et audit npm production.
- Ajout `DATABASE_URL_DIRECT` pour migrations Neon/Drizzle.
- Ajout d’une politique de migrations Drizzle versionnées.
- Ajout d’un inventaire « ce que le starter embarque » et d’une documentation health/readiness.
- Correction du `security-check` : les erreurs ajoutées dans la seconde moitié du script sont désormais réellement bloquantes.

## V0.8.12 — Phase Explanations + Final Conformity Check
- `/setup-saas` explique désormais le rôle de chaque phase et ce qu’elle apporte au SaaS avant les étapes techniques.
- La roadmap affiche une description courte sous chacune des 18 phases.
- La phase courante affiche : rôle, bénéfice, objectif, état, actions et validation.
- Ajout de `npm run conformity:check`.
- Rapport final `generated/conformity-report.md/json` pour vérifier fichiers requis, JSON, scripts npm, hygiène Git/env, invariants sécurité/paiement, SEO et lockfile.
- La Phase 18 exige le contrôle de conformité avant de déclarer le parcours terminé.


## 0.8.7
- Démarrage local direct sur un dashboard de readiness, sans inscription ni connexion.
- `/setup` devient lecture seule ; suppression de l’ancienne API web d’écriture de configuration.
- Ajout du point d’entrée IA `/setup-saas` et de `npm run setup-saas`.
- Voyants verts/rouges pour core, services, paiements et qualité.
- Le dashboard interne n’est pas exposé par défaut en production.

# V0.8.6 — Deep Audit Consolidation

- Hardened `.gitignore` for production/development/test env files.
- Added pinned Better Auth CLI dependency (`auth`).
- Fixed PayDunya verification to return amount/currency to common reconciliation.
- Prevented raw provider response bodies from being embedded in persistent error messages.
- Minimized webhook persistence to transaction/reference/status summary instead of raw PII-rich payloads.
- Added beta-provider live-runtime blocking.
- Added foreign keys and query indexes to core billing tables.
- Removed private/mobile navigation from the public root shell; mobile app navigation is now dashboard-scoped.
- Removed duplicate Drizzle auth schema input.
- Updated stale internal version markers and Production Doctor warnings.
- Added explicit CSP hardening warning for `unsafe-inline` until nonce-based CSP is implemented.
- Setup now generates a dedicated `CRON_SECRET` and public app name.
- Deployment handoff no longer invents provider requirements from the example config when no real setup config exists.
- Webhook request bodies are now streamed with a hard 1 MB application limit even when `Content-Length` is missing.

## Consolidation finale V0.8.6
- Safe fallback des paiements : arrêt sur état fournisseur ambigu.
- Filtrage readiness/runtime corrigé sans pays.
- Comparaison monétaire normalisée par devise.
- Validation XOF/XAF en montant entier.
- Catalogue providers aligné et anciennes notes versionnées supprimées.

## V0.8.8 — Guided Setup Phases
- `/setup-saas` devient un assistant guidé en 16 phases.
- La commande `npm run setup-saas` génère un rapport Markdown et JSON avec roadmap complète, statut de chaque phase et première phase à traiter.
- Le workflow Antigravity affiche la liste complète puis accompagne une seule phase à la fois.
- Les actions décrivent service, menu, variable, commande, résultat attendu et validation.
- Les secrets ne doivent jamais être collés dans le chat : saisie directe dans `.env.local` ou le dashboard du service.
- Distinction explicite CONFIGURÉ / TESTÉ / NON VÉRIFIÉ.

## V0.8.9 — Optional Payments Late Setup
- Les providers de paiement deviennent totalement optionnels.
- Le wizard principal ne demande plus aucun provider et génère `providers: []`, `defaultProvider: null`.
- Les paiements sont déplacés en Phase 15, juste avant la mise en ligne.
- Nouvelle commande `npm run payments:setup` pour activer tardivement uniquement les providers nécessaires.
- Une Phase 15 non applicable peut être marquée `skipped` pour les SaaS sans paiement.
- Le Local Payment Lab, les routes de paiement, le Production Doctor et le handoff Vercel ne pénalisent plus un SaaS sans paiement.


## V0.8.10 — Optional Cloudflare Domain/DNS Phase
- Ajout d’une Phase 16 Cloudflare optionnelle pour domaine/DNS.
- La finalisation production/Search Console passe en Phase 17.
- Ajout de `npm run cloudflare:setup` et d’un guide généré sans secrets.
- Cloudflare n’est jamais bloquant et peut être marqué `skipped`.
- Distinction explicite entre Cloudflare domaine/DNS et Cloudflare R2 (toujours non intégré).


## V0.8.11
- Cloudinary ajouté comme provider optionnel pour les uploads d’images.
- Nouvelle Phase 17 optionnelle; production déplacée en Phase 18.
- Upload serveur signé, authentifié, limité à 10 MB et SVG refusé par défaut.
- `npm run cloudinary:setup` / `-- --none` et guide staging/Vercel.

## V0.8.13 — Provider Skill Router

- ajout du workflow Antigravity `/provider` ;
- ajout du registre `config/provider-skills.json` ;
- ajout de `npm run provider` ;
- intégration du skill Chariow fourni par l'utilisateur ;
- intégration du skill Mobile Money partagé et de ses références Moneroo, PayTech, Bictorys et Stripe ;
- distinction explicite entre skill dédié, skill partagé, documentation seulement et adaptateur seulement.

## V0.8.14 — Antigravity Skills fix

- Corrige la découverte de `/provider` et `/setup-saas` : migration de l'ancien `.agent/workflows/` vers `.agents/skills/<name>/SKILL.md`.
- `/provider` est maintenant un vrai Agent Skill Antigravity et peut être invoqué comme `/provider` ou `/provider <nom>`.
- Suppression des doublons `commands/` et de l'ancien chemin workflow pouvant induire Antigravity en erreur.
- Le fallback terminal `npm run provider [-- <nom>]` reste disponible.

## 0.8.16 — Robustesse serveur, anti-doublons et smoke tests

- ajout d’un gate `runtime:check` et runtime Node.js explicite sur toutes les routes API ;
- ajout d’un manifeste `config/features.json` pour éviter les doublons fonctionnels et clarifier la responsabilité des routes ;
- ajout d’un logger serveur structuré avec redaction récursive et request IDs sur les webhooks ;
- ajout d’un client HTTP générique : retry automatique seulement pour GET/HEAD ;
- centralisation de l’authentification cron et support GET/POST pour la réconciliation ;
- ajout de `smoke:system` et `cron:generate` ;
- renforcement Cloudinary par vérification des magic bytes ;
- documentation de la revue sélective du dépôt de référence ;
- aucune migration vers Prisma/JWT maison, aucun circuit breaker dupliqué, aucun Sentry/OTel forcé sans dépendances vérifiées.

### V0.8.16 — Auth/email fail-closed
- Email/password devient explicitement configurable.
- Vérification e-mail explicite via `AUTH_REQUIRE_EMAIL_VERIFICATION`.
- Resend devient une dépendance conditionnelle de l’auth email/password, pas une dépendance globale du SaaS.
- En production, les e-mails d’auth critiques ne sont plus silencieusement abandonnés si Resend manque.
- Le setup refuse une configuration sans aucune méthode d’auth réelle.
