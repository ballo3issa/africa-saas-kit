# Plan d'implémentation SaaS — généré depuis Banani

> Ce fichier est un plan de travail. L'IA doit le lire AVANT de modifier le code et avancer phase par phase. Elle ne doit pas déclarer une phase terminée sans vérifier ses critères.

## 0. Source de vérité design
- Projet: Etudeo
- Source: banani-mcp
- Écrans déclarés: 18
- Écrans publics: 2
- Écrans protégés: 16

## 1. Inventaire des écrans

| # | Écran | Route | Accès | Objectif |
|---:|---|---|---|---|
| 1 | Aujourd'hui — Mobile | `/dashboard` | authenticated | Présenter la journée de l'élève, le prochain cours, les cours du jour et les tâches prioritaires. |
| 2 | Aujourd'hui — Desktop | `/dashboard` | authenticated | Variante desktop de la journée avec navigation latérale, recherche, cours et tâches. |
| 3 | Semaine — Mobile | `/dashboard/week` | authenticated | Afficher le calendrier hebdomadaire, les événements à venir et un résumé de la semaine sur mobile. |
| 4 | Semaine — Desktop | `/dashboard/week` | authenticated | Variante desktop du calendrier hebdomadaire avec grille, échéances et résumé. |
| 5 | Étudier — Mobile | `/dashboard/study` | authenticated | Permettre de choisir une matière et une durée avant de démarrer une séance d'étude. |
| 6 | Étudier — Desktop | `/dashboard/study` | authenticated | Variante desktop de la préparation d'une séance d'étude avec matière, durée et statistiques. |
| 7 | Messages — Mobile | `/dashboard/messages` | authenticated | Lister les conversations, demandes de contact et messages récents sur mobile. |
| 8 | Messages — Desktop | `/dashboard/messages` | authenticated | Variante desktop de la messagerie avec liste des conversations et zone de discussion. |
| 9 | Historique — Desktop | `/dashboard/history` | authenticated | Afficher les séances d'étude passées, la concentration et les performances de l'élève. |
| 10 | Notifications — Desktop | `/dashboard/notifications` | authenticated | Afficher les rappels, nouveaux messages, objectifs atteints et ressources disponibles. |
| 11 | Créer — Desktop | `/dashboard/create` | authenticated | Présenter les options de création: tâche, événement, rappel, groupe d'étude, ressource ou note. |
| 12 | Créer un événement — Mobile | `/dashboard/create/event` | authenticated | Créer un événement avec type, matière, date, heure, durée, lieu, notification et description. |
| 13 | Créer un événement — Desktop | `/dashboard/create/event` | authenticated | Variante desktop du formulaire de création d'événement avec aperçu. |
| 14 | Créer une tâche — Desktop | `/dashboard/create/task` | authenticated | Créer une tâche avec description, matière, priorité et date limite. |
| 15 | Plus — Menu principal Mobile | `/dashboard/more` | authenticated | Regrouper les destinations secondaires, le compte, les paramètres, l'aide et la déconnexion. |
| 16 | Plus — Menu principal Desktop | `/dashboard/more` | authenticated | Variante desktop du menu secondaire et de la gestion du compte. |
| 17 | Studeo — Landing Page | `/` | public | Présenter le produit de planification scolaire, ses fonctionnalités, son fonctionnement, des témoignages, des offres tarifaires et des appels à l'inscription. |
| 18 | Connexion | `/login` | public | Permettre la connexion à Etudeo avec Google ou avec une adresse e-mail et un mot de passe. |

## 1bis. Comparaison Banani → Starter
- RÉUTILISER: 0
- ADAPTER: 18
- CRÉER: 0
- À CONFIRMER: 0

Voir `generated/banani-gap-analysis.md` avant toute implémentation.

## 2. Ordre obligatoire d'implémentation

### Phase A — Compréhension avant code
1. Lire `DESIGN.md`, ce plan et `design/banani/screens.json`.
2. Identifier composants réutilisables, layouts et tokens visuels.
3. Identifier les écrans qui exigent des données réelles.
4. Mapper chaque donnée vers le schéma Neon/Drizzle.
5. Lister les routes API/Server Actions nécessaires.
6. Lister permissions, rôles et cas multi-tenant.
7. Identifier paiements, emails, uploads et intégrations externes concernés.
8. Bloquer toute hypothèse métier non soutenue par le design ou le brief et la marquer `À CONFIRMER`.

**Gate A :** aucune implémentation ne commence avant que la matrice écran → données → action → permission soit complète.

