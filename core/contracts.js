// Module integration envelopes; not proof of certification, user identity or on-chain approval.
import {esc,trim,uid,dateStamp,validUrl} from "./kit.js";
export const CONTRACTS=Object.freeze({
 opportunity:"bodybagz.opportunity.v1",
 proposal:"bodybagz.proposal.v1",
 pairing:"bodybagz.pairing-review.v1",
 practice:"bodybagz.local-practice.v1"
});
export function opportunity(input){
 const obj={schema:CONTRACTS.opportunity,id:uid("signal"),title:trim(input.title,130),domain:trim(input.domain,60),
  observation:trim(input.observation,1500),risk:trim(input.risk,700),sourceUrl:trim(input.sourceUrl,600),at:dateStamp(),
  evidenceStatus:"user-supplied-unverified"};
 if(obj.title.length<5||obj.observation.length<20||obj.risk.length<10||!validUrl(obj.sourceUrl))return {error:"Provide a title (5+), observation (20+), risk (10+) and a valid public source URL."};
 return {value:obj};
}
export function kolEntry(input){
 const entry={id:uid("kol"),handle:trim(input.handle,90),url:trim(input.url,600),note:trim(input.note,500)};
 if(entry.handle.length<2||!validUrl(entry.url))return {error:"Provide a public handle/name and a valid source URL."};
 return {value:entry};
}
export function projectProposal(input){
 const obj={schema:CONTRACTS.proposal,id:uid("forge"),name:trim(input.name,130),category:trim(input.category,60),
  pitch:trim(input.pitch,1500),value:trim(input.value,1600),risk:trim(input.risk,1100),signalId:trim(input.signalId,110),
  status:"draft",at:dateStamp()};
 if(obj.name.length<4||obj.pitch.length<25||obj.value.length<25||obj.risk.length<15)return {error:"Include a project name, clear pitch (25+), concrete value (25+) and risk plan (15+)."};
 return {value:obj};
}
export function proposalFromSignal(signal){
 // Map only declared public-research fields; no side effects or external service calls.
 return {schema:CONTRACTS.proposal,id:uid("forge"),name:trim(signal.title,130),category:"Cultural concept",
  pitch:trim("Research inspiration: "+signal.observation,1500),value:"Define original user value and actual deliverables before review.",
  risk:trim("Source is user-entered and unverified. Original risk note: "+signal.risk,1100),
  signalId:signal.id,status:"draft",at:dateStamp()};
}
export function pairingReview(proposalId){return {schema:CONTRACTS.pairing,id:uid("pair"),proposalId,at:dateStamp(),checks:{}};}
export function verifyEnvelope(envelope,kind){
 if(!envelope||typeof envelope!=="object"||envelope.schema!==CONTRACTS[kind]||typeof envelope.id!=="string")return false;
 if(kind==="opportunity")return typeof envelope.title==="string"&&typeof envelope.observation==="string"&&validUrl(envelope.sourceUrl);
 if(kind==="proposal")return typeof envelope.name==="string"&&typeof envelope.pitch==="string"&&["draft","review-preview"].includes(envelope.status);
 if(kind==="pairing")return typeof envelope.proposalId==="string"&&envelope.checks&&typeof envelope.checks==="object";
 return kind==="practice"&&envelope.kind==="local-practice-only";
}
