import {esc,btn,header,metric,navButton,tag,field,empty,fmtDate,downloadJson,evidenceLink} from "../core/kit.js";
import {projectProposal,pairingReview} from "../core/contracts.js";
import {progress} from "./ugly-duck-tek.js";
export function renderForge(state){
 const pass=progress(state).complete&&Boolean(state.practicePass);
 const ready=state.proposals.filter(p=>p.status==="review-preview").length;
 return header("BAGZ FORGE / CULTURAL INCUBATOR","Don't chase it. Create it.","Shape original ideas into reviewable projects. Connect market research, builder readiness, and responsible launch planning.",'<a class="btn btn-ghost" href="#/intel">Explore research signals ↗</a>')+
 '<div class="notice"><strong>Prototype status:</strong> Applications and reviews are stored locally on your device. No submission reaches BodyBagz, no project is endorsed, and no token launch authority is granted. Official builder eligibility will eventually require a verifiable UGLY DUCK TEK certificate.</div>'+
 '<div class="grid grid-3">'+metric("PROJECT DRAFTS",state.proposals.length,"Unpublished local concepts")+metric("REVIEW PREVIEWS",ready,"Practice-gated, not program approval")+metric("LEARNING GATE",pass?"PRACTICE PASS":"NOT YET","Authenticated credential system not active")+'</div>'+
 '<div class="section-heading"><div><h2>From signal to original creation</h2><p>Any builder can sketch an idea; verified readiness is intended for future program applications.</p></div><span class="caption">CREATE · REVIEW · DEVELOP</span></div>'+
 '<div class="pathway">'+[
 ["01","FIND AN IDEA","Start with sourced research, a community need, or original culture."],
 ["02","SHAPE A PROJECT","Describe the user, product, owner, value and risk."],
 ["03","BUILD READINESS","Complete UGLY DUCK TEK practical tracks; verified gate comes later."],
 ["04","REVIEW OPTIONS","Evaluate independent products, sponsorship and optional $BAGZ pairing."]
 ].map(x=>'<div class="path-step"><span class="number">'+x[0]+'</span><strong>'+esc(x[1])+'</strong><p>'+esc(x[2])+'</p></div>').join("")+'</div>'+
 '<div class="section-heading"><div><h2>Builder application studio</h2><p>Draft locally now. A review preview requires completion of all six UGLY DUCK TEK tracks.</p></div></div>'+
 '<div class="grid split"><section class="panel"><div class="panel-title"><h3>Create a project draft</h3>'+tag("BROWSER LOCAL","gold")+'</div>'+
 '<form id="proposalForm" class="form-grid" autocomplete="off">'+
 field("name","Project name",{required:true,full:true,max:130,placeholder:"Your original project or cultural concept"})+
 field("category","Project type",{choices:[["Music & audio","Music & audio"],["Original art & IP","Original art & IP"],["Utility / software","Utility / software"],["Community program","Community program"],["Education & learning","Education & learning"],["Other","Other"]]})+
 field("signalId","Related Watchtower signal",{choices:[["","Independent concept"],...state.signals.map(s=>[s.id,s.title])],full:true})+
 field("pitch","What are you building?",{required:true,multiline:true,full:true,max:1500,placeholder:"At least 25 characters. Identify audience, experience and first release."})+
 field("value","What useful value will participants receive?",{required:true,multiline:true,full:true,max:1600,placeholder:"At least 25 characters. Describe deliverables rather than price promises."})+
 field("risk","What could go wrong and how would you address it?",{required:true,multiline:true,full:true,max:1100,placeholder:"At least 15 characters. Include IP, custody, execution or community risk."})+
 '<div class="field span-all"><button type="submit" class="btn btn-primary">Save project draft ↗</button></div></form></section>'+
 '<section class="panel"><div class="panel-title"><h3>Readiness gate</h3>'+tag(pass?"PRACTICE COMPLETE":"EDUCATION REQUIRED",pass?"green":"gold")+'</div>'+
 '<p>Builder eligibility is based on demonstrated skills, not buying or holding a token. In this preview, practice completion unlocks a simulated review workflow; actual membership and certificate verification are future integrations.</p>'+
 '<div class="progress-track"><div class="progress-fill" style="width:'+progress(state).percent+'%"></div></div>'+
 '<p class="small"><strong>'+progress(state).passed+' / 6</strong> learning tracks passed.</p>'+
 '<div class="btn-row">'+navButton("Go to UGLY DUCK TEK","learn",!pass)+'</div>'+
 '<div class="divider"></div><h3>Submission standard</h3>'+
 '<div class="stack">'+[
 "Original concept and accountable contributors","Specific audience and independently testable deliverables","Source evidence and disconfirming risks","Clear custody, liquidity and promotion disclosures","Separate approvals for any eventual on-chain activity"
 ].map(x=>'<div class="row align-start"><span class="gold">◇</span><span class="small">'+esc(x)+'</span></div>').join("")+'</div></section></div>'+
 '<div class="section-heading"><div><h2>My project board</h2><p>Local drafts can be exported; they are not visible to other developers or BodyBagz admins.</p></div><span class="caption">PROJECTS / '+state.proposals.length+'</span></div>'+
 (state.proposals.length?'<div class="grid grid-2">'+state.proposals.slice().reverse().map(p=>
 '<article class="panel"><div class="panel-title"><div>'+tag(p.category||"Cultural concept")+' '+tag(p.status==="review-preview"?"REVIEW PREVIEW":"DRAFT",p.status==="review-preview"?"green":"gold")+'</div><span class="muted tiny-text">'+esc(fmtDate(p.at))+'</span></div>'+
 '<h3 style="font-size:20px">'+esc(p.name)+'</h3><p>'+esc(p.pitch)+'</p>'+
 '<div class="divider"></div><p><b>Practical value:</b> '+esc(p.value)+'</p><p><b>Risk plan:</b> '+esc(p.risk)+'</p>'+
 (p.signalId?'<p class="small">Related Watchtower observation: '+esc(state.signals.find(x=>x.id===p.signalId)?.title||"Original linked signal not found")+'</p>':'')+
 '<div class="btn-row">'+btn("Export JSON","export-proposal",p.id,"btn-sm")+
 (p.status==="draft"?btn(pass?"Mark ready for review preview":"Complete learning to review","mark-preview",p.id,"btn-sm btn-primary") :btn("Open pairing research","pair-proposal",p.id,"btn-sm btn-primary"))+
 btn("Delete local draft","delete-proposal",p.id,"btn-sm btn-danger")+'</div></article>').join("")+'</div>':
 empty("No projects yet. Save a draft above or forward a Watchtower research observation."))+
 '<div class="quote" style="margin-top:28px">“Culture brings the community. Standards protect the builders. Real work earns the recognition.”</div>';
}
export function handleForgeSubmit(form,ctx){
 if(form.id!=="proposalForm")return false;
 const entry=projectProposal(Object.fromEntries(new FormData(form).entries()));
 if(entry.error){ctx.toast(entry.error);return true;}
 if(ctx.state.proposals.length>=80){ctx.toast("Local project board limit reached.");return true;}
 if(entry.value.signalId&&!ctx.state.signals.some(s=>s.id===entry.value.signalId)){ctx.toast("The linked research signal is no longer available.");return true;}
 ctx.state.proposals.push(entry.value);ctx.commit("Project saved privately on this device. It was not submitted to BodyBagz.");return true;
}
export function handleForgeAction(action,id,ctx){
 const proposal=ctx.state.proposals.find(p=>p.id===id);
 if(!["export-proposal","mark-preview","pair-proposal","delete-proposal"].includes(action))return false;
 if(!proposal)return true;
 if(action==="export-proposal"){
  downloadJson("bagz-forge-"+proposal.id+".json",{...proposal,notice:"Local draft only; no official program submission, approval, intellectual-property endorsement, or token launch."});ctx.toast("Local project JSON exported.");return true;
 }
 if(action==="delete-proposal"){
  ctx.state.proposals=ctx.state.proposals.filter(p=>p.id!==id);
  ctx.state.pairingReviews=ctx.state.pairingReviews.filter(r=>r.proposalId!==id);
  ctx.commit("Project and any linked local pairing reviews deleted.");return true;
 }
 const pass=progress(ctx.state).complete&&Boolean(ctx.state.practicePass);
 if(!pass){ctx.toast("Complete all six UGLY DUCK TEK practice assessments before previewing program review.");return true;}
 if(action==="mark-preview"){
  proposal.status="review-preview";ctx.commit("Review-ready preview saved. No official BodyBagz application was sent.");return true;
 }
 if(action==="pair-proposal"){
  if(proposal.status!=="review-preview"){ctx.toast("Mark the project review-ready first.");return true;}
  let review=ctx.state.pairingReviews.find(r=>r.proposalId===id);
  if(!review){review=pairingReview(id);ctx.state.pairingReviews.push(review);}
  if(!ctx.commit("Pairing research record created. No wallet, liquidity pool or launch was affected."))return true;
  ctx.navigate("pairing");return true;
 }
 return false;
}
