---
name: setup-saas
description: Inspect and guide the Africa SaaS Kit setup through its 20 phases when the user invokes /setup-saas.
---

# Setup SaaS

Run `npm run setup-saas`, then read both generated setup reports. Present all 20 phases and focus execution on the first incomplete phase.

Before acting, explain the phase's purpose, concrete benefit, whether it is required, and its expected result. Distinguish configured, tested, and unverified states.

Use Computer Use for browser evidence when available. Configure Banani through `npm run banani:prepare` and local `.codex/config.toml`; never request its token in chat. Treat Upstash, Paiements, Cloudflare domaine/DNS, and Cloudinary as optional late phases.

After each real correction, rerun `npm run setup-saas`. Finish with `npm run conformity:check` and resolve every failure.
