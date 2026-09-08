
# Règle prioritaire V0.8.10 — Cloudflare optionnel
- Cloudflare n’est jamais obligatoire pour construire ou déployer un SaaS avec le kit.
- Le proposer seulement en **Phase 16**, après le staging et après la décision paiements.
- La Phase 16 concerne domaine/DNS/proxy éventuel, pas Cloudflare R2.
- Si Cloudflare n’est pas utilisé, marquer la Phase 16 `skipped` et continuer vers la production.
- Ne jamais demander un token API Cloudflare pour une configuration DNS manuelle guidée.

# Règle prioritaire V0.8.9 — paiements optionnels

Les providers de paiement ne sont **jamais obligatoires** pour utiliser, construire ou déployer un SaaS avec ce kit.

- Ne demander aucun provider pendant le setup initial.
- Ne configurer les paiements qu’en **Phase 15**, juste avant la mise en ligne, si le produit en a besoin.
- Si le SaaS n’a pas besoin de paiement, marquer la Phase 15 `skipped` et continuer.
- Ne jamais considérer l’absence de provider comme une erreur de configuration.
- `npm run payments:setup` est la commande officielle de configuration tardive des paiements.

# /setup-saas — point d’entrée officiel du kit

Quand l’utilisateur écrit exactement `/setup-saas` dans Antigravity/Codex :
1. Lire `.agents/skills/setup-saas/SKILL.md` et `.agents/skills/setup-saas/SKILL.md`.
2. Exécuter `npm run setup-saas`.
3. Lire `generated/setup-saas-report.md` et `generated/setup-saas-report.json`.
4. Présenter la roadmap complète des **18 phases** avec 🟢 / 🟡 / 🔴 / ⚪ et une courte explication du rôle de chaque phase.
5. Détailler ensuite uniquement la première phase non verte : objectif, étapes exactes, emplacement des paramètres, commandes, résultat attendu et validation.
6. Après chaque correction, relancer `npm run setup-saas` avant de passer à la phase suivante.
7. Ne jamais demander de secret dans le chat : indiquer où le saisir localement puis demander seulement confirmation.
8. Distinguer toujours CONFIGURÉ, TESTÉ et NON VÉRIFIÉ.

# /setup-saas — point d’entrée officiel du kit

Quand l’utilisateur écrit exactement `/setup-saas` dans Antigravity/Codex :
1. Lire `.agents/skills/setup-saas/SKILL.md`.
2. Exécuter `npm run setup-saas`.
3. Lire `generated/setup-saas-report.md`.
4. Présenter les contrôles rouges puis verts et guider un seul gate à la fois.
5. Ne jamais demander une inscription au kit et ne jamais rediriger vers `/register` ou `/login` pour effectuer le setup.
6. Après chaque correction, relancer `npm run setup-saas` jusqu’à ce que les contrôles locaux requis soient verts.
7. Ne jamais afficher une valeur secrète dans le chat.

# Instructions IA — Africa SaaS Kit

## Explication pédagogique obligatoire des phases
Avant toute action dans une phase `/setup-saas`, expliquer en langage simple :
1. à quoi sert le service ou la phase ;
2. ce qu'il apporte concrètement au SaaS ;
3. s'il est obligatoire ou optionnel ;
4. le résultat attendu à la fin ;
5. puis seulement les étapes à exécuter.

À la fin de la Phase 18, lancer `npm run conformity:check`, lire `generated/conformity-report.md` et corriger tout FAIL avant de considérer le parcours terminé.


## Banani / Design
Quand des écrans Banani, Figma ou captures sont importés :
1. Ne code pas immédiatement tout le SaaS.
2. Mets à jour `design/banani/screens.json` avec les écrans réellement observés.
3. Lis `DESIGN.md` et `docs/design/implementation-planner.md`.
4. Lance `npm run design:plan`.
5. Lis `generated/implementation-plan.md`.
6. Présente le plan d'implémentation à l'utilisateur et avance phase par phase.
7. À la fin de chaque phase, exécute les tests/gates demandés avant de continuer.
8. N'invente jamais une règle métier, un endpoint de paiement ou une permission non démontrée.

## Mobile-First obligatoire
Africa SaaS Kit cible une vraie application mobile-first et responsive.
1. Construis chaque écran d'abord pour 320–430 px, puis tablette/desktop.
2. Valide au minimum 320, 360, 390, 430, 768, 1024 et 1440 px.
3. Aucun écran n'est terminé s'il provoque un scroll horizontal global, des boutons tronqués ou des cibles tactiles trop petites.
4. Préserve la safe area sur mobile et une navigation fluide utilisable au pouce.
5. Les formulaires sont une colonne par défaut et doivent rester utilisables avec le clavier mobile.
6. Les tableaux doivent rester lisibles : cartes/listes mobiles si pertinent, sinon scroll horizontal localisé.
7. Exécute `npm run mobile:check` à chaque phase UI importante.
8. Lis `docs/mobile/mobile-first-delivery.md` avant d'implémenter les écrans.
9. Ne déclare jamais le responsive validé sans avoir réellement vérifié les viewports demandés ; sinon marque `NON VÉRIFIÉ`.

