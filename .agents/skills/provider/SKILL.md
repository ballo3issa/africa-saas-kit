---
name: provider
description: List or inspect optional payment-provider adapters registered by Africa SaaS Kit when the user invokes /provider.
---

# Provider registry

For `/provider` or `/provider list`, run `npm run provider -- list` and report each adapter's maturity and skill status.

For a named provider, read `config/provider-skills.json` and load only the registered files. Do not claim a dedicated skill exists unless the registry points to it. Provider setup is optional and must not request secrets in chat.
