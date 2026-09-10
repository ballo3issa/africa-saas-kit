# DESIGN.md — Africa SaaS Kit

Ce fichier est le point d'entrée du design system pour Banani, Figma et les agents de code.

## Tokens de base

- Interface responsive mobile-first.
- Contraste WCAG AA minimum.
- États explicites : loading, empty, error, success, disabled.
- Boutons critiques distincts des actions secondaires.
- Formulaires : labels visibles, erreurs proches du champ, focus clavier visible.

## Handoff Banani

Lorsque des écrans Banani sont importés, remplacer/compléter cette section avec les tokens réels : couleurs, typographies, rayons, espacements et composants.

Ne jamais traiter un export Banani comme du code backend fiable : seules les décisions visuelles sont importées automatiquement ; auth, permissions, validation serveur, paiements et secrets restent régis par l'architecture du kit.

## Mobile-first V0.8.2

Le rendu mobile est la première cible, pas une réduction du desktop. Chaque écran est validé à 320/360/390/430 px avant l'enrichissement tablette/desktop. La navigation doit rester fluide au pouce, respecter les safe areas et ne jamais provoquer de scroll horizontal global. Voir `docs/mobile/mobile-first-delivery.md` et exécuter `npm run mobile:check`.

## Loading UX
- Le chargement des pages et données doit utiliser des skeleton loaders fidèles aux écrans Banani/importés.
- Le plan d'implémentation doit lister, pour chaque écran data-driven, le fichier `loading.tsx` ou la frontière `Suspense` prévue.
- Les skeletons sont mobile-first et doivent éviter le layout shift.

## Import Banani MCP et comparaison du starter
Après connexion Banani, utiliser `/import-banani`. Cette étape doit parcourir le design disponible via MCP, produire `design/banani/imported-design.json`, comparer les écrans avec les pages/composants/features existants et générer `generated/banani-gap-analysis.md` avant le plan d’implémentation.

Le design Banani est la source de vérité visuelle ; `config/features.json` reste la source de vérité anti-doublons pour l’architecture. Une règle métier, permission, prix, workflow de paiement ou contrainte DB absente du design reste `À CONFIRMER`.
