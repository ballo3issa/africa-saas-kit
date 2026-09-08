# Security Policy — Africa SaaS Kit V0.3

## Principle
Security is part of the architecture. Never trust the browser, a payment redirect, a user-controlled role, an uploaded filename, or an unverified webhook.

## Before production
1. Use separate accounts/projects for development, staging and production.
2. Put secrets only in Vercel/hosting environment variables. Never in `NEXT_PUBLIC_*`.
3. Enable GitHub 2FA, branch protection, Dependabot and secret scanning.
4. Keep Better Auth email verification enabled in production. With `SECURITY_LEVEL=high|maximum`, administrators must enroll 2FA before `/admin` is accessible.
5. Configure Upstash Redis for distributed rate limiting.
6. Configure Cloudflare Turnstile on signup, login recovery and sensitive forms.
7. FedaPay webhooks must be verified with `X-FEDAPAY-SIGNATURE` through the official SDK and the endpoint-specific secret. Other providers must not be enabled until their official verification is implemented.
8. Never accept a browser-supplied price. Load plan amount/currency from Neon, then verify the provider transaction amount/reference/currency metadata server-side before granting access.
9. Keep `webhook_events(provider, external_event_id)` unique for idempotency.
10. Store private uploads in R2 and serve them with short-lived signed URLs.
11. Enable Neon backups/restore strategy and test restoration.
12. Enable Sentry/monitoring and audit logs.
13. Review CSP whenever adding a third-party script/domain.
14. Run dependency and authorization tests before each release.

## Incident response
If a key may be exposed: revoke/rotate it first, invalidate sessions when relevant, review audit logs, inspect payment/webhook events, patch the cause, redeploy, and document the incident.

See `docs/security/` for step-by-step guides.


## V0.4 — sécurité multi-paiements
- Ne jamais activer une passerelle `scaffold` en production.
- Conserver toutes les clés API côté serveur ; aucune clé secrète dans `NEXT_PUBLIC_*`.
- Les routes de checkout valident le provider autorisé pour le pays.
- Le montant et la devise viennent du plan stocké en base, pas du navigateur.
- Toute confirmation de paiement doit venir d'un webhook signé puis d'une re-vérification API quand le fournisseur le permet.
- Garder l'idempotence des webhooks et tester les retries.
- Chariow : mapper le plan à un produit publié et vérifier la signature `x-chariow-signature`.
- Flutterwave : vérifier `flutterwave-signature` et re-vérifier transaction/référence/montant/devise avant délivrance.


## Smart Payment Router V0.5
- Le routage ne valide jamais un paiement.
- Les fallbacks sont journalisés dans `payment_attempts`.
- Un provider explicitement choisi n'est pas remplacé silencieusement.
- Les métriques de santé ne contiennent jamais de secrets.
- PayDunya : l'IPN doit passer la comparaison SHA-512 du Master Key puis une confirmation serveur du token avant activation.
- Djomy reste bloqué tant que la vérification webhook exacte du compte marchand n'est pas confirmée.

## V0.6 Setup Wizard security

The guided installer is designed not to normalize unsafe defaults:

- `.env.local` is generated with restrictive file permissions where supported and is gitignored.
- `BETTER_AUTH_SECRET` is generated with cryptographically secure random bytes.
- The installer refuses to activate payment providers marked `scaffold` or `merchant-validation`.
- Existing `.env.local` is not overwritten unless the operator explicitly passes `--force`.
- Provider secrets are never generated, guessed, or copied into source-controlled configuration.
- Payment route SQL is generated for human review instead of being silently executed against a database.

Run `npm run setup:check` and `npm run security:check` before build/deployment, then complete `docs/production-checklist.md`.

## V0.8.1 — audit renforcé

Avant toute mise en production, exécuter :

```bash
npm run security:check
npm run security:audit
npm run build
npm run security:audit
```

Le second audit après build recherche notamment les secrets qui auraient été intégrés dans `.next/static`.

### Google

`GOOGLE_CLIENT_SECRET` doit rester serveur uniquement. `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` n'est qu'un booléen d'interface et ne contient aucun secret. Ne jamais commiter un fichier JSON de compte de service Google Cloud.

### Paiements

La V0.8.1 impose le modèle « webhook authentifié + relecture provider + comparaison montant/devise/référence + idempotence ». Un cron de réconciliation rattrape les paiements asynchrones récents. Le webhook n'est jamais à lui seul une preuve suffisante pour créditer l'utilisateur.
