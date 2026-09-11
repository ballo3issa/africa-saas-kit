# Banani → Africa SaaS Kit — Gap analysis

> Généré à partir du snapshot MCP Banani. Le design est une source de vérité visuelle, pas une autorisation pour inventer les règles métier.

## Résumé
- Écrans importés: 16
- RÉUTILISER: 0
- ADAPTER: 2
- CRÉER: 14
- À CONFIRMER: 0
- Pages existantes détectées: 19
- Routes API existantes détectées: 7

## Matrice écran → starter

| # | Écran | Route | Décision | Page existante |
|---:|---|---|---|---|
| 1 | Aujourd'hui — Mobile | `/dashboard` | **ADAPTER** | `app/dashboard/page.tsx` |
| 2 | Aujourd'hui — Desktop | `/dashboard` | **ADAPTER** | `app/dashboard/page.tsx` |
| 3 | Semaine — Mobile | `/dashboard/week` | **CRÉER** | — |
| 4 | Semaine — Desktop | `/dashboard/week` | **CRÉER** | — |
| 5 | Étudier — Mobile | `/dashboard/study` | **CRÉER** | — |
| 6 | Étudier — Desktop | `/dashboard/study` | **CRÉER** | — |
| 7 | Messages — Mobile | `/dashboard/messages` | **CRÉER** | — |
| 8 | Messages — Desktop | `/dashboard/messages` | **CRÉER** | — |
| 9 | Historique — Desktop | `/dashboard/history` | **CRÉER** | — |
| 10 | Notifications — Desktop | `/dashboard/notifications` | **CRÉER** | — |
| 11 | Créer — Desktop | `/dashboard/create` | **CRÉER** | — |
| 12 | Créer un événement — Mobile | `/dashboard/create/event` | **CRÉER** | — |
| 13 | Créer un événement — Desktop | `/dashboard/create/event` | **CRÉER** | — |
| 14 | Créer une tâche — Desktop | `/dashboard/create/task` | **CRÉER** | — |
| 15 | Plus — Menu principal Mobile | `/dashboard/more` | **CRÉER** | — |
| 16 | Plus — Menu principal Desktop | `/dashboard/more` | **CRÉER** | — |

## Features existantes potentiellement concernées
- Aucune correspondance automatique fiable. L’IA doit consulter config/features.json avant toute création.

## Détail

### 1. Aujourd'hui — Mobile — ADAPTER
- Route Banani: `/dashboard`
- Existant: `app/dashboard/page.tsx`
- Décision: La route existe déjà (app/dashboard/page.tsx) ; préserver la logique et adapter le rendu au design.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
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

### 3. Semaine — Mobile — CRÉER
- Route Banani: `/dashboard/week`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 4. Semaine — Desktop — CRÉER
- Route Banani: `/dashboard/week`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 5. Étudier — Mobile — CRÉER
- Route Banani: `/dashboard/study`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 6. Étudier — Desktop — CRÉER
- Route Banani: `/dashboard/study`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 7. Messages — Mobile — CRÉER
- Route Banani: `/dashboard/messages`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 8. Messages — Desktop — CRÉER
- Route Banani: `/dashboard/messages`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 9. Historique — Desktop — CRÉER
- Route Banani: `/dashboard/history`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 10. Notifications — Desktop — CRÉER
- Route Banani: `/dashboard/notifications`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 11. Créer — Desktop — CRÉER
- Route Banani: `/dashboard/create`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 12. Créer un événement — Mobile — CRÉER
- Route Banani: `/dashboard/create/event`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 13. Créer un événement — Desktop — CRÉER
- Route Banani: `/dashboard/create/event`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 14. Créer une tâche — Desktop — CRÉER
- Route Banani: `/dashboard/create/task`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 15. Plus — Menu principal Mobile — CRÉER
- Route Banani: `/dashboard/more`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/mobile-bottom-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

### 16. Plus — Menu principal Desktop — CRÉER
- Route Banani: `/dashboard/more`
- Existant: aucune page correspondante
- Décision: Aucune page existante avec cette route.
- Composants candidats à réutiliser: `components/dashboard-nav.tsx`, `components/setup-saas-dashboard.tsx`
- Auth observée: authenticated
- Données visibles: À CONFIRMER
- Interactions visibles: À CONFIRMER
- Intégrations visibles/confirmées: aucune / À CONFIRMER

## Règles avant code
1. Présenter cette matrice à l’utilisateur.
2. Réutiliser ou adapter avant de créer.
3. Toute règle métier non visible dans Banani reste **À CONFIRMER**.
4. Exécuter `npm run features:check` après toute modification structurelle.
5. Générer ensuite le plan avec `npm run design:plan`.
