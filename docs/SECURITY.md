# Security / Privacy / Financial Integrity — Preview V0.1

**This is a browser-local demonstration.**

- No user accounts, server-side storage, encryption, wallet connections, transaction broadcasting, private API keys, KOL scraping, or authenticated certificate issuance exist in V0.1.
- Learning passes can be manipulated by the browser owner. They have no off-device authority.
- Project proposals, watchlists, signal notes and pairing research are stored in localStorage on the user's device. They may disappear if storage is cleared and are readable by scripts under the same site origin.
- Copying an exported JSON file does not make the record officially accepted, secure or independently verifiable. The schemas describe interchange formats, not a trust protocol.
- Do NOT type recovery phrases, API keys, private financial data or third-party private identifiers into forms.
- Form inputs are length-limited and escaped when rendered. HTTPS/HTTP URL schemes are validated for manual source links; users should still verify domains before opening them.
- The Pairing Desk is intentionally read-only research. A checkmark does not prove legal eligibility, mint details, liquidity depth, asset authenticity, provider permissions or authority to launch.
- Any future pairing involving BAGZ is optional, and pairing does not guarantee demand, appreciation, profit, or liquidity.
- KOL/creator watchlist is made of links entered by the user. No automated follower counts, wallets, rankings or endorsements are claimed.

## Before a public multiuser launch
Implement identity and consent; proper server authorization; audit logs; abuse and impersonation controls; data retention/deletion; provider terms; official credential checks; signed approval workflows; partner/creator disclosure requirements; financial/legal review appropriate to token operations; and independent review of every new transaction-enabled feature.

Security issues should be raised privately with repository maintainers rather than posting exploit details or secrets into public issues.