### Phase B — Fondation technique
1. Vérifier env, Neon, Better Auth et Resend; vérifier les providers uniquement s’ils ont été activés volontairement.
2. Générer/migrer le schéma DB.
3. Vérifier rôles et permissions serveur.
4. Vérifier headers, rate limiting et Turnstile selon le niveau de sécurité.
5. Vérifier le lockfile et lancer `npm audit`.

**Gate B :** `npm run setup:check` et `npm run security:check` doivent passer sans FAIL.

### Phase C — Design system et mobile-first
1. Extraire couleurs, espacements, typographies et rayons depuis Banani.
2. Mapper les composants vers les primitives internes.
3. Créer les primitives manquantes avant de dupliquer du JSX.
4. Construire le layout mobile en premier, puis tablette et desktop.
5. Valider 320, 360, 390, 430, 768, 1024 et 1440 px.
6. Vérifier safe area, cibles tactiles, clavier mobile, navigation fluide et absence de scroll horizontal global.
7. Prévoir `loading.tsx` ou `Suspense` avec skeleton fidèle pour chaque écran data-driven.
8. Lancer `npm run mobile:check` et `npm run ui:loading-check`.

**Gate Mobile + Loading :** aucun écran suivant ne commence avant validation du mobile 320–430 px, du skeleton et des débordements.

### Phase D — Écrans publics
1. Studeo — Landing Page — `/`
2. Connexion — `/login`

Pour chaque écran public : prévoir dès maintenant metadata SEO, canonical, social preview et indexation.

### Phase E — Authentification et onboarding
1. Inscription, connexion, vérification email, reset password.
2. 2FA selon politique.
3. Organisation/team si le SaaS est multi-tenant.
4. Tests utilisateur A/B pour vérifier l'isolation.

### Phase F — Écrans protégés
1. Aujourd'hui — Mobile — `/dashboard`
2. Aujourd'hui — Desktop — `/dashboard`
3. Semaine — Mobile — `/dashboard/week`
4. Semaine — Desktop — `/dashboard/week`
5. Étudier — Mobile — `/dashboard/study`
6. Étudier — Desktop — `/dashboard/study`
7. Messages — Mobile — `/dashboard/messages`
8. Messages — Desktop — `/dashboard/messages`
9. Historique — Desktop — `/dashboard/history`
10. Notifications — Desktop — `/dashboard/notifications`
11. Créer — Desktop — `/dashboard/create`
12. Créer un événement — Mobile — `/dashboard/create/event`
13. Créer un événement — Desktop — `/dashboard/create/event`
14. Créer une tâche — Desktop — `/dashboard/create/task`
15. Plus — Menu principal Mobile — `/dashboard/more`
16. Plus — Menu principal Desktop — `/dashboard/more`

Pour chaque écran protégé :
- session vérifiée côté serveur ;
- ownership/tenant vérifié ;
- Zod sur entrées ;
- état loading / empty / error ;
- réponses API minimales ;
- aucun contrôle de rôle uniquement côté client ;
- metadata `noindex` et absence du sitemap.

### Phase G — Monétisation / paiements (OPTIONNEL)
1. Lire `docs/payments/local-payment-lab.md` avant les tests sandbox.
2. Sélectionner les providers autorisés par pays.
3. Créer le checkout côté serveur depuis `planId`, jamais depuis un montant client.
4. Persister PENDING avant redirection.
5. Vérifier webhook/IPN.
6. Re-puller le paiement chez le provider.
7. Comparer montant, devise, référence et statut.
8. Appliquer l'idempotence.
9. Activer abonnement/crédits uniquement après réconciliation.
10. Tester paiements tardifs et fallback.
11. En local : `npm run payments:ngrok` + `npm run payments:local`, puis configurer le webhook sandbox généré.
12. Tester duplicate/replay depuis ngrok et confirmer un fulfillment unique.

**Gate Paiement Local :** aucun provider n'est déclaré testé tant que succès + échec/annulation + pending/retard + duplicate/replay n'ont pas été observés.

### Phase H — Emails, stockage et jobs
1. Emails transactionnels Resend.
2. Uploads privés/publics séparés et validés si le stockage est réellement intégré.
3. Jobs/cron idempotents.
4. Logs sans secrets.

