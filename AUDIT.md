# Audit courant — Africa SaaS Kit V0.8.25

Cette passe ajoute Computer Use comme **capacité de développement/vérification**, pas comme dépendance runtime. Dans Antigravity, le Browser Subagent doit être réellement activé et testé avant de marquer la Phase 2 conforme. Le kit enregistre seulement une preuve locale sous `.africa-saas/`, ignorée par Git.

Le workflow a été refactorisé en 19 phases. Chaque phase dispose maintenant d’une consigne Computer Use adaptée : tests responsive, auth/OAuth, uploads, paiements sandbox, health/readiness, Vercel Preview, domaine final et SEO. Les opérations sensibles (identifiants, MFA, achat de domaine, changement DNS critique, passage paiement live) restent sous contrôle utilisateur et ne doivent pas être automatisées sans validation.

Contrôles exécutés après intégration : version, feature ownership, env contract, runtime API, mobile-first, skeleton, hydration, SEO, deployment handoff, design/Banani, format, security preflight et test du cycle UNVERIFIED → VERIFIED de Computer Use. `npm install` n’a pas pu terminer dans cet environnement (timeout registre), donc lockfile/build/typecheck/Vitest restent NON VÉRIFIÉS dynamiquement ici.

# Audit courant — Africa SaaS Kit V0.8.22

Cette passe a comparé le starter à deux captures de référence montrant health/readiness, statut des providers, migrations versionnées et pipeline de qualité. Les améliorations retenues sont adaptées à notre stack : Drizzle/Better Auth restent en place, Prisma/JWT maison ne sont pas introduits.

Ajouts contrôlés : `/api/health`, `/api/readyz`, Vitest, ESLint, contrôle de format, audit npm production, `DATABASE_URL_DIRECT`, migrations Drizzle versionnées, inventaire API et filtrage des providers non configurés. Le script `security-check` a aussi été corrigé afin que les erreurs détectées dans toute sa seconde moitié soient réellement bloquantes.

Limite : sans `npm install`, le lockfile, le lint réel, Vitest réel, le typecheck complet et le build restent NON VÉRIFIÉS dans l'archive.

# Audit approfondi — Africa SaaS Kit V0.8.6

## V0.8.25 — Premium Icon Gate

Refactorisation visuelle : navigation mobile convertie vers des SVG homogènes et ajout d’un scanner permanent anti-Sparkle/Sparklet. Le gate est branché aux chaînes de vérification et doit rester vert avant livraison. Test négatif effectué : une occurrence temporaire `✨` sous `app/` a bien fait échouer le gate, puis le contrôle est repassé au vert après suppression. Les preflights sécurité/runtime/mobile/loading/hydratation/SEO/déploiement/version/features sont verts. Lint/Vitest/build restent NON VÉRIFIÉS dans cet environnement faute de dépendances npm installées.

## Verdict

**Prêt pour poursuivre le développement : OUI.**

**Prêt production sans tests dynamiques : NON.** L'installation réelle, le typecheck, le build, les migrations, les tests sandbox fournisseurs et le scan du bundle restent obligatoires sur une machine avec accès npm et une base Neon de test.

## Corrections bloquantes / importantes appliquées

1. `.env.production`, `.env.development` et `.env.test` sont maintenant ignorés par Git.
2. PayDunya renvoie bien `money` lors de `verifyPayment`, condition nécessaire au moteur commun de réconciliation.
3. Le CLI Better Auth est une dépendance explicite et versionnée.
4. Drizzle ne charge plus le schéma Better Auth en double.
5. Les erreurs fournisseur ne recopient plus le corps JSON distant dans les messages persistants.
6. Les webhooks persistés sont minimisés pour éviter de stocker inutilement email/téléphone/PII du fournisseur.
7. Les adapters bêta sont bloqués si une variable d'environnement tente de les passer en live.
8. Les tables billing ont des clés étrangères et des indexes de requête essentiels.
9. La navigation mobile privée n'est plus affichée sur les pages publiques.
10. Le setup génère désormais `CRON_SECRET` et le nom public de l’app.
11. Le handoff déploiement n’invente plus tous les providers quand la configuration réelle n’existe pas.

## Risques restant PARTIELS / NON VÉRIFIÉS

- CSP : `script-src` utilise encore `unsafe-inline` pour compatibilité. Passer à une CSP par nonce avant un profil `maximum`.
- Tokens OAuth Better Auth : ils sont gérés par Better Auth et restent sensibles en base. Évaluer chiffrement applicatif/KMS si le modèle de menace l'exige.
- Webhook body limit : `Content-Length` est contrôlé, mais une limite de plateforme/proxy doit aussi être configurée car l'en-tête peut être absent.
- Aucun `package-lock.json` dans le template tant que `npm install` n'a pas été exécuté réellement.
- `npm audit`, `typecheck`, `next build` et tests E2E ne sont pas vérifiés dans cet environnement sans installation des dépendances.
- FedaPay/PayDunya/Chariow/Moneroo doivent être testés en sandbox marchand réel; les adapters bêta restent sandbox-only.

