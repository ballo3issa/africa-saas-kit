# Banani → Africa SaaS Kit — Gap analysis

> Généré à partir du snapshot MCP Banani. Le design est une source de vérité visuelle, pas une autorisation pour inventer les règles métier.

## Résumé

- Écrans importés: 17
- RÉUTILISER: 0
- ADAPTER: 17
- CRÉER: 0
- À CONFIRMER: 0
- Pages existantes détectées: 28
- Routes API existantes détectées: 7

## Matrice écran → starter

|   # | Écran                         | Route                      | Décision    | Page existante                         |
| --: | ----------------------------- | -------------------------- | ----------- | -------------------------------------- |
|   1 | Aujourd'hui — Mobile          | `/dashboard`               | **ADAPTER** | `app/dashboard/page.tsx`               |
|   2 | Aujourd'hui — Desktop         | `/dashboard`               | **ADAPTER** | `app/dashboard/page.tsx`               |
|   3 | Semaine — Mobile              | `/dashboard/week`          | **ADAPTER** | `app/dashboard/week/page.tsx`          |
|   4 | Semaine — Desktop             | `/dashboard/week`          | **ADAPTER** | `app/dashboard/week/page.tsx`          |
|   5 | Étudier — Mobile              | `/dashboard/study`         | **ADAPTER** | `app/dashboard/study/page.tsx`         |
|   6 | Étudier — Desktop             | `/dashboard/study`         | **ADAPTER** | `app/dashboard/study/page.tsx`         |
|   7 | Messages — Mobile             | `/dashboard/messages`      | **ADAPTER** | `app/dashboard/messages/page.tsx`      |
|   8 | Messages — Desktop            | `/dashboard/messages`      | **ADAPTER** | `app/dashboard/messages/page.tsx`      |
|   9 | Historique — Desktop          | `/dashboard/history`       | **ADAPTER** | `app/dashboard/history/page.tsx`       |
|  10 | Notifications — Desktop       | `/dashboard/notifications` | **ADAPTER** | `app/dashboard/notifications/page.tsx` |
|  11 | Créer — Desktop               | `/dashboard/create`        | **ADAPTER** | `app/dashboard/create/page.tsx`        |
|  12 | Créer un événement — Mobile   | `/dashboard/create/event`  | **ADAPTER** | `app/dashboard/create/event/page.tsx`  |
|  13 | Créer un événement — Desktop  | `/dashboard/create/event`  | **ADAPTER** | `app/dashboard/create/event/page.tsx`  |
|  14 | Créer une tâche — Desktop     | `/dashboard/create/task`   | **ADAPTER** | `app/dashboard/create/task/page.tsx`   |
|  15 | Plus — Menu principal Mobile  | `/dashboard/more`          | **ADAPTER** | `app/dashboard/more/page.tsx`          |
|  16 | Plus — Menu principal Desktop | `/dashboard/more`          | **ADAPTER** | `app/dashboard/more/page.tsx`          |
|  17 | Studeo — Landing Page         | `/`                        | **ADAPTER** | `app/page.tsx`                         |

## Features existantes potentiellement concernées

- Aucune correspondance automatique fiable. L’IA doit consulter config/features.json avant toute création.

## Détail

### 1. Aujourd'hui — Mobile — ADAPTER

