# Phase 18 — Cloudflare domaine/DNS (OPTIONNEL)

> Cette phase concerne le domaine et le DNS. Elle **n’active pas Cloudflare R2**.

## Objectif
Utiliser Cloudflare seulement si tu veux y acheter/gérer le domaine ou y gérer le DNS. Le SaaS fonctionne aussi sans Cloudflare.

## Étapes
1. Ouvre ton compte Cloudflare et ajoute/achète le domaine si tu souhaites l’utiliser.
2. Dans Vercel, ajoute le domaine custom au projet et note les enregistrements DNS exacts demandés par Vercel.
3. Dans Cloudflare DNS, crée exactement ces enregistrements. Ne copie jamais des valeurs génériques depuis un tutoriel.
4. Si la vérification Vercel/SSL échoue avec le proxy Cloudflare, repasse temporairement l’enregistrement en **DNS only** et revalide.
5. Vérifie que le domaine HTTPS ouvre bien le SaaS et que www/apex se comportent comme prévu.
6. Lance ensuite le Production Doctor online à la Phase 20.

## Sécurité
- Aucun token API Cloudflare n’est requis par le kit pour cette configuration guidée.
- Ne colle pas de token Cloudflare dans le chat.
- Cloudflare R2 est une fonctionnalité différente et reste désactivée tant qu’un vrai adaptateur storage n’existe pas.

## Validation
Après test réel du domaine/DNS :
`npm run setup-saas:mark -- --phase=18 --status=passed --note="Cloudflare domaine/DNS validé"`
