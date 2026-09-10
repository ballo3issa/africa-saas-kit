---
name: import-banani
description: Import observable Banani screens, analyze design gaps, and produce an implementation plan when the user invokes /import-banani.
---

# Import Banani

Run `npm run banani:check`. If configured, inspect every accessible screen with the available Banani tools and write only observed data to `design/banani/imported-design.json` using `design/banani/import-schema.json`.

Run `npm run import-banani:check` and `npm run import-banani:analyze`. Present RÉUTILISER, ADAPTER, CRÉER, and À CONFIRMER before implementation. Do not invent business rules, permissions, endpoints, or unobserved states, and do not code until the user validates the plan.
