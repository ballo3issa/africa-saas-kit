> **Version : V0.8.16 — Robustesse serveur, anti-doublons & smoke tests**

# Africa SaaS Kit V0.8.16

Starter Next.js + Neon + Better Auth conçu pour construire des SaaS adaptés aux réalités africaines : Mobile Money, XOF/XAF, paiements asynchrones, sécurité intégrée et routage multi-gateway.


## V0.8.16 — revue sélective izikit, sans duplication

Cette revue a aussi détecté une **impasse auth/e-mail** : un SaaS ne doit jamais garder email/mot de passe actif en production si aucun service ne peut livrer les e-mails de vérification et de récupération. Le setup lie maintenant explicitement ce choix à Resend ; sans Resend, il faut désactiver email/mot de passe et utiliser un autre provider d’auth.


Cette version compare les idées utiles du dépôt de référence avec les briques déjà présentes dans Africa SaaS Kit. Elle **n’ajoute pas une deuxième implémentation** lorsqu’une fonction existe déjà.

Nouveautés retenues :

- `npm run runtime:check` : toutes les routes `app/api/**` restent explicitement en runtime Node.js ;
- `config/features.json` + `npm run features:list` / `features:check` : manifeste de responsabilité pour éviter les doublons de routes/helpers ;
- `lib/observability/logger.ts` : logs structurés avec redaction récursive des secrets/PII ;
- request IDs sur les webhooks ;
- `lib/api/client.ts` : retries automatiques uniquement pour GET/HEAD, jamais pour les mutations ambiguës ;
- helper cron centralisé, fail-closed en production, avec GET pour Vercel Cron et POST pour test manuel ;
- `npm run smoke:system` : smoke test health/readiness/Better Auth/robots/sitemap ;
- `npm run cron:generate` : génère la config cron Vercel seulement si des paiements ont réellement été activés ;
- Cloudinary vérifie maintenant le contenu binaire réel de l’image (magic bytes), pas seulement le MIME fourni par le client.

Voir `docs/architecture/izikit-selective-review.md`.

## Backend status et qualité V0.8.16

Le starter expose maintenant :

- `GET /api/health` : liveness Next.js (200 si le serveur tourne) ;
- `GET /api/readyz` : readiness Neon + Upstash lorsqu’il est configuré (503 si une dépendance configurée nécessaire est indisponible) ;
- `npm run test` : tests unitaires Vitest des garde-fous sensibles ;
- `npm run lint` : ESLint Next.js Core Web Vitals ;
- `npm run format:check` : hygiène de format reproductible en CI ;
- `npm run audit:prod` : audit des dépendances de production ;
- `DATABASE_URL_DIRECT` : connexion Neon directe optionnelle recommandée pour Drizzle Kit/migrations.

Les migrations sous `db/migrations/` doivent être versionnées dans Git. Voir `docs/architecture/starter-capabilities.md` et `docs/operations/health-readiness.md`.


## V0.8.13 — Setup pédagogique + routeur de skills providers

La V0.8.13 conserve le handoff GitHub/Vercel, SEO, ngrok, skeleton loaders, mobile-first, les phases pédagogiques et le contrôle final de conformité. Elle ajoute `/provider`, le routeur officiel permettant de découvrir et charger les skills ou références disponibles pour chaque fournisseur de paiement.


### Test final de conformité

À la fin du parcours :

```bash
npm run conformity:check
```

Le rapport `generated/conformity-report.md` contrôle la structure du starter, les scripts, les JSON, `.gitignore`, les invariants sécurité/paiements, le SEO, les skeleton loaders et le `package-lock.json`. Un `FAIL` doit être corrigé avant de considérer le kit conforme. Ce test ne remplace pas le build réel, `npm audit` ni les tests des services externes.

### Tester les paiements en local

```bash
# Terminal A
npm run dev

# Terminal B
npm run payments:ngrok

# Terminal C
npm run payments:local
npm run payments:local:apply
```

Le Local Payment Lab est **optionnel** et ne s’utilise que si le SaaS active des paiements en Phase 15. Il génère alors `generated/local-payment-lab.md` avec les URL webhook exactes. `PAYMENT_WEBHOOK_BASE_URL` est séparé de `NEXT_PUBLIC_APP_URL`.

### Mobile-first

```bash
npm run mobile:check
```

Chaque écran doit être construit et vérifié d’abord à 320/360/390/430 px, puis 768/1024/1440 px. Le starter inclut une navigation basse mobile, safe-area, cibles tactiles et protections contre les débordements. Voir `docs/mobile/mobile-first-delivery.md`.

