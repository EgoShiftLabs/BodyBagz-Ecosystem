# BodyBagz modular ecosystem — Architecture v0.1

## Separation principles
1. BodyBagz is the parent cultural identity, not a monolithic database or a guarantee of token value.
2. UGLY DUCK TEK owns curriculum, assessment policy and the *future* verified readiness issuer.
3. Watchtower Crypto owns research, data provenance, uncertainty and independent analysis. It may send a scoped proposal suggestion, not a wallet credential or private portfolio.
4. BAGZ Forge owns project intake, moderation, independent review and builder collaboration.
5. BAGZ Pairing Desk is an **optional** eligibility research and authorization interface; quote-asset or minting decisions are not implied by completing quizzes.
6. Watchtower OS remains an independent product; the parent ecosystem may link to it without copying its browser-local user information.

## Integration contracts
| File | Envelope | Producer | Consumer | Status |
|---|---|---|---|---|
| \`contracts/practice.v1.schema.json\` | \`bodybagz.local-practice.v1\` | UGLY DUCK TEK | Forge practice preview | Local, unverifiable |
| \`contracts/opportunity.v1.schema.json\` | \`bodybagz.opportunity.v1\` | Watchtower Crypto | Forge draft generator | User-supplied, unverified |
| \`contracts/proposal.v1.schema.json\` | \`bodybagz.proposal.v1\` | BAGZ Forge | Pairing research | Local draft, not accepted |
| \`contracts/pairing-review.v1.schema.json\` | \`bodybagz.pairing-review.v1\` | Pairing Desk | Future authorized review process | Self-attested only |

Fields are deliberately minimal. Source links, dates, risks and disclaimers are preserved. No secret keys, wallet signing authority, personally identifying information or trading credentials should be stored in the contracts.

## Why all modules live in one repository for V0.1
This repository is a static **integration showcase**. It demonstrates real cross-module interfaces and an interactive product path, avoiding premature backend/identity/token work. Each module is isolated under \`modules/<product>.js\`. Shared \`core/\` utilities are small and versioned. The current preview shares one browser origin and localStorage key by design; that is NOT the final separation boundary for commercial standalone apps.

Once the modules graduate to separate repos: move shared schemas into a standalone contracts package; separate origins and credentials; use an authenticated HTTPS integration service; version each API; require explicit user consent before transferring any data; and enforce review permissions on the server, not via a client-side quiz flag.

## Current end-to-end research path
\`\`\`
BodyBagz cultural entry
   ↓
UGLY DUCK TEK (6 practical tracks / local practice)
   ↓
Watchtower Crypto (manual evidence-linked signal)
   ↓
BAGZ Forge (new local proposal draft + review preview)
   ↓
BAGZ Pairing Desk (checklist and export; NO transaction)
\`\`\`

UGLY DUCK TEK education is available even if the user never creates a token. Forge proposals may also describe art, music, games, software, education or community services with no token at all.

## Operational security gates still missing
- Verified learner identity, issuance controls, tamper-resistant credential record, revocation and certificate checks
- Moderated multiuser proposal intake with audit trail and explicit privacy policy
- Independently licensed or official live crypto/KOL/wallet data APIs and provenance checks
- Exact BAGZ mint, Pump.fun eligible pairing paths, pool details, creator fees and terms, and current code verification
- Smart contract security review, clearly documented incentives and any applicable compliance review
- Separate wallet signing permissions and explicit human approval for each transaction

The architecture deliberately disables every gate that is not implemented. Static frontend validation is user convenience and is not a trust boundary.
