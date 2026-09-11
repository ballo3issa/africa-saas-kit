# Africa SaaS Kit — /setup-saas

**Progression : 17/20 phases validées**

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
- 🟢 **Phase 16 — Configurer Upstash Redis (OPTIONNEL)** _(validée localement)_
  - _Upstash Redis est une couche rapide de cache et de données temporaires. Neon reste la source de vérité métier : Upstash ne remplace pas PostgreSQL et ne doit pas contenir les données critiques comme seule copie._
- 🟢 **Phase 17 — Décider et configurer les paiements (OPTIONNEL)** _(validée localement)_
  - _Les fournisseurs de paiement permettent d’encaisser en ligne par Mobile Money ou carte, mais ils sont totalement optionnels._
- 🔴 **Phase 18 — Configurer Cloudflare pour le domaine/DNS (OPTIONNEL)**
  - _Cloudflare peut gérer ou fournir le domaine et le DNS du SaaS. Son utilisation est facultative._
- 🔴 **Phase 19 — Configurer Cloudinary pour les uploads d’images (OPTIONNEL)**
  - _Cloudinary gère l’upload, le stockage, la transformation et la diffusion d’images. Son utilisation est facultative._
- 🔴 **Phase 20 — Finaliser production, domaine et Search Console**
  - _Cette phase finalise le vrai domaine HTTPS, Search Console et les derniers contrôles de production._

---

# 🔴 Phase 18 — Configurer Cloudflare pour le domaine/DNS (OPTIONNEL)

## À quoi sert cette phase ?

Cloudflare peut gérer ou fournir le domaine et le DNS du SaaS. Son utilisation est facultative.

## Ce que cela apporte au SaaS

Il peut centraliser le domaine/DNS et éventuellement servir de couche réseau devant Vercel, sans être nécessaire au fonctionnement du SaaS.

## Objectif de la phase

Décider si le domaine et/ou le DNS du SaaS seront gérés avec Cloudflare. Cette phase est facultative et ne concerne pas Cloudflare R2.

## État actuel

- 🔴 **Décision Cloudflare** — Optionnel — utiliser Cloudflare pour le domaine/DNS ou marquer cette phase skipped.

## Ce que tu dois faire maintenant

### Étape 1
Si tu ne veux PAS utiliser Cloudflare : exécuter `npm run cloudflare:setup -- --none`, puis marquer la phase `skipped` avec `npm run setup-saas:mark -- --phase=18 --status=skipped --note="Cloudflare non utilisé"`.

### Étape 2
Si tu veux utiliser Cloudflare : exécuter `npm run cloudflare:setup` puis suivre le guide généré dans `generated/cloudflare-setup.md`.

### Étape 3
Pour un domaine acheté ou géré chez Cloudflare : préparer le domaine, puis utiliser les enregistrements DNS demandés par Vercel pour le domaine custom. Ne jamais inventer une adresse A/CNAME : reprendre exactement les valeurs affichées par Vercel pour ce projet.

### Étape 4
Si le proxy Cloudflare gêne une validation de domaine/SSL, utiliser temporairement le mode DNS only jusqu’à validation complète, puis re-tester avant d’activer un proxy.

### Étape 5
Ne jamais ajouter de token API Cloudflare dans le chat. Cette phase domaine/DNS n’exige aucun token API dans le kit.

### Étape 6
Après validation réelle du domaine/DNS, marquer la phase passée avec `npm run setup-saas:mark -- --phase=18 --status=passed --note="Cloudflare domaine/DNS validé"`.

## Assistance Computer Use pour cette phase

Si Cloudflare utilisé, guider le DNS dans le navigateur mais demander confirmation avant tout changement critique/achat; vérifier ensuite le domaine.

## Validation de la phase

La phase est soit SKIPPED (Cloudflare non utilisé), soit PASSED après validation réelle du domaine/DNS. L’absence de Cloudflare n’est jamais bloquante.

Quand c’est fait, relance **`/setup-saas`** (ou `npm run setup-saas`). L’IA doit recontrôler cette phase avant de passer à la suivante.