## Paiements locaux / ngrok
Quand l'utilisateur veut tester les paiements en local :
1. Lis `docs/payments/local-payment-lab.md`.
2. Vérifie que les clés utilisées sont SANDBOX/TEST.
3. Guide l'utilisateur terminal par terminal : `npm run dev`, `npm run payments:ngrok`, puis `npm run payments:local`.
4. Utilise `npm run payments:local:apply` uniquement pour écrire `PAYMENT_WEBHOOK_BASE_URL` dans `.env.local`, puis demande de redémarrer Next.js.
5. Donne l'URL webhook exacte du provider générée par `generated/local-payment-lab.md`.
6. Ne considère jamais ngrok comme une vérification de paiement : signature/IPN + relecture API fournisseur + idempotence restent obligatoires.
7. Le test n'est terminé qu'après succès, échec/annulation, pending/retard et duplicate/replay.
8. Vérifie dans la base qu'un webhook rejoué n'accorde jamais deux fois l'abonnement ou les crédits.
9. À la fin, arrête le tunnel et rappelle de remplacer les URLs sandbox/ngrok par le vrai domaine HTTPS en staging/production.

## Sécurité
- L'UI ne remplace jamais les contrôles serveur.
- Une Server Action est un endpoint public : auth + permission + validation obligatoires.
- Les paiements ne sont crédités qu'après vérification fournisseur + idempotence.
- Les secrets ne vont jamais dans `NEXT_PUBLIC_*`.
- Avant production : `npm run security:audit` puis `npm run doctor:production`.

## Skeleton Loader Gate — obligatoire

Pour toute page ou zone qui attend des données :
- créer un `loading.tsx` App Router ou un `Suspense` avec fallback dédié ;
- utiliser les primitives de `components/ui/skeleton.tsx` ;
- faire correspondre le skeleton à la géométrie du contenu final pour limiter le layout shift ;
- concevoir d'abord à 320/360/390/430 px puis étendre tablette/desktop ;
- ne jamais ajouter de délai artificiel ;
- si des sous-zones ont des temps de chargement différents, préférer le streaming par `Suspense` afin que le contenu déjà prêt reste interactif ;
- respecter `prefers-reduced-motion` : aucun shimmer obligatoire lorsque l'utilisateur réduit les animations ;
- conserver des états distincts pour empty/error/unauthorized/offline.

Gate de livraison : une page data-driven sans skeleton approprié est INCOMPLÈTE.

## SEO Gate — obligatoire pour chaque page publique
Africa SaaS Kit doit être indexable proprement et partageable avec une image riche.
1. Lis `docs/seo/google-seo.md` avant d'ajouter une page marketing/public.
2. Chaque page publique doit avoir un title unique, une description, une canonical et une décision explicite index/noindex via `buildMetadata()` ou `generateMetadata()`.
3. Toute page indexable doit être ajoutée au sitemap ; aucune route privée ou technique ne doit y apparaître.
4. Les routes auth, dashboard, admin, setup et API restent `noindex` et hors sitemap.
5. Toute page importante doit avoir une image Open Graph pertinente ; le fallback global 1200×630 est acceptable uniquement tant qu'une image spécifique n'est pas nécessaire.
6. Vérifie l'aperçu de partage (Open Graph/Twitter) et ne déclare pas WhatsApp/Facebook/LinkedIn validés sans test réel sur une URL HTTPS publique.
7. Ajoute JSON-LD uniquement lorsque le type Schema.org correspond réellement au contenu visible ; ne fabrique jamais de notes, prix, avis ou données structurées trompeuses.
8. Préserve une hiérarchie sémantique H1/H2, des liens internes utiles et des `alt` descriptifs pour les images porteuses d'information.
9. N'essaie jamais de manipuler Google par bourrage de mots-clés, pages doorway ou contenu caché.
10. Exécute `npm run seo:check` après chaque phase publique importante.
11. Après déploiement : soumets le sitemap et inspecte les URLs stratégiques dans Google Search Console. Tant que cela n'est pas fait, marque l'indexation `NON VÉRIFIÉE`.

Gate de livraison : une page publique sans metadata/canonical/social preview appropriés est INCOMPLÈTE.

