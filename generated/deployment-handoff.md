# Deployment Handoff — Africa SaaS Kit

> Ce rapport ne révèle jamais les valeurs secrètes. Il indique uniquement les noms, l’état CONFIGURÉ/MANQUANT, l’endroit où récupérer la valeur et où la renseigner.

## 1. GitHub — Gate dépôt
- [ ] Le dépôt GitHub est privé au minimum pendant la configuration initiale.
- [ ] `.env*` contenant de vraies valeurs n’est pas commité.
- [ ] Le vrai `package-lock.json` est commité après `npm install`.
- [ ] La branche principale est protégée et les checks CI passent.
- [ ] Aucun secret ne se trouve dans l’historique Git.

## 2. Vercel — Variables d’environnement
### Application / domaine
| Variable | État local | Secret ? | Vercel | Obligatoire quand | Où obtenir / quoi mettre |
|---|---|---:|---|---|---|
| `NEXT_PUBLIC_APP_URL` | ✅ CONFIGURÉE | Non | Production + Preview | always | URL publique de l'application. En production, utiliser le domaine HTTPS final. |
| `APP_NAME` | ✅ CONFIGURÉE | Non | Production + Preview | always | Nom interne de l'application. |
| `DEFAULT_COUNTRY` | ✅ CONFIGURÉE | Non | Production + Preview | always | Pays ISO2 principal du SaaS. |
| `SECURITY_LEVEL` | ✅ CONFIGURÉE | Non | Production + Preview | always | Niveau de sécurité : standard, high ou maximum. |

### Neon PostgreSQL
| Variable | État local | Secret ? | Vercel | Obligatoire quand | Où obtenir / quoi mettre |
|---|---|---:|---|---|---|
| `DATABASE_URL` | ✅ CONFIGURÉE | Oui | Production + Preview | always | Neon Console > Project > Connection Details. Utiliser une chaîne compatible avec l'application/serverless. |
| `DATABASE_URL_DIRECT` | ✅ CONFIGURÉE | Oui | Production + Preview | recommended | Neon Console > Connection Details > Direct connection. Recommandée pour Drizzle Kit et les migrations, tandis que DATABASE_URL reste utilisée par l’application. |

### Better Auth
| Variable | État local | Secret ? | Vercel | Obligatoire quand | Où obtenir / quoi mettre |
|---|---|---:|---|---|---|
| `BETTER_AUTH_SECRET` | ✅ CONFIGURÉE | Oui | Production + Preview | always | Générer un secret aléatoire fort, distinct par environnement. |
| `BETTER_AUTH_URL` | ✅ CONFIGURÉE | Non | Production + Preview | always | URL publique exacte de l'application pour Better Auth. |
| `AUTH_EMAIL_PASSWORD_ENABLED` | ✅ CONFIGURÉE | Non | Production + Preview | always | true = email/mot de passe activé ; false = utiliser un provider OAuth externe (ex. Google). |
| `AUTH_REQUIRE_EMAIL_VERIFICATION` | ✅ CONFIGURÉE | Non | Production + Preview | always | En production, true impose la vérification email pour les comptes email/mot de passe. |

### Resend
| Variable | État local | Secret ? | Vercel | Obligatoire quand | Où obtenir / quoi mettre |
|---|---|---:|---|---|---|
| `RESEND_API_KEY` | ✅ CONFIGURÉE | Oui | Production + Preview | email | Resend > API Keys. |
| `EMAIL_FROM` | ✅ CONFIGURÉE | Non | Production + Preview | email | Adresse d'envoi vérifiée chez Resend. |

### Google Cloud / Search Console
| Variable | État local | Secret ? | Vercel | Obligatoire quand | Où obtenir / quoi mettre |
|---|---|---:|---|---|---|
| `GOOGLE_CLIENT_ID` | ✅ CONFIGURÉE | Non | Production + Preview | google-oauth | Google Cloud Console > APIs & Services > Credentials > OAuth 2.0 Client ID. |
| `GOOGLE_CLIENT_SECRET` | ✅ CONFIGURÉE | Oui | Production + Preview | google-oauth | Google Cloud Console > OAuth client secret. |
| `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` | ✅ CONFIGURÉE | Non | Production + Preview | google-oauth | Activer le bouton Google après configuration complète. |

