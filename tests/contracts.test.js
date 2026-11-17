import test from "node:test";import assert from "node:assert/strict";
import {CONTRACTS,opportunity,kolEntry,projectProposal,proposalFromSignal,reviseProposal,reviewReady,pairingReview,verifyEnvelope} from "../core/contracts.js";
import {blankState,validateState,migrateStateV1} from "../core/storage.js";
import {LESSONS,progress} from "../modules/ugly-duck-tek.js";
test("six complete builder modules, each with five questions",()=>{
 assert.equal(LESSONS.length,6);
 assert.equal(new Set(LESSONS.map(x=>x.id)).size,6);
 for(const lesson of LESSONS){
  assert.equal(lesson.questions.length,5);
  assert.ok(lesson.intro.length>60);
  for(const q of lesson.questions){assert.ok(q.options.length>=3);assert.ok(Number.isInteger(q.answer)&&q.answer<q.options.length);}
 }
});
test("practice completion remains a local, unverified milestone",()=>{
 const state=blankState();assert.equal(progress(state).passed,0);
 for(const lesson of LESSONS)state.lessons[lesson.id]={score:4,attempts:1,passed:true,at:"2026-11-17T14:00:00Z"};
 assert.equal(progress(state).complete,true);assert.equal(validateState(state),true);
 state.practicePass={kind:"local-practice-only",id:"PRACTICE-DEMO",completedAt:"2026-11-17T14:00:00Z"};
 assert.equal(validateState(state),true);assert.equal("wallet" in state.practicePass,false);
});
test("research opportunities require sources, observations, and risks",()=>{
 assert.ok(opportunity({title:"A",observation:"short",risk:"x",sourceUrl:"javascript:alert(1)",domain:"Culture"}).error);
 const result=opportunity({title:"Original music IP community",observation:"A real release links creators and recurring participants.",risk:"Attention may not persist after the initial release.",sourceUrl:"https://example.com/release",domain:"Music & IP"});
 assert.equal(result.value.schema,CONTRACTS.opportunity);
 assert.equal(verifyEnvelope(result.value,"opportunity"),true);
 assert.equal(result.value.evidenceStatus,"user-supplied-unverified");
});
test("KOL watch is a list of manually supplied public references",()=>{
 assert.ok(kolEntry({handle:"@researcher",url:"javascript:alert(1)",note:""}).error);
 assert.equal(kolEntry({handle:"@researcher",url:"https://example.com/public",note:"Source only"}).value.handle,"@researcher");
});
test("Forge proposals and research pairing have versioned envelopes",()=>{
 const draft=projectProposal({name:"Original audio network",category:"Music & audio",pitch:"Build a platform for a recurring original audio collaboration.",value:"Give creators a publishing and remix workflow they own.",risk:"Plan rights clearance, attribution and moderation.",signalId:""});
 assert.equal(verifyEnvelope(draft.value,"proposal"),true);
 const forwarded=proposalFromSignal({title:"Original audio network",id:"public-1",observation:"Artists sharing source-backed original media rights.",risk:"Intellectual property disputes."});
 assert.equal(forwarded.signalId,"public-1");assert.equal(forwarded.status,"draft");
 const pair=pairingReview(forwarded.id);assert.equal(pair.schema,CONTRACTS.pairing);assert.equal(verifyEnvelope(pair,"pairing"),true);
});
test("storage validation rejects malformed checklist and fake approval states",()=>{
 const state=blankState();assert.equal(validateState(state),true);
 state.kolWatch=[{id:"a",handle:"b",url:"https://example.org",note:"x"}];assert.equal(validateState(state),true);
 state.pairingReviews=[{id:"bad",proposalId:"x",at:"now",checks:{a:"not-a-boolean"}}];assert.equal(validateState(state),false);
 state.pairingReviews=[];state.proposals=[{id:"x",name:"x",category:"x",pitch:"x",value:"x",risk:"x",signalId:"",status:"approved",at:"x"}];
 assert.equal(validateState(state),false);
});
test("all four published schema identifiers match the runtime contracts",async()=>{
 const {readFile}=await import("node:fs/promises");
 const entries=[["opportunity","opportunity.v1"],["proposal","proposal.v1"],["pairing","pairing-review.v1"],["practice","practice.v1"]];
 for(const [kind,file] of entries){
  const json=JSON.parse(await readFile(new URL("../contracts/"+file+".schema.json",import.meta.url)));
  assert.equal(json.$schema,"https://json-schema.org/draft/2020-12/schema");
  assert.equal(json.type,"object");
  assert.equal(json.additionalProperties,false);
  assert.ok(json.required.includes("schema"));
  assert.equal(json.properties.schema.const,CONTRACTS[kind]);
 }
});