- Route Banani: `/dashboard`
- Existant: `app/dashboard/page.tsx`
- Décision: La route existe déjà (app/dashboard/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/._mobile-bottom-nav.tsx`, `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 2. Aujourd'hui — Desktop — ADAPTER

- Route Banani: `/dashboard`
- Existant: `app/dashboard/page.tsx`
- Décision: La route existe déjà (app/dashboard/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 3. Semaine — Mobile — ADAPTER

- Route Banani: `/dashboard/week`
- Existant: `app/dashboard/week/page.tsx`
- Décision: La route existe déjà (app/dashboard/week/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/._mobile-bottom-nav.tsx`, `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 4. Semaine — Desktop — ADAPTER

- Route Banani: `/dashboard/week`
- Existant: `app/dashboard/week/page.tsx`
- Décision: La route existe déjà (app/dashboard/week/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 5. Étudier — Mobile — ADAPTER

- Route Banani: `/dashboard/study`
- Existant: `app/dashboard/study/page.tsx`
- Décision: La route existe déjà (app/dashboard/study/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/._mobile-bottom-nav.tsx`, `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 6. Étudier — Desktop — ADAPTER

- Route Banani: `/dashboard/study`
- Existant: `app/dashboard/study/page.tsx`
- Décision: La route existe déjà (app/dashboard/study/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 7. Messages — Mobile — ADAPTER

- Route Banani: `/dashboard/messages`
- Existant: `app/dashboard/messages/page.tsx`
- Décision: La route existe déjà (app/dashboard/messages/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/._mobile-bottom-nav.tsx`, `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 8. Messages — Desktop — ADAPTER

- Route Banani: `/dashboard/messages`
- Existant: `app/dashboard/messages/page.tsx`
- Décision: La route existe déjà (app/dashboard/messages/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 9. Historique — Desktop — ADAPTER

- Route Banani: `/dashboard/history`
- Existant: `app/dashboard/history/page.tsx`
- Décision: La route existe déjà (app/dashboard/history/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 10. Notifications — Desktop — ADAPTER

- Route Banani: `/dashboard/notifications`
- Existant: `app/dashboard/notifications/page.tsx`
- Décision: La route existe déjà (app/dashboard/notifications/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 11. Créer — Desktop — ADAPTER

- Route Banani: `/dashboard/create`
- Existant: `app/dashboard/create/page.tsx`
- Décision: La route existe déjà (app/dashboard/create/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 12. Créer un événement — Mobile — ADAPTER

- Route Banani: `/dashboard/create/event`
- Existant: `app/dashboard/create/event/page.tsx`
- Décision: La route existe déjà (app/dashboard/create/event/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/._mobile-bottom-nav.tsx`, `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 13. Créer un événement — Desktop — ADAPTER

- Route Banani: `/dashboard/create/event`
- Existant: `app/dashboard/create/event/page.tsx`
- Décision: La route existe déjà (app/dashboard/create/event/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 14. Créer une tâche — Desktop — ADAPTER

- Route Banani: `/dashboard/create/task`
- Existant: `app/dashboard/create/task/page.tsx`
- Décision: La route existe déjà (app/dashboard/create/task/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 15. Plus — Menu principal Mobile — ADAPTER

- Route Banani: `/dashboard/more`
- Existant: `app/dashboard/more/page.tsx`
- Décision: La route existe déjà (app/dashboard/more/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/._mobile-bottom-nav.tsx`, `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 16. Plus — Menu principal Desktop — ADAPTER

- Route Banani: `/dashboard/more`
- Existant: `app/dashboard/more/page.tsx`
- Décision: La route existe déjà (app/dashboard/more/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 17. Studeo — Landing Page — ADAPTER

- Route Banani: `/`
- Existant: `app/page.tsx`
- Décision: La route existe déjà (app/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/._studeo-page-skeleton.tsx`, `components/studeo-page-skeleton.tsx`, `components/._studeo-icon.tsx`, `components/._studeo-preview-forms.tsx`, `components/._studeo-shell.tsx`
- Auth observée: public
- Données visibles: Contenu marketing statique, Offres et tarifs affichés, Témoignages et identités affichés, Image de hero
- Interactions visibles: Naviguer vers les sections Fonctionnalités, Témoignages, Tarifs et FAQ, Ouvrir la connexion, Démarrer une inscription gratuite, Voir une démonstration, Sélectionner une offre, Ouvrir Confidentialité, CGU ou Contact
- Intégrations visibles/confirmées: aucune / À CONFIRMER

## Règles avant code

1. Présenter cette matrice à l’utilisateur.
2. Réutiliser ou adapter avant de créer.
3. Toute règle métier non visible dans Banani reste **À CONFIRMER**.
4. Exécuter `npm run features:check` après toute modification structurelle.
5. Générer ensuite le plan avec `npm run design:plan`.