## Héritage V0.8.1 — Google + Banani + paiement + audit sécurité

Le kit démarre maintenant directement sur un tableau de préparation local : aucun compte ni formulaire d’inscription n’est requis pour accéder au starter. Le setup est piloté par `/setup-saas` dans l’IA ou par les commandes terminal.

`http://localhost:3000/` et `/setup` affichent en lecture seule l’état du kit avec voyants verts/rouges. La configuration n’est plus écrite par une API web.

En production, `/setup` est désactivé et le tableau interne du kit n’est pas exposé. Utilisez les variables d’environnement de l’hébergeur pour la production.


```bash
npm install
npm run setup
```

L'assistant principal demande uniquement les choix de base :

- pays principal et devise ;
- nom et URL locale de l'application ;
- niveau de sécurité (`standard`, `high`, `maximum`) ;
- Resend ou aucun fournisseur email ;
- Google OAuth/Search Console si souhaités.

Les paiements, Cloudflare domaine/DNS et Cloudinary restent **optionnels** et sont configurés seulement en fin de parcours via `/setup-saas`.

Il génère :

```text
africa-saas.config.json
.env.local
generated/setup-summary.json
```

`BETTER_AUTH_SECRET` est créé automatiquement avec un générateur cryptographique. Les vraies clés Neon, Resend et paiement ne sont jamais inventées.

### Exemple Côte d'Ivoire

```bash
npm run setup -- \
  --non-interactive \
  --country=CI \
  --name="Mon SaaS" \
  --security=high
```

Puis :

```bash
npm run setup:check
npm run db:generate
npm run db:migrate
npm run security:check
npm run dev
```

`npm run payments:routes` n’est utilisé qu’en Phase 15 si des paiements sont activés. Il génère alors un fichier SQL **à relire** dans `generated/payment-routes.sql` et ne modifie pas automatiquement une base de production.

## Presets pays V0.7

Le kit fournit des presets pour :

```text
CI  Côte d'Ivoire  XOF
SN  Sénégal        XOF
BJ  Bénin          XOF
BF  Burkina Faso   XOF
TG  Togo           XOF
CM  Cameroun       XAF
NG  Nigeria        NGN
GH  Ghana          GHS
KE  Kenya          KES
```

Les presets sont des points de départ. La disponibilité réelle d'un opérateur et d'une devise doit toujours être confirmée dans le contrat du marchand avec chaque provider.

## Smart Payment Router

La V0.5/V0.6 conserve le moteur de routage :

```text
Pays + méthode
     ↓
providers autorisés
     ↓
priorité admin
     ↓
santé récente
     ↓
checkout
```

Un fallback automatique peut avoir lieu uniquement lors de la **création du checkout** et uniquement lorsque l'utilisateur n'a pas choisi explicitement un provider. Un paiement n'est jamais validé par le router.

Validation :

```text
webhook/IPN authentifié
        ↓
re-vérification API fournisseur
        ↓
montant + devise + référence
        ↓
idempotence
        ↓
abonnement activé
```

## Providers

| Provider | Statut du kit |
|---|---|
| FedaPay | production après tests marchand |
| Chariow | production après tests/mapping |
| PayDunya | production après tests marchand |
| Flutterwave | beta |
| Djomy | merchant-validation — bloqué par le wizard |
| Moneroo | production après tests marchand |
| PayTech | beta |
| Bictorys | beta |
| Stripe | scaffold — bloqué |

Le wizard refuse volontairement les providers `scaffold` ou `merchant-validation`. Les providers `beta` restent activables uniquement pour sandbox/tests contrôlés.

## Sécurité

La sécurité est une partie centrale du kit :

- headers CSP/HSTS et protections navigateur ;
- validation serveur ;
- 2FA admin selon niveau de sécurité ;
- rate limiting ;
- Turnstile optionnel ;
- audit/security events ;
- webhooks idempotents ;
- prix relus côté serveur ;
- `.env.local` non commité ;
- checklist de mise en production ;
- procédure d'incident.

Avant production :

```bash
npm run setup:check
npm run security:check
npm run runtime:check
npm run features:check
npm run security:audit
npm run design:check
npm run typecheck
npm run test
npm run build
npm run smoke:system
```

Puis suivre :

```text
docs/production-checklist.md
SECURITY.md
```

## Stack

```text
Next.js
TypeScript
Neon PostgreSQL
Drizzle ORM
Better Auth
Resend
Cloudinary (optionnel, images publiques)
Upstash (optionnel)
FedaPay / Chariow / PayDunya / Flutterwave / Moneroo / PayTech / Bictorys
GitHub Actions
Vercel / Cloudflare
```

