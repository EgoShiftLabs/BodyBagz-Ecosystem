# Independent Repository Extraction Checklist

**Purpose:** Decouple products without breaking the parent BodyBagz ecosystem portal or inventing cross-origin trust.

## Repository ownership boundaries

| Repository | Owns | Must NOT inherit automatically |
|---|---|---|
| BodyBagz-Ecosystem | Marketing/cultural gateway, product discovery, public roadmap and integration directory | Private learning scores, users' watchlists, wallet privileges |
| UGLY-DUCK-TEK | Curriculum, assessments, learning UX, future verifiable credential issuer and revocation | Watchtower data pipelines, token mint authority, Forge private proposals |
| Watchtower-Crypto | Public-source crypto/cultural research, source traceability, research workspace and optional compliant data adapters | Credential issuer, project approval, automatic transaction keys |
| Future BAGZ-Forge | Builder proposal intake, moderation, original-IP review, user consent and program lifecycle | Guaranteed token liquidity, unrestricted certificate claims |
| Future BAGZ-Pairing | Eligibility due diligence and separate authorized transaction workflows | Automatic access on quiz completion, private wallet keys from the frontend |
| Watchtower OS (existing) | Standalone decision intelligence and forecast accountability | Required BodyBagz branding, social data or token-only access |

## Step 1: stabilize contracts before moving code
- Keep additive V1 JSON Schemas under \`contracts/\`; publish schema release tags and a changelog.
- Test both writer and reader against the **same actual JSON Schema**, not only equality of the \`schema\` string. Add AJV or equivalent on real backend boundaries.
- Preserve provenance, observation timestamps, risk fields and explicit local/unverified status.
- Do not promote a \`bodybagz.local-practice.v1\` export to a verified builder certificate. Its signatures and identity are intentionally absent.
- Version all future breaking changes with new envelope names and migration tooling.

## Step 2: extract UGLY DUCK TEK
- Move \`modules/ugly-duck-tek.js\` and its curriculum data into UGLY-DUCK-TEK.
- Create a dedicated storage origin and browser migration **with user consent**. Never attempt shared localStorage across different domains.
- Build accessible authored lessons, practical portfolio assessments and server-side identity verification.
- Independently issue and revoke credentials; publish a verifier endpoint and clear privacy policy.
- Parent hub links to the education portal rather than importing private learning progress.

## Step 3: extract Watchtower Crypto
- Move \`modules/watchtower-crypto.js\` and research contracts into Watchtower-Crypto.
- Separate local storage and import/export flows; preserve the user's original evidence and its timestamps.
- Introduce only licensed, dated, attributable API sources; distinguish public signals from paid/private feeds and personal opinions.
- Gate all API keys server-side; no credentials or transaction signing in static JS.
- Publish a permitted opportunity-suggestion API/contract requiring opt-in before submission to any future Forge.

## Step 4: integrate BAGZ Forge later
- Keep draft import from public research explicitly user-authorized and versioned.
- Build real accounts, private submissions, visible confirmation receipts, a moderation queue and appeal/revision paths.
- Verify learner-issued credentials server-side before authorizing program roles. The local preview gate has no authority.
- Define project originality/IP/licensing standards and clear creator/promotion disclosure rules.
- Separate community feedback from legal approval, launch authority and financial transactions.

## Step 5: optional pairing integration last
- Verify the exact BAGZ contract/mint and current provider-specific pairing/launch mechanisms.
- Independently verify smart contract authority, distribution, creator incentives and liquidity commitments.
- Require signed human approval per transaction with delegated wallet permissions that can be revoked.
- Audit fund movement, fee beneficiaries, rollback/emergency procedures, abuse prevention and any applicable legal requirements.
- Never assume pairing creates demand, increased token value or guaranteed profitability.

## Operational release checks
- [ ] Each repo owns its own Pages deployment, CI and version/tag.
- [ ] Parent links and directory are updated atomically with verified deployed endpoints.
- [ ] Contract tests exercise both producers and consumers against versioned schema.
- [ ] Expiration, revocation, consent, user-data deletion and incident processes are documented.
- [ ] A published compatibility matrix identifies supported protocol versions.
- [ ] All read-only interfaces work without unsafe permissions or signing.
- [ ] Every module remains usable when another module is unavailable.
- [ ] Independent usability/accessibility review on real devices is completed.

**Do not extract modules until their minimal contract tests and independent deployments have passed.** The current integration-preview repository intentionally remains a shared origin for demonstrations only.