## Gates avant production

1. `npm install` puis commit du `package-lock.json`.
2. `npm run auth:generate` puis revue du diff auth.
3. `npm run db:generate && npm run db:migrate` sur Neon staging.
4. `npm run typecheck && npm run build`.
5. `npm audit --omit=dev`.
6. `npm run security:check && npm run security:audit`.
7. Tests deux comptes / IDOR, reset password, 2FA, Google OAuth.
8. Local Payment Lab ngrok + sandbox pour chaque provider activé, y compris replay/idempotence.
9. `npm run doctor:production` puis `doctor:production:online` sur staging HTTPS.
10. Revue manuelle des résultats avant promotion production.

## Dernière passe de consolidation

- Le Smart Router filtre maintenant la maturité/runtime même lorsqu'aucun pays n'est résolu.
- Le fallback automatique est stoppé sur les erreurs fournisseur ambiguës (réseau, 5xx, réponse incomplète) afin d'éviter de créer deux checkouts chez deux prestataires.
- Les comparaisons de montants utilisent des unités mineures normalisées par devise au lieu d'une égalité flottante brute.
- XOF/XAF sont validés en montants entiers dans le formulaire de plans du starter.
- Les anciens documents de paiement versionnés ont été retirés afin de ne pas concurrencer les sources de vérité actuelles.

## Revue V0.8.16 — comparaison sélective avec izikit

La comparaison du dépôt de référence a identifié des pratiques utiles déjà présentes (health/readiness, CI, migrations directes, providers optionnels) et des pratiques manquantes. Les ajouts retenus sont : runtime Node.js enforced, manifeste de propriété des features, logger/redaction, request IDs, wrapper HTTP idempotent-only retry, cron auth centralisé, smoke tests et vérification binaire des uploads Cloudinary.

Les éléments non ajoutés volontairement sont Prisma, JWT/CSRF maison, circuit breaker in-memory, outbox/email queue et Sentry/OTel forcés. Ils seraient soit incompatibles avec la stack Better Auth/Drizzle, soit redondants avec le Smart Router, soit prématurés sans side-effects durables ou installation de dépendances réellement testée.


### Dépendances de test

Vitest est fixé à **4.1.11** pour rester compatible avec Better Auth 1.7.3. Une montée vers Vitest 5 doit être précédée d’une vérification des peer-dependencies et d’un `npm install` propre.

## V0.8.19 — Durcissement Banani MCP

La connexion Banani est déplacée vers `.codex/config.toml`, livré vide et ignoré par Git. Aucun token n'est généré, injecté ou affiché par le kit. Les contrôles `banani:prepare` / `banani:check` garantissent la présence du fichier, sa protection Git et la forme minimale de la configuration sans journaliser le bearer token.


## V0.8.20 — Tests de régression
La préparation Banani a été testée avec fichier vide, préservation d'une configuration existante, non-divulgation du bearer token et protection Git. Le contrôle de conformité distingue désormais l'archive starter du workspace local configuré.


## V0.8.21 — Import Banani et comparaison anti-doublons
- `/import-banani` utilise le MCP Banani déjà configuré et ne stocke aucun secret dans les snapshots.
- Le snapshot réel est validé avant analyse.
- Le gap analysis compare routes/pages/composants/features avant toute création.
- Les décisions sont classées RÉUTILISER / ADAPTER / CRÉER / À CONFIRMER.
- Le plan d’implémentation est généré après la comparaison, jamais directement depuis un écran isolé.


## V0.8.22 — Batterie de tests et corrections

- Parcours Banani: prepare/check/import/analyze testé.
- Parcours SaaS sans paiement et avec paiements optionnels testé.
- Contrat de version centralisé via `scripts/lib/version.mjs` + `npm run version:check`.
- Correction: les scripts ne réécrivent plus la configuration avec une ancienne version.
- Correction: la Phase 19 exige désormais un verdict Production Doctor `READY`, pas seulement la présence d’un rapport.
- `npm install` reste non vérifié dans cet environnement à cause d’un timeout réseau vers le registre npm.


## V0.8.24 — Upstash optionnel
- Upstash isolé dans une phase optionnelle dédiée.
- Cache helper avec TTL et fallback Neon.
- Check online PING sans exposition du token.
- Production Doctor ne rend pas Upstash obligatoire.

## V0.8.28 — revue générale

La revue V0.8.28 a corrigé la frontière d'authentification serveur du dashboard, l'exposition potentielle du champ `raw` des providers de paiement, les gardes de requêtes mutantes, l'usage de `Math.random()` pour les identifiants, le comportement HSTS/upgrade HTTPS en développement et la dérive des workflows CI. Le nouveau `refactor:check` et `security:versions` sont permanents. Voir `generated/general-refactor-report-v0.8.28.md`.

Le seul échec structurel restant est l'absence de `package-lock.json`; il reste volontairement bloquant pour la certification production.
