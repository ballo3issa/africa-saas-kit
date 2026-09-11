# Africa SaaS Kit — /setup-saas

**Progression : 15/20 phases validées**

> 🟢 terminé · 🟡 partiel · 🔴 à faire · ⚪ vérification externe/non automatisable

## Feuille de route complète

- 🟢 **Phase 1 — Prendre connaissance du kit et de l’outillage**
  - _Cette phase vérifie que ton Mac, Antigravity et le kit disposent des fichiers/règles nécessaires pour travailler proprement._
- 🟢 **Phase 2 — Activer et vérifier Computer Use / Browser Tools**
  - _Antigravity intègre un Browser Subagent capable d’ouvrir, lire et manipuler Chrome. Cette phase vérifie son activation réelle; il n’existe pas de package npm computer-use à installer dans le SaaS._
- 🟢 **Phase 3 — Installer les dépendances locales**
  - _npm installe les bibliothèques nécessaires au projet et le lockfile fige exactement les versions utilisées._
- 🟢 **Phase 4 — Configurer l’identité du SaaS**
  - _Cette phase définit l’identité technique du SaaS : nom, pays, devise, URL locale et niveau de sécurité._
- 🟢 **Phase 5 — Créer et connecter Neon PostgreSQL**
  - _Neon est la base PostgreSQL du SaaS. Elle stocke les utilisateurs, plans, transactions, paramètres et données métier._
- 🟢 **Phase 6 — Générer Better Auth et la base d’authentification**
  - _Better Auth gère l’authentification : sessions, connexion, reset mot de passe, Google OAuth, 2FA et rôles._
- 🟢 **Phase 7 — Configurer les emails et Google** _(validée localement)_
  - _Resend sert aux emails transactionnels et Google sert à la connexion OAuth ainsi qu’à la préparation Search Console._
- 🟢 **Phase 8 — Configurer la sécurité d’infrastructure**
  - _Cette phase met en place les protections d’infrastructure comme le rate limiting, l’anti-bot et les secrets de cron._
- 🟢 **Phase 9 — Importer le design Banani** _(validée localement)_
  - _Banani sert à préparer/importer les écrans et l’interface avant le codage._
- 🟢 **Phase 10 — Générer le plan d’implémentation du SaaS**
  - _Le Implementation Planner transforme les écrans et besoins en ordre de construction technique._
- 🟢 **Phase 11 — Construire mobile-first, responsive et avec skeleton loaders** _(validée localement)_
  - _Cette phase impose une construction mobile-first, responsive et des skeleton loaders pendant les chargements._
- 🟢 **Phase 12 — Préparer SEO Google et partage social**
  - _Le SEO prépare les pages publiques pour Google et les aperçus de partage sur WhatsApp, Facebook, LinkedIn et autres._
- 🟢 **Phase 13 — Tester la qualité, la sécurité et le build** _(validée localement)_
  - _Cette phase contrôle que le code compile, que les dépendances sont auditées et que les règles de sécurité/UI sont respectées._
- 🟢 **Phase 14 — Préparer le handoff GitHub / Vercel**
  - _Le Deployment Handoff rassemble les variables, callbacks, webhooks et paramètres nécessaires au déploiement._
- 🟢 **Phase 15 — Préparer GitHub, Vercel et le staging** _(validée localement)_
  - _GitHub conserve le code et Vercel héberge le SaaS. Le staging permet de tester le vrai déploiement avant production._
- 🟡 **Phase 16 — Configurer Upstash Redis (OPTIONNEL)**
  - _Upstash Redis est une couche rapide de cache et de données temporaires. Neon reste la source de vérité métier : Upstash ne remplace pas PostgreSQL et ne doit pas contenir les données critiques comme seule copie._
- 🔴 **Phase 17 — Décider et configurer les paiements (OPTIONNEL)**
  - _Les fournisseurs de paiement permettent d’encaisser en ligne par Mobile Money ou carte, mais ils sont totalement optionnels._
- 🔴 **Phase 18 — Configurer Cloudflare pour le domaine/DNS (OPTIONNEL)**
  - _Cloudflare peut gérer ou fournir le domaine et le DNS du SaaS. Son utilisation est facultative._
- 🔴 **Phase 19 — Configurer Cloudinary pour les uploads d’images (OPTIONNEL)**
  - _Cloudinary gère l’upload, le stockage, la transformation et la diffusion d’images. Son utilisation est facultative._
- 🔴 **Phase 20 — Finaliser production, domaine et Search Console**
  - _Cette phase finalise le vrai domaine HTTPS, Search Console et les derniers contrôles de production._

---

# 🟡 Phase 16 — Configurer Upstash Redis (OPTIONNEL)

## À quoi sert cette phase ?

Upstash Redis est une couche rapide de cache et de données temporaires. Neon reste la source de vérité métier : Upstash ne remplace pas PostgreSQL et ne doit pas contenir les données critiques comme seule copie.

## Ce que cela apporte au SaaS

Cette phase peut réduire la charge et la latence sur les lectures fréquentes, centraliser le rate limiting entre instances Vercel et conserver des états temporaires avec TTL.

## Objectif de la phase

Décider si ce SaaS a besoin d’un cache Redis/serverless et d’un rate limiting distribué pour réduire les lectures répétées vers Neon et stocker les états temporaires.

## État actuel

- 🔴 **Décision Upstash** — Optionnel — non activé
- 🟢 **Variables Redis** — UPSTASH_REDIS_REST_URL / TOKEN absents
- 🟢 **Helper cache** — Cache TTL + fallback Neon disponible

## Ce que tu dois faire maintenant

### Étape 1
Si le SaaS n’a pas besoin de cache/rate limiting distribué : exécuter `npm run upstash:setup -- --none`, puis `npm run setup-saas:mark -- --phase=16 --status=skipped --note="Upstash non utilisé"`.

### Étape 2
Si Upstash est utile : exécuter `npm run upstash:setup`, créer une base Redis dans Upstash Console et copier REST URL + REST TOKEN directement dans `.env.local` sans les coller dans le chat.

### Étape 3
Exécuter `npm run upstash:check` puis `npm run upstash:check:online` pour tester réellement la connexion.

### Étape 4
Utiliser Upstash seulement pour cache, rate limits, verrous/états temporaires et données recalculables. Conserver Neon comme source de vérité.

### Étape 5
Pour les entrées de cache, définir un TTL. Si le cache est utilisé comme cache, l’éviction peut être activée côté Upstash.

### Étape 6
Avant production, recopier les variables Upstash dans Vercel uniquement si cette phase a été activée.

## Assistance Computer Use pour cette phase

Si Upstash est activé, guider la création Redis, puis vérifier /api/readyz après le test REST PING. Aucun token ne doit apparaître dans le chat.

## Validation de la phase

La phase peut être SKIPPED. Si activée, `npm run upstash:check:online` doit réussir avant production et `/api/readyz` doit signaler Redis OK.

Quand c’est fait, relance **`/setup-saas`** (ou `npm run setup-saas`). L’IA doit recontrôler cette phase avant de passer à la suivante.