### Phase I — Google, SEO et partage social
1. Lire `docs/seo/google-seo.md`.
2. Pour chaque écran public : title unique, description, canonical, décision index/noindex.
3. Ajouter uniquement les pages publiques indexables au sitemap ; garder auth/dashboard/admin/setup/API hors sitemap et noindex.
4. Vérifier Open Graph/Twitter Card et prévoir une image 1200×630 spécifique pour les pages marketing stratégiques lorsque nécessaire.
5. Ajouter JSON-LD uniquement si les données structurées correspondent au contenu visible.
6. Exécuter `npm run seo:check`.
7. Après déploiement, vérifier Search Console, soumettre le sitemap et inspecter les URLs stratégiques.
8. Vérifier Google OAuth/domaine/callbacks si OAuth est activé.

**Gate SEO :** aucune page publique n'est terminée sans metadata, canonical, stratégie d'indexation et social preview vérifiables.

### Phase J — Tests et sécurité
1. `npm run mobile:check`.
2. `npm run ui:loading-check`.
3. `npm run seo:check`.
4. Typecheck/build.
5. Tests auth et permissions.
6. Test deux comptes.
7. Test client déloyal sur API/actions.
8. Test des webhooks rejoués.
9. `npm run security:audit`.
10. `npm run doctor:production`.

### Phase K — Production
1. Tous les FAIL du Production Doctor corrigés.
2. Tous les WARN explicitement acceptés ou corrigés.
3. Secrets production séparés du sandbox.
4. DNS/HTTPS/headers vérifiés.
5. Backups et procédure incident confirmés.
6. Search Console et social previews réellement testés sur l'URL HTTPS publique.
7. Déploiement progressif puis vérification post-déploiement.

## 3. Détail par écran

### 1. Aujourd'hui — Mobile
- Route: `/dashboard`
- Accès: authenticated
- But: Présenter la journée de l'élève, le prochain cours, les cours du jour et les tâches prioritaires.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé dans Today.jsx. Navigation basse mobile. Les sources de données et règles de progression restent À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 2. Aujourd'hui — Desktop
- Route: `/dashboard`
- Accès: authenticated
- But: Variante desktop de la journée avec navigation latérale, recherche, cours et tâches.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé dans TodayDesktop.jsx. Même route que la variante mobile; comportement responsive à unifier.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 3. Semaine — Mobile
- Route: `/dashboard/week`
- Accès: authenticated
- But: Afficher le calendrier hebdomadaire, les événements à venir et un résumé de la semaine sur mobile.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé dans WeekMobile.jsx. Les règles de création et de récurrence des événements restent À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 4. Semaine — Desktop
- Route: `/dashboard/week`
- Accès: authenticated
- But: Variante desktop du calendrier hebdomadaire avec grille, échéances et résumé.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé dans WeekDesktop.jsx. Même route que la variante mobile; comportement responsive à unifier.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 5. Étudier — Mobile
- Route: `/dashboard/study`
- Accès: authenticated
- But: Permettre de choisir une matière et une durée avant de démarrer une séance d'étude.
- États à implémenter: loading, default, empty, error, submitting, success, unauthorized, offline
- Notes Banani: Observé dans StudyMobile.jsx. Le chronomètre, la persistance et les règles de complétion restent À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 6. Étudier — Desktop
- Route: `/dashboard/study`
- Accès: authenticated
- But: Variante desktop de la préparation d'une séance d'étude avec matière, durée et statistiques.
- États à implémenter: loading, default, empty, error, submitting, success, unauthorized, offline
- Notes Banani: Observé dans StudyDesktop.jsx. Même route que la variante mobile; logique métier À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 7. Messages — Mobile
- Route: `/dashboard/messages`
- Accès: authenticated
- But: Lister les conversations, demandes de contact et messages récents sur mobile.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé dans MessagesMobile.jsx. Le temps réel, les contacts autorisés et les permissions restent À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 8. Messages — Desktop
- Route: `/dashboard/messages`
- Accès: authenticated
- But: Variante desktop de la messagerie avec liste des conversations et zone de discussion.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé dans MessagesDesktop.jsx. Même route que la variante mobile; règles de messagerie À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 9. Historique — Desktop
- Route: `/dashboard/history`
- Accès: authenticated
- But: Afficher les séances d'étude passées, la concentration et les performances de l'élève.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé uniquement en desktop dans HistoryDesktop.jsx. Variante mobile et calcul des métriques À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 10. Notifications — Desktop
- Route: `/dashboard/notifications`
- Accès: authenticated
- But: Afficher les rappels, nouveaux messages, objectifs atteints et ressources disponibles.
- États à implémenter: loading, default, empty, error, success, unauthorized, offline
- Notes Banani: Observé uniquement en desktop dans NotificationsDesktop.jsx. Canaux, déclencheurs et variante mobile À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 11. Créer — Desktop
- Route: `/dashboard/create`
- Accès: authenticated
- But: Présenter les options de création: tâche, événement, rappel, groupe d'étude, ressource ou note.
- États à implémenter: default, unauthorized
- Notes Banani: Observé uniquement en desktop dans CreateDesktop.jsx. Les options réellement livrées et la variante mobile restent À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 12. Créer un événement — Mobile
- Route: `/dashboard/create/event`
- Accès: authenticated
- But: Créer un événement avec type, matière, date, heure, durée, lieu, notification et description.
- États à implémenter: loading, default, submitting, success, validation-error, error, unauthorized, offline
- Notes Banani: Observé dans CreateEventMobile.jsx. Validation, stockage et règles de notification À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 13. Créer un événement — Desktop
- Route: `/dashboard/create/event`
- Accès: authenticated
- But: Variante desktop du formulaire de création d'événement avec aperçu.
- États à implémenter: loading, default, submitting, success, validation-error, error, unauthorized, offline
- Notes Banani: Observé dans CreateEventDesktop.jsx. Même route que la variante mobile; logique serveur À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 14. Créer une tâche — Desktop
- Route: `/dashboard/create/task`
- Accès: authenticated
- But: Créer une tâche avec description, matière, priorité et date limite.
- États à implémenter: loading, default, submitting, success, validation-error, error, unauthorized, offline
- Notes Banani: Observé uniquement en desktop dans CreateTaskDesktop.jsx. Variante mobile, validation et stockage À CONFIRMER.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 15. Plus — Menu principal Mobile
- Route: `/dashboard/more`
- Accès: authenticated
- But: Regrouper les destinations secondaires, le compte, les paramètres, l'aide et la déconnexion.
- États à implémenter: default, submitting, error, unauthorized
- Notes Banani: Observé dans MoreMenu.jsx. La déconnexion doit rester une action serveur/auth sécurisée.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 16. Plus — Menu principal Desktop
- Route: `/dashboard/more`
- Accès: authenticated
- But: Variante desktop du menu secondaire et de la gestion du compte.
- États à implémenter: default, submitting, error, unauthorized
- Notes Banani: Observé dans MoreMenuDesktop.jsx. Même route que la variante mobile.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: route privée noindex et hors sitemap.

