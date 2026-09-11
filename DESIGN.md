# DESIGN.md — Africa SaaS Kit

Ce fichier est le point d'entrée du design system pour Banani, Figma et les agents de code.

## Tokens de base

- Interface responsive mobile-first.
- Contraste WCAG AA minimum.
- États explicites : loading, empty, error, success, disabled.
- Boutons critiques distincts des actions secondaires.
- Formulaires : labels visibles, erreurs proches du champ, focus clavier visible.

## Handoff Banani

Flow observé via Banani MCP : **Planif Études** (`YlQxXVp_7E8Q`), 17 écrans accessibles au 11 septembre 2026, dont la landing page desktop « Studeo — Landing Page ».

- Marque produit du SaaS : **Etudeo**. La mention « Studeo » de l'export doit être harmonisée pendant l'adaptation.
- Police corps et titres : **Inter**.
- Couleurs principales : fond `#f7f8fa`, texte `#0f1117`, primaire `#4f6ef7`, surface `#ffffff`, bordure `#e4e6ec`, texte atténué `#8b90a7`.
- Couleurs d'état : succès `#22c55e`, avertissement `#f97316`, danger `#ef4444`.
- Fonds de sections landing : `#ffffff`, `#f5f7ff`, `#eef1fd`, `#eaedfc` et pied de page `#0f172a`.
- Rayons : `6px`, `10px`, `16px`, `24px`.
- Composants observés : navigation marketing, aperçu du tableau de bord, cartes de fonctionnalité, étapes, témoignages, tarifs, CTA final et pied de page.
- Limite du design : la landing Banani fixe une largeur minimale de `1440px`. Aucune composition mobile/tablette n'est fournie ; l'implémentation devra donc décliner ces tokens en mobile-first sans reproduire ce débordement.
- Conformité UI : l'icône décorative `sparkles` du hero ne doit pas être importée ; choisir une icône fonctionnelle autorisée par le Premium Icon Gate.

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
