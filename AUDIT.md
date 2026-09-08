# Audit courant — Africa SaaS Kit V0.8.15

Cette passe a comparé le starter à deux captures de référence montrant health/readiness, statut des providers, migrations versionnées et pipeline de qualité. Les améliorations retenues sont adaptées à notre stack : Drizzle/Better Auth restent en place, Prisma/JWT maison ne sont pas introduits.

Ajouts contrôlés : `/api/health`, `/api/readyz`, Vitest, ESLint, contrôle de format, audit npm production, `DATABASE_URL_DIRECT`, migrations Drizzle versionnées, inventaire API et filtrage des providers non configurés. Le script `security-check` a aussi été corrigé afin que les erreurs détectées dans toute sa seconde moitié soient réellement bloquantes.

Limite : sans `npm install`, le lockfile, le lint réel, Vitest réel, le typecheck complet et le build restent NON VÉRIFIÉS dans l'archive.

# Audit approfondi — Africa SaaS Kit V0.8.6

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
