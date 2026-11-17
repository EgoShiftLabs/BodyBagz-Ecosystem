import {esc,header,tag,navButton,evidenceLink} from "../core/kit.js";
import {MODULES} from "../core/catalog.js";
import {CONTRACTS} from "../core/contracts.js";
const INTEGRATIONS=[
 {name:"Builder readiness",owner:"UGLY DUCK TEK",produces:"Local practice milestone",consumer:"Forge preview gate",contract:"bodybagz.local-practice.v1",truth:"Not identity-verified; never an official NFT credential"},
 {name:"Evidence handoff",owner:"Watchtower Crypto",produces:"Public-link research signal",consumer:"BAGZ Forge",contract:CONTRACTS.opportunity,truth:"Manually entered; unverified until a reviewer checks source"},
 {name:"Project proposal",owner:"BAGZ Forge",produces:"Draft with value and risk plan",consumer:"Pairing research",contract:CONTRACTS.proposal,truth:"Stored only locally; no public program submission"},
 {name:"Launch due diligence",owner:"BAGZ Pairing Desk",produces:"Self-attested research checklist",consumer:"Future separate authorization service",contract:CONTRACTS.pairing,truth:"No verified eligibility, wallet signing or transaction"}
];
export function renderArchitecture(state){
 return header("ECOSYSTEM ARCHITECTURE / VERSIONED CONTRACTS","Separate by design. Connected by choice.","Independent modules share small, explicit data contracts instead of importing each other's business logic.",'<a class="btn btn-ghost" href="https://github.com/EgoShiftLabs/BodyBagz-Ecosystem" target="_blank" rel="noopener noreferrer">Explore source code ↗</a>')+
 '<div class="notice"><strong>Security boundary:</strong> This preview shares a single browser-local store because all modules run on one static page. Production apps will require separate deployments, origin boundaries, authorized APIs and user consent before transferring personal information.</div>'+
 '<div class="section-heading"><div><h2>Contract map</h2><p>Each interface has its own version and published specification.</p></div><span class="caption">V1 CONTRACTS</span></div>'+
 '<div class="stack">'+INTEGRATIONS.map((x,i)=>'<article class="panel"><div class="grid grid-3"><div><div class="eyebrow">'+esc(String(i+1).padStart(2,"0"))+' / '+esc(x.name)+'</div><h3 style="margin:12px 0 4px">'+esc(x.owner)+'</h3><p>Produces: '+esc(x.produces)+'</p></div><div><span class="muted small">CONSUMER</span><h3 style="margin:12px 0 4px">'+esc(x.consumer)+'</h3><p>'+esc(x.truth)+'</p></div><div><span class="muted small">VERSIONED CONTRACT</span><div class="contract" style="margin-top:12px">'+esc(x.contract)+'</div><p class="small" style="margin-top:8px">'+tag("SCHEMA V1")+'</p></div></div></article>').join("")+'</div>'+
 '<div class="section-heading"><div><h2>Standalone product boundaries</h2><p>How we'll split each module into independent repositories without losing interoperability.</p></div></div>'+
 '<div class="grid grid-2">'+MODULES.map(m=>'<article class="panel"><div class="row between"><strong>'+esc(m.name)+'</strong>'+tag("INDEPENDENT MODULE","gold")+'</div><p style="margin-top:12px">'+esc(m.summary)+'</p><div class="contract">/modules/'+esc(m.id==="learn"?"ugly-duck-tek":m.id==="intel"?"watchtower-crypto":m.id==="forge"?"bagz-forge":"pairing-desk")+'.js</div></article>').join("")+'</div>'+
 '<div class="section-heading"><div><h2>Published data contracts</h2><p>Source-readable JSON Schema files can be used by future independent apps and services.</p></div></div>'+
 '<div class="grid grid-2">'+[
 ["Opportunity signal","contracts/opportunity.v1.schema.json"],
 ["Builder proposal","contracts/proposal.v1.schema.json"],
 ["Local practice receipt","contracts/practice.v1.schema.json"],
 ["Pairing review","contracts/pairing-review.v1.schema.json"]
 ].map(x=>'<div class="panel"><h3>'+esc(x[0])+'</h3><p class="mono">'+esc(x[1])+'</p><p><a class="text-link" href="'+esc(x[1])+'" target="_blank" rel="noopener noreferrer">Open schema ↗</a></p></div>').join("")+'</div>'+
 '<div class="section-heading"><div><h2>Deployment roadmap</h2></div></div>'+
 '<div class="grid grid-3">'+[
 ["NOW","Public static prototype","Read-only education, real quiz interactions, manual source notes, local draft forms and versioned contracts."],
 ["NEXT","Secure review services","Authentication, verifiable credential issuance, opt-in data sync, permission boundaries and moderation."],
 ["LATER","Optional on-chain integrations","Verified token pair eligibility, audited authorization policies, user-approved transactions and measured outcomes."]
 ].map(x=>'<div class="panel"><div class="eyebrow">'+esc(x[0])+'</div><h3 style="margin-top:16px">'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p></div>').join("")+'</div>';
}