## Documentation V0.7

```text
docs/setup-wizard.md
docs/web-setup.md
docs/production-checklist.md
docs/payments/smart-router.md
docs/payments/paydunya.md
docs/payments/djomy.md
docs/security/*
docs/google/search-console.md
docs/google/cloud-console.md
docs/design/banani.md
docs/payments/skills-review-v0.7.1.md
docs/payments/reconciliation.md
DESIGN.md
```

## Important avant production

1. Faire `npm install` et commiter le vrai `package-lock.json`.
2. Utiliser une base Neon production séparée du développement.
3. Tester chaque gateway en sandbox puis avec de petits paiements live contrôlés.
4. Vérifier les webhooks/IPN, rejouages et montants erronés.
5. Activer 2FA pour les administrateurs.
6. Ne jamais placer une clé privée dans une variable `NEXT_PUBLIC_*`.
7. Tester une restauration de base de données.

## Google Search Console

Le kit génère `/sitemap.xml` et `/robots.txt` et peut injecter la balise de vérification Google avec :

```env
GOOGLE_SITE_VERIFICATION=
```

Pour une propriété de domaine, la validation DNS reste recommandée. Un helper API lecture seule est disponible dans `lib/google/search-console.ts`.

## Google Cloud Console / Connexion Google

Configurer dans `.env.local` :

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true
```

Callback Better Auth :

```text
http://localhost:3000/api/auth/callback/google
https://votre-domaine.com/api/auth/callback/google
```

L'écran admin `/admin/integrations/google` affiche uniquement l'état de configuration, jamais les secrets.

## Banani

Banani n'était pas réellement intégré avant la V0.8.1. Le dépôt contient désormais :

```text
DESIGN.md
design/banani/screens/
docs/design/banani.md
```

Utiliser l'export Banani/Figma ou le MCP proposé par Banani, puis demander à Antigravity/Codex d'implémenter les écrans en respectant `DESIGN.md`. Le kit ne fabrique pas de faux endpoint Banani : le handoff suit les mécanismes actuellement exposés par Banani.

## Réconciliation paiements

Configurer :

```env
CRON_SECRET=
```

Puis appeler périodiquement :

```text
POST /api/cron/reconcile-payments
Authorization: Bearer <CRON_SECRET>
```

Les paiements `pending` et `failed` récents sont re-vérifiés auprès du fournisseur jusqu'à 14 jours afin de rattraper les confirmations Mobile Money tardives.

---

# V0.8 — Banani Implementation Planner + Production Doctor

Après import des écrans Banani, ne commencez pas directement à coder tout le SaaS. Mettez à jour `design/banani/screens.json`, puis lancez :

```bash
npm run design:plan
```

Le kit génère `generated/implementation-plan.md`. Les agents IA doivent lire `AGENTS.md` et suivre le plan phase par phase, avec critères de validation avant de continuer.

Avant production :

```bash
npm run doctor:production
```

Et lorsque l'URL de production est accessible :

```bash
npm run doctor:production:online
```

Le rapport est enregistré dans `generated/production-doctor.json` et visible dans `/admin/production-doctor`.

Le Doctor contrôle notamment configuration, env, Better Auth, Neon, Resend, état du stockage, Google, providers activés, routes webhooks, réconciliation, lockfile, dépendances épinglées, sécurité structurelle et — en mode online — DNS, HTTPS, headers, robots et sitemap.

Un score élevé n'est pas une preuve absolue de sécurité : `npm run security:audit`, les tests à deux comptes, si des paiements sont activés, leurs tests sandbox et la réconciliation restent obligatoires.


## Skeleton loaders V0.8.3

Toute page data-driven doit fournir un `loading.tsx` ou un fallback `Suspense` basé sur `components/ui/skeleton.tsx`. Les skeletons imitent la structure finale, sont mobile-first, respectent `prefers-reduced-motion` et sont contrôlés par `npm run ui:loading-check`.

## SEO Google & aperçus de partage V0.8.6

Le kit inclut maintenant une couche SEO par défaut :

```text
lib/seo/site.ts
lib/seo/metadata.ts
components/seo/json-ld.tsx
app/opengraph-image.tsx
app/twitter-image.tsx
app/manifest.ts
app/sitemap.ts
app/robots.ts
public/icon.svg
```

Chaque page publique doit définir un titre, une description, une URL canonical et sa stratégie d'indexation. Les espaces privés (`/dashboard`, `/admin`, `/setup`, `/api` et auth) restent `noindex` et hors sitemap.

L'image Open Graph par défaut est générée en 1200×630 pour accompagner les liens partagés sur WhatsApp, Facebook, LinkedIn, X et autres clients compatibles. Les pages marketing importantes peuvent définir leur propre image de partage.

Contrôle :

```bash
npm run seo:check
```

Après déploiement, compléter la vérification réelle avec Google Search Console et :

```bash
npm run doctor:production:online
```

Le kit optimise la préparation technique SEO mais ne promet jamais une position Google : la qualité et la pertinence du contenu, la performance, les liens et la concurrence restent déterminants.


## V0.8.6 — Deployment & Environment Handoff

Avant GitHub/Vercel, lance :

```bash
npm run deploy:handoff
```

Puis suis `generated/deployment-handoff.md`. Le rapport liste les variables, services, webhooks et callbacks à configurer sans jamais révéler les valeurs secrètes. L’IA doit avancer gate par gate jusqu’au Production Doctor final.


## Documentation de version

- `AUDIT.md` : dernier audit consolidé du kit.
- `CHANGELOG.md` : changements de la version courante.

Les anciens fichiers `AUDIT-V...` et `CHANGELOG-V...` ne sont pas livrés dans le starter afin de garder la racine propre. L’historique détaillé doit vivre dans Git/GitHub.



## Paiements optionnels — configurés seulement avant mise en ligne

Le kit démarre et reste valide avec :

```json
"paymentsEnabled": false,
"providers": [],
"defaultProvider": null
```

Le wizard initial `npm run setup` **ne demande plus aucun provider**.

En Phase 15 seulement :

```bash
# SaaS avec paiements
npm run payments:setup