## Deployment Handoff Gate — GitHub → Vercel obligatoire
Quand l'utilisateur demande de mettre le SaaS en ligne, de connecter GitHub/Vercel, ou de préparer la production :
1. Lis `docs/deployment/vercel-github-handoff.md`.
2. Lance `npm run deploy:handoff` et lis `generated/deployment-handoff.md`.
3. Ne donne pas une liste générique inventée : utilise la configuration et les providers réellement présents dans le projet; s’il n’y en a aucun, ne rien inventer et indiquer que les paiements sont désactivés.
4. Guide l'utilisateur **gate par gate** : GitHub → Vercel → domaine → variables → Neon → Google/Resend → paiements/webhooks → cron → SEO → validation finale.
5. Présente les variables **par groupe**, avec nom exact, rôle, où récupérer la valeur, destination Vercel et état CONFIGURÉ/MANQUANT.
6. Ne demande jamais à l'utilisateur de coller une clé secrète dans le chat. Demande-lui de la saisir directement dans Vercel ou son terminal, puis de confirmer seulement « configuré ».
7. Ne révèle jamais les valeurs présentes dans `.env.local`, même si tu peux lire le fichier.
8. Les variables `NEXT_PUBLIC_*` sont publiques ; refuse d'y mettre une clé secrète.
9. Distingue Production / Preview : les clés live ne doivent pas être copiées automatiquement en Preview. Utilise sandbox/test lorsque nécessaire.
10. Après choix du domaine final, donne les URLs exactes : Google OAuth callback, webhooks de chaque provider actif, cron, sitemap et robots.
11. Ne réutilise jamais l'URL ngrok en production ; `PAYMENT_WEBHOOK_BASE_URL` doit devenir le vrai domaine HTTPS.
12. Ne déclare jamais un service PASS parce qu'une variable existe : le test réel sur le domaine final reste requis.
13. Termine seulement après `npm run verify:production` et `npm run doctor:production:online`, plus les tests manuels demandés.

Gate de livraison : une mise en ligne sans `generated/deployment-handoff.md` actualisé est INCOMPLÈTE.


## Mémoire de progression locale
Après un **vrai test réussi** (connexion DB, paiement sandbox, build, staging, etc.), l’agent peut mémoriser la phase avec :

`npm run setup-saas:mark -- --phase=N --status=passed --note="preuve/test effectué"`

Puis relancer `npm run setup-saas`. Ne jamais marquer une phase passée sur simple supposition ou présence d’une variable.


## Cloudinary optionnel
- Ne proposer Cloudinary qu’en **Phase 17**, si le SaaS a besoin d’uploads d’images.
- Sans upload : phase 17 `skipped`.
- Avec upload : utiliser `npm run cloudinary:setup`, tester réellement un upload et des refus de sécurité, puis seulement marquer la phase `passed`.
- `CLOUDINARY_API_SECRET` reste serveur-only et ne doit jamais être exposé via `NEXT_PUBLIC_`.

## Gate qualité backend — Phase 12

Avant le staging, l'agent doit aussi valider :
- `GET /api/health` répond 200 ;
- `GET /api/readyz` répond 200 lorsque Neon et les dépendances configurées sont disponibles ;
- `npm run format:check` ;
- `npm run lint` ;
- `npm run test` ;
- `npm run typecheck` ;
- `npm run build` ;
- `npm run audit:prod`.

Les migrations sont Drizzle et doivent être versionnées dans `db/migrations/`. Utiliser `DATABASE_URL_DIRECT` pour les migrations si une connexion Neon directe est configurée, sans remplacer `DATABASE_URL` côté application.


## Commande provider — obligatoire

Quand l'utilisateur saisit `/provider`, utilise `.agents/skills/provider/SKILL.md` comme workflow officiel.

- `/provider` ou `/provider list` : énumérer tous les providers, la commande à utiliser, le statut du skill et la maturité de l'adaptateur.
- `/provider <nom>` : lire `config/provider-skills.json`, puis charger uniquement les fichiers indiqués pour ce provider.
- Ne jamais prétendre qu'un skill dédié existe lorsqu'il n'est pas présent dans le registre.
- Les providers et leurs skills restent optionnels ; ne jamais forcer leur configuration avant la phase de monétisation.

## Feature ownership / anti-doublons

Avant d'ajouter une fonctionnalité transversale (auth, paiement, upload, SEO, cron, observabilité, API client), lire `config/features.json` et exécuter `npm run features:list`. Ne jamais créer une deuxième route, un deuxième helper ou un deuxième provider couvrant le même rôle sans raison documentée. Après ajout ou suppression d'une feature, mettre à jour `config/features.json` puis exécuter `npm run features:check`.

## Runtime API

Toutes les routes `app/api/**/route.ts` doivent déclarer `export const runtime = "nodejs"`. Le gate `npm run runtime:check` doit rester vert. Ne pas passer une route du starter en Edge sans audit de compatibilité Neon/Better Auth/crypto/providers.

## Client HTTP

Pour les nouveaux appels JSON côté client, préférer `lib/api/client.ts`. Les retries automatiques sont réservés à GET/HEAD. Ne jamais retry automatiquement POST/PUT/PATCH/DELETE après une erreur réseau ambiguë.

## Suppression sûre des features

Avant de supprimer une feature optionnelle, lire `config/features.json`. Vérifier `dependsOn`, `disableBehavior` et `removalComplexity`. Ne jamais supprimer un fichier simplement parce que l’écran qui l’utilisait a disparu. Préférer une désactivation par configuration pour les briques réutilisables. Après toute suppression ou refactorisation structurelle, exécuter `npm run features:check && npm run verify:code`.