test("source handoffs are unreviewed, retain the original source and require edited deliverables",()=>{
 const forwarded=proposalFromSignal({title:"Original media builders",id:"signal-source",observation:"Published makers are organizing a new original media collaboration",risk:"The interest could be temporary or manipulated",sourceUrl:"https://example.org/record"});
 assert.equal(forwarded.sourceUrl,"https://example.org/record");
 assert.equal(forwarded.reviewPrepared,false);
 assert.equal(reviewReady(forwarded),false);
 const early=reviseProposal(forwarded,{name:forwarded.name,category:"Music & audio",pitch:forwarded.pitch,value:forwarded.value,risk:forwarded.risk});
 assert.ok(early.error);
 const edited=reviseProposal(forwarded,{name:"Original media builders",category:"Music & audio",pitch:"Publish original creator-owned collaborations for aspiring artists.",value:"Participants receive a reviewed publishing workflow and monthly creative showcases.",risk:"Copyright claims and low retention require rights agreements and audience feedback."});
 assert.equal(edited.error,undefined);
 assert.equal(edited.value.id,forwarded.id);
 assert.equal(edited.value.status,"draft");
 assert.equal(edited.value.reviewPrepared,true);
 assert.equal(reviewReady(edited.value),true);
});
test("research links require HTTPS to avoid downgrade and malformed origins",()=>{
 assert.ok(opportunity({title:"An example",observation:"A documented pattern in a published research article",risk:"Alternative explanations are plausible",sourceUrl:"http://example.org/story",domain:"Other"}).error);
 assert.ok(kolEntry({handle:"@example",url:"http://example.org/user",note:""}).error);
});
test("state schema accepts additive proposal provenance without turning it into a verified approval",()=>{
 const state=blankState();
 state.proposals=[{id:"draft",name:"Original audio network",category:"Music & audio",pitch:"Build an original music collaboration platform for the public.",value:"Deliver creator-owned releases and simple rights agreements.",risk:"Unclear rights should be independently reviewed before release.",signalId:"signal-1",sourceUrl:"https://example.org/record",reviewPrepared:true,status:"draft",at:"2026-11-17T14:00:00Z"}];
 assert.equal(validateState(state),true);
 state.proposals[0].reviewPrepared="verified-official";
 assert.equal(validateState(state),false);
});

test("V0.1 review previews are safely downgraded for explicit new confirmation without data loss",()=>{
 const legacy=blankState();
 legacy.proposals.push({id:"draft-1",name:"Original project",category:"Music & audio",pitch:"A detailed original cultural music project and website.",value:"Build an open resource for creators and educational partners.",risk:"Creative rights and moderation require independent oversight.",signalId:"old",status:"review-preview",at:"2026-11-17T14:00:00Z"});
 const result=migrateStateV1(legacy);
 assert.ok(result);
 assert.equal(result.proposals[0].status,"draft");
 assert.equal(result.proposals[0].value,legacy.proposals[0].value);
 assert.equal(legacy.proposals[0].status,"review-preview"); // Pure migration, no mutation.
});
