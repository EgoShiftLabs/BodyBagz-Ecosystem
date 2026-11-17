import {esc,btn,header,metric,tag,empty,fmtDate,downloadJson} from "../core/kit.js";
import {RISKS} from "../core/catalog.js";
export function renderPairing(state){
 const count=state.pairingReviews.length;
 return header("PAIRING RESEARCH / NO EXECUTION","Explore the pair. Protect the builder.","Research whether a qualified original project could responsibly use $BAGZ as a quote asset. This is a review desk, not a launchpad.",'<a class="btn btn-ghost" href="#/forge">Open BAGZ Forge ↗</a>')+
 '<div class="notice notice-red"><strong>NO ON-CHAIN ACTIONS:</strong> This module cannot mint tokens, sign transactions, access wallets, seed liquidity, certify eligibility, or execute a pairing. Completing these checklists is not project approval, and pairing does not guarantee demand or returns.</div>'+
 '<div class="grid grid-3">'+metric("PAIRING REVIEWS",count,"Research records only")+metric("VERIFIED BAGZ MINT","NOT SET","Exact on-chain asset still needs verification")+metric("TRANSACTION SYSTEM","DISABLED","Separate permissions and approval required")+'</div>'+
 '<div class="section-heading"><div><h2>Proposed quote-asset model</h2><p>A conceptual structure only; all contracts, permissions, quote eligibility and economics require verification.</p></div></div>'+
 '<section class="panel"><div class="grid grid-3" style="align-items:center"><div class="local-card" style="text-align:center;padding:26px"><span class="eyebrow">QUOTE ASSET</span><h2 class="gold" style="margin:18px 0 8px;font-size:35px">$BAGZ</h2><p>Official mint: not established in this prototype</p></div><div style="text-align:center"><div class="gold" style="font-size:36px">⇄</div><p class="small muted">POTENTIAL TOKEN QUOTE<br>NOT AN EXISTING LIQUIDITY POOL</p></div><div class="local-card" style="text-align:center;padding:26px"><span class="eyebrow">BUILDER PROJECT</span><h2 style="margin:18px 0 8px;font-size:30px">$NEW</h2><p>Proposed new token; not deployed or verified</p></div></div><div class="divider"></div><p>Review teams may investigate token-pair creation mechanisms where the provider supports the exact quote asset and launch mode. Those rules can change. An existing token paired in a separate liquidity pool is a distinct operation from launching a new token quoted in $BAGZ.</p></section>'+
 '<div class="section-heading"><div><h2>Research reviews</h2><p>Each review links back to an original project draft in BAGZ Forge.</p></div><span class="caption">HUMAN REVIEW / NO MINTING</span></div>'+
 (count?'<div class="stack">'+state.pairingReviews.slice().reverse().map(r=>{
 const project=state.proposals.find(p=>p.id===r.proposalId);
 const n=RISKS.filter((x,i)=>r.checks["check"+i]===true).length;
 return '<section class="panel"><div class="panel-title"><div><span class="eyebrow">RESEARCH CASE / '+esc(r.id.slice(-8).toUpperCase())+'</span><h2 style="margin:12px 0 2px">'+esc(project?.name||"Linked project missing")+'</h2><p>Created '+esc(fmtDate(r.at))+' · Status: <strong>RESEARCH ONLY</strong></p></div>'+tag(n+"/"+RISKS.length+" RESEARCH CHECKS","gold")+'</div>'+
 '<div class="notice"><b>These checks are self-attestations, not technical validation.</b> A checked box does not establish mint eligibility, regulatory compliance, liquidity depth or team authority.</div>'+
 '<form id="pairingReviewForm" data-review-id="'+esc(r.id)+'"><div class="stack">'+RISKS.map((label,i)=>'<label class="check-item"><input type="checkbox" name="check'+i+'"'+(r.checks["check"+i]?" checked":"")+'><span>'+esc(label)+'<small>Review evidence outside this prototype; unresolved questions remain unresolved.</small></span></label>').join("")+'</div><div class="form-actions"><button type="submit" class="btn btn-primary">Save research checklist</button>'+btn("Export review JSON","export-pairing",r.id)+btn("Remove local case","remove-pairing",r.id,"btn-danger")+'</div></form></section>';
 }).join("")+'</div>':empty("No pairing review cases yet. Complete UGLY DUCK TEK practice tracks, mark a Forge proposal ready for local review, then open a research case here."))+
 '<div class="section-heading"><div><h2>Future integration gates</h2><p>These are requirements to build, not capabilities of V0.1.</p></div></div>'+
 '<div class="grid grid-2">'+[
 ["01 / VERIFY", "Confirm exact mint & market rules","Validate BAGZ mint address, Pump.fun/PumpSwap quote-asset eligibility, launch path, actual liquidity mechanics, fees, and provider terms before enabling any action."],
 ["02 / AUTHORIZE","Independent builder and signer review","Require an authenticated certificate, project authorization, a separate wallet signing flow, clear revocation, and explicit per-transaction human consent."],
 ["03 / DISCLOSE","Token and project risk reporting","Provide supply, distribution, fee beneficiaries, conflicts, price risk, liquidity risk, and truthful promotion standards."],
 ["04 / AUDIT","Record outcomes, not hype","Track independently verifiable launches, technical changes, creator deliverables and incident reports without promising returns."]
 ].map(x=>'<article class="panel"><div class="eyebrow">'+esc(x[0])+'</div><h3 style="margin-top:17px">'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p></article>').join("")+'</div>';
}
export function handlePairingSubmit(form,ctx){
 if(form.id!=="pairingReviewForm")return false;
 const r=ctx.state.pairingReviews.find(x=>x.id===form.dataset.reviewId);if(!r)return true;
 const data=new FormData(form);r.checks={};
 RISKS.forEach((x,i)=>{r.checks["check"+i]=data.has("check"+i);});
 ctx.commit("Research checklist saved locally. This is not an eligibility approval or an on-chain transaction.");return true;
}
export function handlePairingAction(action,id,ctx){
 if(!["export-pairing","remove-pairing"].includes(action))return false;
 const r=ctx.state.pairingReviews.find(x=>x.id===id);if(!r)return true;
 if(action==="remove-pairing"){ctx.state.pairingReviews=ctx.state.pairingReviews.filter(x=>x.id!==id);ctx.commit("Local research case removed.");return true;}
 const project=ctx.state.proposals.find(p=>p.id===r.proposalId);
 downloadJson("bagz-pairing-research-"+r.id+".json",{...r,projectName:project?.name||"Linked draft missing",status:"research-only",notice:"Self-reported checklist. No mint verification, program approval, liquidity provisioning or wallet action."});
 ctx.toast("Research checklist exported. Not proof of pairing eligibility.");return true;
}
