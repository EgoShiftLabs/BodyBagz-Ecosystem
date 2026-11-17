// Local preview store only. There is no identity, backend, sync or protected credential issuance.
export const STORAGE_KEY="bodybagz.ecosystem.preview.v1";
export const SCHEMA="bodybagz-preview-state-v1";
export function blankState(){return {schema:SCHEMA,lessons:{},practicePass:null,signals:[],kolWatch:[],proposals:[],pairingReviews:[]};}
const str=(x,max)=>typeof x==="string"&&x.length<=max;
const arr=(x,max)=>Array.isArray(x)&&x.length<=max;
const finiteNum=x=>typeof x==="number"&&Number.isFinite(x);
export function validateState(s){
 if(!s||typeof s!=="object"||Array.isArray(s)||s.schema!==SCHEMA)return false;
 if(!s.lessons||typeof s.lessons!=="object"||Array.isArray(s.lessons))return false;
 if(Object.keys(s.lessons).length>6||Object.entries(s.lessons).some(([k,v])=>!/^[a-z-]+$/.test(k)||!v||!finiteNum(v.score)||v.score<0||v.score>5||!finiteNum(v.attempts)||v.attempts<1||v.attempts>10000||typeof v.passed!=="boolean"||!str(v.at,40)))return false;
 if(s.practicePass!==null&&(!s.practicePass||s.practicePass.kind!=="local-practice-only"||!str(s.practicePass.completedAt,40)||!str(s.practicePass.id,110)))return false;
 if(!arr(s.signals,120)||s.signals.some(x=>!x||!str(x.id,100)||!str(x.title,130)||!str(x.domain,60)||!str(x.observation,1500)||!str(x.risk,700)||!str(x.sourceUrl,600)||!str(x.at,40)))return false;
 if(!arr(s.kolWatch,80)||s.kolWatch.some(x=>!x||!str(x.id,100)||!str(x.handle,90)||!str(x.url,600)||!str(x.note,500)))return false;
 if(!arr(s.proposals,80)||s.proposals.some(x=>!x||!str(x.id,100)||!str(x.name,130)||!str(x.category,60)||!str(x.pitch,1500)||!str(x.value,1600)||!str(x.risk,1100)||!str(x.signalId,110)||(x.sourceUrl!==undefined&&!str(x.sourceUrl,600))||(x.reviewPrepared!==undefined&&typeof x.reviewPrepared!=="boolean")||!str(x.at,40)||!["draft","review-preview"].includes(x.status)))return false;
 if(!arr(s.pairingReviews,80)||s.pairingReviews.some(x=>!x||!str(x.id,100)||!str(x.proposalId,110)||!str(x.at,40)||!x.checks||typeof x.checks!=="object"||Array.isArray(x.checks)||Object.keys(x.checks).length>12||Object.values(x.checks).some(y=>typeof y!=="boolean")))return false;
 return true;
}
export function loadState(){
 try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return blankState();
 const obj=JSON.parse(raw);
 if(validateState(obj)){
  // Older V0.1 browser drafts were allowed to advance without editing.
  // Reset ONLY those old review previews to drafts, preserving all their text and linked research.
  for(const proposal of obj.proposals){
   if(proposal.status==="review-preview"&&proposal.reviewPrepared!==true)proposal.status="draft";
  }
  return obj;
 }
 console.warn("BodyBagz saved preview data was rejected; state reset.");
 }catch(e){console.warn("Unable to read browser preview data.",e);}
 return blankState();
}
export function saveState(state){
 if(!validateState(state))return false;
 try{const data=JSON.stringify(state);if(data.length>240000)return false;localStorage.setItem(STORAGE_KEY,data);return true;}catch{return false;}
}
