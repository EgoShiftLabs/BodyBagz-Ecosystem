# BODYBAGZ ECOSYSTEM — V0.2 Integration Preview
**We don't just chase the next meta. We build the people who create it.**

A culture-first builder development preview that connects **UGLY DUCK TEK**, **Watchtower Crypto**, **BAGZ Forge**, and the **BAGZ Pairing Desk**. The parent project is **BodyBagz**; these modules are modular software and educational components, not one combined token protocol.

## Open the preview
- GitHub Pages (branch deployment succeeded November 17, 2026): https://egoshiftlabs.github.io/BodyBagz-Ecosystem/
- Repository: https://github.com/EgoShiftLabs/BodyBagz-Ecosystem
- BodyBagz culture/project: https://bodybagz.org
- Watchtower OS remains a separate public product: https://egoshiftlabs.github.io/EgoShiftLabs-Watchtower-OS/

## What works in V0.2
**UGLY DUCK TEK**: Six real learning modules, five questions each, 80% per-module passing rule, local progress, local practice milestone export. This is NOT an authenticated Builder Readiness Certificate and does not create an NFT.

**Watchtower Crypto**: A manual, evidence-linked opportunity register and KOL/creator research bookmarks. Risk statements required for signals. Explicit examples are research prompts, NOT real-time crypto trends. No exchange, wallet, X/Twitter, token-holder, Pump.fun or KOL API is connected.

**BAGZ Forge**: User-created project drafts, structured value/risk plans, optional local research-to-project handoff, and practice-gated review *preview*. Users must independently revise and confirm the project plan and explicitly acknowledge that this is a client-side demonstration. No externally submitted application, official program acceptance, or token issuance.

**BAGZ Pairing Desk**: Research-case transfer from Forge and an 8-item self-attested eligibility checklist; optional JSON exports. $BAGZ mint verification, pairing support for its exact mint, token launch privileges and signing are **unconfigured**. No wallet connection, pair creation, minting, swaps, liquidity management, private key capture or automatic launch.

**Shared contracts**: Four versioned JSON Schemas under /contracts. Each module imports shared validation and UI utilities, but keeps its own responsibilities and event handling.

## Architecture
- Fully static ES modules, responsive CSS, browser localStorage and GitHub Pages. No Node runtime on the hosted site; Node is used for CI tests only.
- Each product has its own file in `modules/` with standalone render/action/submit functions. The host `assets/app.js` handles navigation and module handoff via narrowly defined contracts.
- Domain contracts and the future standalone-app boundaries are documented in [ARCHITECTURE.md](docs/ARCHITECTURE.md).
- User content remains local to one browser; clearing storage, private browsing, or another device may make it unavailable. No encryption, account identity, secure certificate issuance, server-side review or guaranteed backup.
- All manually entered records are **unverified** even if linked to a public URL. A domain URL does not prove the content of a claim.

## V0.2 evidence and compatibility
- **Read without JavaScript:** The HTML shell contains a useful explanation of all four modules rather than a blank boot message.
- **Browser coverage:** Tests exercise quiz failure and retry, restoring an open lesson across reload, manual KOL research CRUD, HTTPS source validation, research-to-project handoff, explicit review confirmation, unique pairing forms, exports, project-deletion cascade, and mobile navigation. These tests do **not** substitute for a physical-device or screen-reader audit.
- **Source trust:** User-entered research URLs must use HTTPS. Merely linking a source does not verify the claim.
- **Local state schema:** `bodybagz-preview-state-v1` stays compatible; V0.2 adds optional `reviewPrepared` and `sourceUrl` proposal fields. Older V0.1 review-preview drafts without the new confirmation flag return to editable draft status on reload, without deleting the project content.
- **No production privileges:** Practice passes remain editable browser state, not trusted credentials; no endpoint can approve real projects or initiate transactions.

Read [CHANGELOG.md](docs/CHANGELOG.md) and [EXTRACTION_CHECKLIST.md](docs/EXTRACTION_CHECKLIST.md) before splitting applications into separate repositories.

## Developer run
```sh
python3 -m http.server 8000
# open http://localhost:8000/
npm run quality
```

Do not open index.html via file:// if your browser blocks ES module imports. The hosted version works from the repository's GitHub Pages base path because imports use relative URLs.

## Deploying GitHub Pages
GitHub Pages is now enabled and deployed successfully from the main branch using GitHub's own Pages build-and-deployment pipeline (confirmed successful run November 17, 2026). Changes to main automatically rebuild the site. A separate custom Actions publisher was intentionally removed because it conflicted with the enabled branch-source deployment and lacked permission to create the Pages site. The quality workflow in .github/workflows/quality.yml still runs Node and Chromium checks on every push. For final live-UI validation, perform a browser/device check as well; an Actions success alone is not full accessibility verification.

## Security and governance
No cryptocurrency transfers, authenticated certificates, or public project submissions are supported here. Completing a browser-local practice quiz does NOT authorize any transaction. The future certificate and official builder gate will require an independent verifiable credential issuer, identity/authorization system and explicit consent. Any token launch pairing with $BAGZ must verify the EXACT mint, provider eligibility, liquidity/fee mechanics, token distribution, conflicts, IP and lawful disclosures with current official sources. Do not publish private keys, wallet seeds, personal info or credentials in research forms.

See [SECURITY.md](docs/SECURITY.md), [ROADMAP.md](docs/ROADMAP.md), and [ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Intended product boundaries
These components can be extracted into separate repositories without changing their role: UGLY DUCK TEK is the education standard; Watchtower Crypto is independent market/cultural research; BAGZ Forge is BodyBagz-specific incubation; the pairing desk is optional quote-asset research; Watchtower OS remains separately branded and independently marketable.

**Cultural imagination is not a guarantee of future income or token returns.** This project encourages original IP, useful products, better evidence, honest risk management and long-term builder capacity.