# SaaS sans paiements
npm run payments:setup -- --none
```

Si aucun paiement n’est nécessaire, FedaPay, PayDunya, Chariow, Flutterwave, Moneroo, etc. ne sont jamais requis.

## /setup-saas — démarrage guidé dans Antigravity

Dans le chat de l’agent, écris simplement :

```text
/setup-saas
```

L’agent doit lire `.agents/skills/setup-saas/SKILL.md`, exécuter `npm run setup-saas`, présenter les voyants rouges/verts et guider la configuration gate par gate. Aucun compte n’est requis pour accéder au kit.

Équivalent terminal :

```bash
npm run setup-saas
```


## Cloudflare (optionnel, Phase 16)
Le kit peut guider l’achat/gestion du domaine et la configuration DNS via Cloudflare, mais Cloudflare n’est jamais requis. Utiliser `npm run cloudflare:setup` seulement en Phase 16. Sans Cloudflare, exécuter `npm run cloudflare:setup -- --none` puis marquer la phase `skipped`. Cette option domaine/DNS est distincte de Cloudflare R2, qui reste non intégré.


## Cloudinary (optionnel)

Les uploads d’images peuvent être activés tardivement en Phase 17 avec `npm run cloudinary:setup`. Un SaaS sans upload d’images n’a besoin d’aucun compte Cloudinary. Le endpoint de référence `/api/uploads/images` est authentifié et limite types/taille côté serveur.

## Commande `/provider`

Dans l'Agent Antigravity, utilise :

```text
/provider
```

pour afficher le catalogue des skills providers disponibles et la syntaxe pour les appeler.

Exemples :

```text
/provider chariow
/provider moneroo
/provider paytech
/provider bictorys
/provider stripe
/provider paydunya
```

Le registre officiel est `config/provider-skills.json`. Un provider peut avoir un skill dédié, utiliser un skill partagé, n'avoir qu'une documentation d'intégration, ou seulement un adaptateur de code. Le workflow doit toujours afficher cette différence clairement.

Équivalent terminal :

```bash
npm run provider
npm run provider -- chariow
```

## Commandes Antigravity (`/setup-saas` et `/provider`)

Les commandes personnalisées du kit sont désormais de vrais **Agent Skills Antigravity** dans `.agents/skills/` :

- `/setup-saas` → `.agents/skills/setup-saas/SKILL.md`
- `/provider` → `.agents/skills/provider/SKILL.md`
- `/provider chariow`, `/provider fedapay`, etc. pour cibler un fournisseur.

Si une session Antigravity était déjà ouverte avant l'ajout des skills, rouvrir/recharger le projet ou démarrer une nouvelle conversation afin que l'index des skills soit rafraîchi.

Fallback terminal :

```bash
npm run setup-saas
npm run provider
npm run provider -- chariow
```
