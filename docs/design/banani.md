# Banani — handoff design vers Africa SaaS Kit

## État de l'intégration

Avant la V0.7.1, Banani était seulement mentionné dans le workflow. Il n'était pas réellement câblé dans le dépôt.

La V0.7.1 ajoute un **contrat de handoff** pour importer les écrans et le design system sans inventer une API Banani non documentée.

Banani permet actuellement :

- export vers Figma ;
- export HTML/CSS ;
- handoff vers des agents de code via MCP ;
- génération/maintenance d'un `DESIGN.md`.

## Méthode recommandée avec Antigravity / Codex

1. Créer les écrans dans Banani.
2. Dans Banani, utiliser **Export / MCP** pour connecter l'agent de code compatible.
3. Demander à l'agent d'implémenter les écrans dans ce projet Next.js en respectant `DESIGN.md`.
4. Si vous utilisez un export manuel, déposer les références dans :

```text
design/banani/screens/
```

5. Copier ou fusionner le design system Banani dans :

```text
DESIGN.md
```

6. Lancer :

```bash
npm run design:check
```

## Règles d'import

- ne jamais remplacer les routes auth/admin/API sans contrôle ;
- convertir les écrans en composants Next.js/React, pas en pages HTML isolées ;
- préserver l'accessibilité ;
- ne jamais recopier de secret ou donnée de test depuis une maquette ;
- les formulaires importés restent décoratifs tant que leur validation serveur n'est pas branchée.
