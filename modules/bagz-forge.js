import {esc,btn,header,metric,navButton,tag,field,empty,fmtDate,downloadJson,evidenceLink} from "../core/kit.js";
import {projectProposal,reviseProposal,reviewReady,pairingReview} from "../core/contracts.js";
import {progress} from "./ugly-duck-tek.js";

const categories=[["Music & audio","Music & audio"],["Original art & IP","Original art & IP"],["Utility / software","Utility / software"],["Community program","Community program"],["Education & learning","Education & learning"],["Other","Other"]];
const practicePassed=state=>progress(state).complete&&Boolean(state.practicePass);

function editForm(p){
 const id=esc(p.id);
 return '<details class="local-card edit-panel" style="margin-top:16px"><summary class="gold">Review and edit this project before any review preview</summary>'+
 '<form class="edit-proposal-form form-grid" data-id="'+id+'" autocomplete="off" style="margin-top:16px">'+
 field("name","Original project name",{required:true,max:130,full:true,value:p.name,id:p.id+"-name"})+
 field("category","Project category",{choices:categories,value:p.category,id:p.id+"-category"})+
 field("pitch","Your independently written project pitch",{required:true,multiline:true,full:true,max:1500,value:p.pitch,id:p.id+"-pitch"})+
 field("value","Specific user value and first deliverable",{required:true,multiline:true,full:true,max:1600,value:p.value,id:p.id+"-value"})+
 field("risk","Risk, evidence gaps and your mitigation plan",{required:true,multiline:true,full:true,max:1100,value:p.risk,id:p.id+"-risk"})+
 '<div class="field span-all"><button class="btn btn-primary" type="submit">Save reviewed draft</button></div></form></details>';
}
function reviewGate(p,pass){
 if(p.status==="review-preview")return '<div class="notice notice-green" style="margin-top:15px"><b>Local review preview only.</b> This is not an accepted application, authentic certificate or approval to launch anything.</div>';
 if(!pass)return '<div class="notice" style="margin-top:14px">Practice check: complete all six local education assessments before exploring the review preview. This is not a verified qualification.</div>';
 if(!reviewReady(p))return '<div class="notice" style="margin-top:14px">Review the project plan above, replace any research placeholders with original deliverables and risks, and save your revision before advancing.</div>';
 return '<form class="review-preview-form" data-id="'+esc(p.id)+'" style="margin-top:14px"><label class="checkbox-row">'+
 '<input type="checkbox" name="acknowledge" value="yes" required>'+
 '<span>I understand that my UGLY DUCK TEK practice completion is editable local data, NOT an official certificate, and this is NOT a submitted, approved or sponsored BodyBagz project.</span></label>'+
 '<div class="form-actions"><button class="btn btn-primary btn-sm" type="submit">Mark ready for local review preview</button></div></form>';
}
export function renderForge(state){
 const pass=practicePassed(state),ready=state.proposals.filter(x=>x.status==="review-preview").length;
 const stats='<div class="grid grid-3">'+metric("PROJECT DRAFTS",state.proposals.length,"Private, unpublished ideas")+
 metric("REVIEW PREVIEWS",ready,"Not reviewed or approved by BodyBagz")+
 metric("PRACTICE GATE",pass?"LOCALLY PASSED":"NOT PASSED","Self-reported, no credential issuer")+'</div>';
 const path=[["01","RESEARCH","Identify and source a community need."],["02","DRAFT","Explain your unique project and its deliverables."],["03","PREPARE","Complete local learning and revise your plan."],["04","REVIEW OPTIONS","Research collaborations or optional pairing."]];
 const intro=header("BAGZ FORGE / BUILDER DEVELOPMENT","Don't chase it. Create it.","Turn cultural intelligence and community ideas into accountable project plans. All drafts remain on this device.",navButton("Explore Watchtower signals","intel"))+
 '<div class="notice"><b>Local preview, not an application:</b> No project is submitted to an administrator, accepted into a program, certified, endorsed or cleared for a token launch. Practice milestones can be modified by the browser owner.</div>'+
 stats+'<div class="section-heading"><div><h2>Turn ideas into original work</h2><p>Only real deliverables and transparent decisions earn credibility.</p></div><span class="caption">RESEARCH → BUILD</span></div>'+
 '<div class="pathway">'+path.map(x=>'<div class="path-step"><span class="number">'+x[0]+'</span><strong>'+x[1]+'</strong><p>'+x[2]+'</p></div>').join("")+'</div>';
 const draftForm='<section class="panel"><div class="panel-title"><h3>Create a project draft</h3>'+tag("PRIVATE / LOCAL","gold")+'</div>'+
 '<p>A source-linked research note can inspire a project, but it does not supply a finished proposal. Every builder must review and confirm the project plan independently.</p>'+
 '<form id="proposalForm" class="form-grid" autocomplete="off">'+
 field("name","Original project name",{required:true,max:130,full:true,placeholder:"Name your own concept"})+
 field("category","Project category",{choices:categories})+
 field("signalId","Optional linked research signal",{choices:[["","Independent idea"],...state.signals.map(s=>[s.id,s.title])],full:true})+
 field("pitch","What are you building and who is it for?",{multiline:true,required:true,max:1500,full:true,placeholder:"At least 25 characters"})+
 field("value","What real deliverables benefit participants?",{multiline:true,required:true,max:1600,full:true,placeholder:"At least 25 characters"})+
 field("risk","What might fail and how will you respond?",{multiline:true,required:true,max:1100,full:true,placeholder:"At least 15 characters"})+
 '<div class="field span-all"><button class="btn btn-primary" type="submit">Save unpublished draft</button></div></form></section>';
 const readiness='<section class="panel"><div class="panel-title"><h3>Builder readiness</h3>'+tag(pass?"LOCAL PRACTICE PASS":"LEARNING NEEDED",pass?"green":"gold")+'</div>'+
 '<p>Education is a baseline, not a license. Official builder participation eventually requires verified identity, an independent credential issuer and moderator review.</p>'+
 '<div class="progress-track"><div class="progress-fill" style="width:'+progress(state).percent+'%"></div></div>'+
 '<p class="small"><strong>'+progress(state).passed+' / 6</strong> tracks completed in this browser.</p>'+
 navButton("Open UGLY DUCK TEK","learn",!pass)+
 '<div class="divider"></div><h3>Review standards</h3>'+
 '<div class="stack">'+["Original intellectual property and named deliverables","Transparent source evidence and disconfirming risks","Consent and clear rights for collaborators","Explicit separate authorization for anything financial"].map(s=>'<div class="row"><span class="gold">◇</span><span class="small">'+esc(s)+'</span></div>').join("")+'</div></section>';
 const cards=state.proposals.length?'<div class="grid grid-2">'+state.proposals.slice().reverse().map(p=>
 '<article class="panel project-card" data-project-id="'+esc(p.id)+'">'+
 '<div class="panel-title"><div>'+tag(p.category||"Cultural concept")+' '+tag(p.status==="review-preview"?"REVIEW PREVIEW":"PRIVATE DRAFT",p.status==="review-preview"?"green":"gold")+'</div><span class="muted tiny-text">'+esc(fmtDate(p.at))+'</span></div>'+
 '<h3 style="font-size:20px">'+esc(p.name)+'</h3>'+
 '<p><b>Project:</b> '+esc(p.pitch)+'</p><p><b>Value:</b> '+esc(p.value)+'</p><p><b>Risk:</b> '+esc(p.risk)+'</p>'+
 (p.signalId?'<p class="small"><b>Research source:</b> '+esc(state.signals.find(s=>s.id===p.signalId)?.title||"Original signal was removed")+
 ' · '+evidenceLink(p.sourceUrl||state.signals.find(s=>s.id===p.signalId)?.sourceUrl||"")+'</p>':'')+
 '<div class="btn-row">'+btn("Export private draft","export-proposal",p.id,"btn-sm")+
 btn("Delete draft and linked research","delete-proposal",p.id,"btn-sm btn-danger")+'</div>'+
 (p.status==="draft"?editForm(p):"")+reviewGate(p,pass)+
 (p.status==="review-preview"?'<div class="form-actions">'+btn("Open optional pairing research","pair-proposal",p.id,"btn-sm btn-primary")+'</div>':'')+
 '</article>').join("")+'</div>':empty("No drafts yet. Create one above or forward a sourced Watchtower research note.");
 return intro+'<div class="section-heading"><div><h2>Builder project studio</h2><p>Projects here are private drafts, not public submissions.</p></div></div>'+
 '<div class="grid split">'+draftForm+readiness+'</div>'+
 '<div class="section-heading"><div><h2>My local projects</h2><p>Edit your original deliverables and explicitly acknowledge the local-only gate before advancing.</p></div><span class="caption">'+state.proposals.length+' DRAFTS</span></div>'+
 cards+'<div class="quote" style="margin-top:28px">“Culture creates possibility. Original work proves it.”</div>';
}
export function handleForgeSubmit(form,ctx){
 if(form.id==="proposalForm"){
  const entry=projectProposal(Object.fromEntries(new FormData(form).entries()));
  if(entry.error){ctx.toast(entry.error);return true;}
  if(ctx.state.proposals.length>=80){ctx.toast("The local project board is full.");return true;}
  if(entry.value.signalId){
   const sig=ctx.state.signals.find(x=>x.id===entry.value.signalId);
   if(!sig){ctx.toast("Linked research signal unavailable.");return true;}
   entry.value.sourceUrl=sig.sourceUrl;
  }
  ctx.state.proposals.push(entry.value);
  ctx.commit("Project saved locally as an unpublished draft. Review and edit it before previewing further steps.");return true;
 }
 if(form.classList.contains("edit-proposal-form")){
  const original=ctx.state.proposals.find(x=>x.id===form.dataset.id);
  if(!original||original.status!=="draft"){ctx.toast("This draft can no longer be edited here.");return true;}
  const revision=reviseProposal(original,Object.fromEntries(new FormData(form).entries()));
  if(revision.error){ctx.toast(revision.error);return true;}
  ctx.state.proposals.splice(ctx.state.proposals.indexOf(original),1,revision.value);
  ctx.commit("Original deliverables and risks saved in your local draft. Nothing was submitted.");return true;
 }
 if(form.classList.contains("review-preview-form")){
  const item=ctx.state.proposals.find(x=>x.id===form.dataset.id);
  if(!item||item.status!=="draft")return true;
  if(!practicePassed(ctx.state)||!reviewReady(item)){ctx.toast("Finish local learning and revise the project first.");return true;}
  if(new FormData(form).get("acknowledge")!=="yes"){ctx.toast("Explicit acknowledgement is required.");return true;}
  item.status="review-preview";
  ctx.commit("Local review preview unlocked. No official certificate, application or approval exists.");return true;
 }
 return false;
}
export function handleForgeAction(action,id,ctx){
 if(!["export-proposal","pair-proposal","delete-proposal"].includes(action))return false;
 const proposal=ctx.state.proposals.find(p=>p.id===id);if(!proposal)return true;
 if(action==="export-proposal"){
  downloadJson("bagz-forge-"+proposal.id+".json",{...proposal,notice:"Unverified browser-local draft; no acceptance, certification, IP endorsement or pairing authorization."});
  ctx.toast("Draft exported locally; not accepted into any external program.");return true;
 }
 if(action==="delete-proposal"){
  ctx.state.proposals=ctx.state.proposals.filter(p=>p.id!==id);
  ctx.state.pairingReviews=ctx.state.pairingReviews.filter(r=>r.proposalId!==id);
  ctx.commit("Draft and associated local pairing reviews deleted.");return true;
 }
 if(!practicePassed(ctx.state)||!reviewReady(proposal)||proposal.status!=="review-preview"){
  ctx.toast("This pairing research stage requires a locally reviewed draft, with no official authorization.");return true;
 }
 let review=ctx.state.pairingReviews.find(r=>r.proposalId===id);
 if(!review){if(ctx.state.pairingReviews.length>=80){ctx.toast("Local pairing review limit reached.");return true;}
  review=pairingReview(id);ctx.state.pairingReviews.push(review);}
 if(!ctx.commit("Optional pairing research opened locally. No assets, transactions or program approvals were affected."))return true;
 ctx.navigate("pairing");return true;
}
