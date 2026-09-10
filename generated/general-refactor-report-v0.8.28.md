# Africa SaaS Kit V0.8.28 — General refactor report

## Résultat

Refactorisation générale effectuée à partir de V0.8.27. Les contrôles statiques internes passent après corrections. Le contrôle final de conformité reste volontairement bloqué par l'absence de `package-lock.json`, ce qui empêche de certifier `npm ci`, `npm audit`, ESLint, TypeScript, Vitest et le build Next.js dans ce workspace.

## Failles / conflits corrigés

1. **Protection dashboard trop dépendante du proxy** : ajout de `requireUser()` au layout serveur `/dashboard`, afin que toute future page privée hérite d'une validation de session autoritative.
2. **Fuite potentielle de données fournisseur de paiement** : le checkout renvoyait `{ ...result }`, ce qui pouvait inclure `raw` et donc des métadonnées/PII de passerelle. Ajout de `publicCheckoutResult()`.
3. **Durcissement des endpoints mutateurs authentifiés** : contrôle cross-site/origin, Content-Type et Content-Length sur checkout/upload avant parsing.
4. **Identifiants pseudo-aléatoires** : remplacement de `Math.random()` par `crypto.randomUUID()` dans le générateur SQL de routes de paiement.
5. **Conflit dev/prod des headers** : HSTS et `upgrade-insecure-requests` deviennent production-only pour ne pas casser le développement HTTP local.
6. **Dérive CI** : GitHub Actions utilise désormais les commandes canoniques `ci:check` et `security:release`.
7. **Server Actions** : le Zod gate contrôle aussi `requireAdmin()` / `requireUser()` selon la zone.
8. **Régression de dépendances connues** : ajout de `security:versions` pour empêcher un downgrade sous les planchers de sécurité revus.

## Tests négatifs du nouveau garde-fou

- suppression/commentaire de `await requireUser()` dans le layout dashboard → **FAIL attendu** ;
- retour direct `{ ...result }` du provider de paiement → **FAIL attendu** ;
- réintroduction de `Math.random()` dans le générateur de routes de paiement → **FAIL attendu** ;
- restauration du code sain → **PASS**.

## Contrôles statiques passés

- General Refactor Gate
- Dependency Security Floor
- Security Baseline
- Zod Validation Gate
- Security Preflight
- Version Contract
- Env Contract
- Runtime API Gate
- Mobile First Gate
- Premium Icon Gate
- Skeleton/Loading Gate
- Hydration Gate
- SEO Gate
- Deployment Gate
- Feature Inventory
- Format Hygiene
- résolution de tous les imports locaux/alias `@/`
- scan des frontières `use client` : aucun import serveur/secret détecté
- scan secret/code brut : aucun secret en clair détecté

## Point bloquant restant

`package-lock.json` n'est pas fourni dans le ZIP source. Deux tentatives de génération via npm dans le workspace d'audit ont expiré. Le kit conserve donc `conformity:check = FAIL` jusqu'à ce qu'un `npm install` puisse générer le lockfile, puis que `verify:production` soit exécuté avec les dépendances réelles.