### Sécurité / rate limiting / cron
| Variable | État local | Secret ? | Vercel | Obligatoire quand | Où obtenir / quoi mettre |
|---|---|---:|---|---|---|
| `TURNSTILE_SECRET_KEY` | ❌ MANQUANTE | Oui | Production + Preview | optional | Cloudflare Turnstile secret key si le module est activé. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ❌ MANQUANTE | Non | Production + Preview | optional | Cloudflare Turnstile site key. |

### SEO / branding public
| Variable | État local | Secret ? | Vercel | Obligatoire quand | Où obtenir / quoi mettre |
|---|---|---:|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | ✅ CONFIGURÉE | Non | Production + Preview | seo | Nom public du SaaS. |
| `NEXT_PUBLIC_APP_DESCRIPTION` | ✅ CONFIGURÉE | Non | Production + Preview | seo | Description publique concise utilisée dans les metadata. |
| `NEXT_PUBLIC_APP_LANGUAGE` | ✅ CONFIGURÉE | Non | Production + Preview | seo | Langue principale ISO courte. |
| `NEXT_PUBLIC_APP_LOCALE` | ✅ CONFIGURÉE | Non | Production + Preview | seo | Locale principale. |

### Variables réservées / non câblées
Ne pas les considérer comme actives tant que leur intégration n’est pas réellement codée :
- `CLOUDFLARE_R2_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET`
- `SENTRY_DSN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `INNGEST_EVENT_KEY`

## 3. Paiements — clés et webhooks
Aucun provider sélectionné. C’est valide : ce SaaS est configuré sans paiements.
## 4. Cloudinary — uploads d’images
Cloudinary n’est pas activé. C’est valide pour un SaaS sans upload d’images.

## 5. URLs externes à enregistrer après choix du domaine
- Google OAuth callback : `<TON-DOMAINE-HTTPS>/api/auth/callback/google`
- Sitemap : `<TON-DOMAINE-HTTPS>/sitemap.xml`
- Robots : `<TON-DOMAINE-HTTPS>/robots.txt`

## 6. Ordre de mise en ligne — l’IA doit guider pas à pas
1. **Gate GitHub** — repo, lockfile, sécurité Git, CI.
2. **Gate Vercel Project** — importer le repo sans encore annoncer la production prête.
3. **Gate Domain** — connecter le domaine final et attendre HTTPS valide.
4. **Gate Environment** — renseigner les variables Vercel groupe par groupe.
5. **Gate Database** — appliquer les migrations Neon sur la base de production et vérifier.
6. **Gate OAuth/Email** — callback Google, domaine Resend, email de test.
7. **Gate Payments** — ignoré : aucun paiement activé pour ce SaaS.
8. **Gate Cron paiement** — ignoré : paiements désactivés.
9. **Gate SEO** — Search Console ignorée; valider sitemap, canonical et social preview.
10. **Gate Final** — `npm run verify:production` puis `npm run doctor:production:online`.

## 7. Règles de sécurité pendant le handoff
- L’IA ne demande jamais à l’utilisateur de coller une clé secrète dans le chat.
- L’IA indique où récupérer la clé et laisse l’utilisateur la saisir directement dans Vercel/son terminal.
- Les variables `NEXT_PUBLIC_*` sont publiques par définition : aucune clé secrète ne doit porter ce préfixe.
- Ne jamais copier l’URL ngrok dans la configuration production.
- Les clés sandbox/test et live doivent rester séparées.

## 8. Résumé automatique
- Variables suivies : **21**
- Variables de base critiques manquantes localement : **0**
- Providers listés : **0**
- Statut production réel : **NON VÉRIFIÉ** tant que les gates dynamiques ne sont pas passés.
