---
name: computer-use
description: Verify Africa SaaS Kit browser-visible behavior and record concrete browser evidence during setup or QA.
---

# Computer Use verification

Run `npm run computer-use:check` before browser-dependent verification. Exercise the actual page or flow at the required viewport, retaining user control for credentials, MFA, purchases, and critical production changes.

Record a passed phase with `npm run computer-use:mark` only after observing the expected behavior. Browser evidence complements, but never replaces, tests, type checking, builds, or security gates. If browser tooling is unavailable, mark the check unverified and provide a manual equivalent.