### 17. Studeo — Landing Page
- Route: `/`
- Accès: public
- But: Présenter le produit de planification scolaire, ses fonctionnalités, son fonctionnement, des témoignages, des offres tarifaires et des appels à l'inscription.
- États à implémenter: default
- Notes Banani: Observé directement via Banani MCP dans LandingPage.jsx. Le design impose minWidth 1440px et ne fournit pas de variante mobile/tablette : le responsive 320–1024 px est À CONFIRMER. La marque Studeo doit être harmonisée avec Etudeo. Les CTA, ancres, FAQ, démo et liens légaux sont visuels mais leurs destinations restent À CONFIRMER. Les paiements sont désactivés : les cartes tarifaires n'autorisent aucun checkout.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: title unique, description, canonical, index/noindex, sitemap, social preview 1200×630.

### 18. Connexion
- Route: `/login`
- Accès: public
- But: Permettre la connexion à Etudeo avec Google ou avec une adresse e-mail et un mot de passe.
- États à implémenter: default, submitting, validation-error, error, success
- Notes Banani: Observé directement via Banani MCP dans LoginPage.jsx. La composition est desktop fixe à 1440×900 ; aucune variante mobile/tablette n'a été fournie. La marque Studeo doit être harmonisée avec Etudeo. Le témoignage et l'affirmation « des milliers d'élèves » restent À CONFIRMER. L'icône décorative sparkles ne doit pas être importée.
- Critères de validation: rendu responsive, loading skeleton, empty/error si applicables, aucune donnée sensible dans les props client, permissions serveur testées.
- SEO: title unique, description, canonical, index/noindex, sitemap, social preview 1200×630.


## 4. Règle pour l'IA
À chaque phase, l'IA doit répondre avec :
1. ce qu'elle va implémenter ;
2. les fichiers concernés ;
3. les risques sécurité ;
4. le résultat attendu ;
5. les tests à exécuter ;
6. le statut du gate avant de passer à la phase suivante.

Elle ne doit jamais sauter directement de l'import Banani au code complet du SaaS.