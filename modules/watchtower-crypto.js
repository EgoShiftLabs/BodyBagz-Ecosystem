import {esc,btn,header,metric,navButton,tag,field,empty,evidenceLink,fmtDate,downloadJson} from "../core/kit.js";
import {opportunity,kolEntry,proposalFromSignal} from "../core/contracts.js";
const EXAMPLES=[
 {num:"01",category:"CREATOR ECONOMY",title:"Music-native communities",prompt:"Are original music releases turning audiences into sustained contributor communities?",checks:"Look for verifiable releases, artist ownership, repeat participation, community retention."},
 {num:"02",category:"CULTURAL IP",title:"Original lore & identity",prompt:"Can a distinctive character or mythology sustain games, art, media and events independently of a token?",checks:"Check original IP rights, production continuity, fan contribution, delivered assets."},
 {num:"03",category:"BUILDER UTILITY",title:"Tools over speculation",prompt:"Can simple, useful developer products survive outside short-lived trading cycles?",checks:"Look for functional demos, honest limitations, users returning without rewards."}
];
export function renderIntel(state){
 const total=state.signals.length,kol=state.kolWatch.length,forwarded=state.proposals.filter(p=>p.signalId).length;
 return header("WATCHTOWER CRYPTO / RESEARCH INTELLIGENCE","Study the signals. Build the narrative.","Research emerging cultural metas, track public KOL references, challenge assumptions and send ideas to BAGZ Forge.",
 '<a class="btn btn-ghost" href="https://egoshiftlabs.github.io/EgoShiftLabs-Watchtower-OS/" rel="noopener noreferrer" target="_blank">Open Watchtower OS ↗</a>')+
 '<div class="notice"><strong>No live data connection:</strong> This first module is a manual research register. The cards below are questions to investigate, NOT verified trends, rankings, market predictions, or collected KOL posts. Nothing is automatically scraped.</div>'+
 '<div class="grid grid-3">'+metric("YOUR SOURCED SIGNALS",total,"Evidence supplied manually")+metric("YOUR KOL WATCHLIST",kol,"Public profiles to examine")+metric("FORGE CONNECTIONS",forwarded,"Local proposal drafts from signals")+'</div>'+
 '<div class="section-heading"><div><h2>Cultural imagination radar</h2><p>Research prompts; not live claims about what is trending right now.</p></div><span class="caption">ILLUSTRATIVE RESEARCH THEMES</span></div>'+
 '<div class="grid grid-3">'+EXAMPLES.map(e=>'<article class="panel"><div class="panel-title"><span class="eyebrow">'+esc(e.category)+'</span>'+tag("EXAMPLE")+'</div><h3 style="font-size:19px;margin-top:18px">'+esc(e.title)+'</h3><p>'+esc(e.prompt)+'</p><div class="divider"></div><p class="small"><strong>VERIFY:</strong> '+esc(e.checks)+'</p></article>').join("")+'</div>'+
 '<div class="section-heading"><div><h2>My signal register</h2><p>Record what you observed and where you observed it.</p></div><span class="caption">LOCAL / UNVERIFIED</span></div>'+
 '<div class="grid split"><section class="panel"><h3>Add a sourced opportunity</h3><p>Every entry needs an evidence link and a disconfirming risk. If a hypothesis deserves development, forward it to BAGZ Forge as a draft.</p>'+
 '<form id="signalForm" class="form-grid" autocomplete="off">'+
 field("title","Signal or meta name",{required:true,placeholder:"A narrative or emerging builder pattern",full:true,max:130})+
 field("domain","Research domain",{choices:[["Culture","Culture"],["Music & IP","Music & IP"],["AI & tools","AI & tools"],["Web3 & utilities","Web3 & utilities"],["Community","Community"],["Other","Other"]]})+
 field("sourceUrl","Original public source URL",{required:true,type:"url",max:600,full:true,placeholder:"https://..."})+
 field("observation","What did you actually observe?",{required:true,multiline:true,max:1500,full:true,placeholder:"State the evidence, date, actor and why it may matter. At least 20 characters."})+
 field("risk","What might invalidate this signal?",{required:true,multiline:true,max:700,full:true,placeholder:"Discuss manipulation, weak adoption, conflicts, missing data or copied concepts."})+
 '<div class="field span-all"><button type="submit" class="btn btn-primary">Add research signal ↗</button></div></form></section>'+
 '<section class="panel"><h3>Sourced research entries</h3>'+
 (total?'<div class="stack">'+state.signals.slice().reverse().map(x=>'<article class="local-card"><div class="row between">'+tag(x.domain,"gold")+tag("USER-SUPPLIED / UNVERIFIED")+'</div><h3 style="margin-top:13px">'+esc(x.title)+'</h3><p>'+esc(x.observation)+'</p><p><strong>Challenge:</strong> '+esc(x.risk)+'</p><div class="meta">'+fmtDate(x.at)+' · '+evidenceLink(x.sourceUrl)+'</div><div class="btn-row">'+btn("Draft in BAGZ Forge","send-forge",x.id,"btn-sm btn-primary")+btn("Remove","remove-signal",x.id,"btn-sm btn-danger")+'</div></article>').join("")+'</div>':
 empty("No research signals yet. Your first evidence-backed observation appears here."))+
 '</section></div>'+
 '<div class="section-heading"><div><h2>KOL / creator research list</h2><p>Watch public activity without confusing popularity with trustworthy evidence.</p></div><span class="caption">MANUAL LINKS · NO FEED API</span></div>'+
 '<div class="grid split"><section class="panel"><h3>Add a creator or researcher</h3><p>Record a public profile link and your reason for following it. We are not claiming to fetch engagement metrics, private accounts, or wallet activity.</p>'+
 '<form id="kolForm" class="form-grid">'+
 field("handle","Name or public handle",{required:true,placeholder:"@creator or project name",full:true,max:90})+
 field("url","Public profile URL",{required:true,type:"url",full:true,max:600,placeholder:"https://..."})+
 field("note","What information is worth checking?",{multiline:true,full:true,max:500,placeholder:"Examples: original content, claims versus deliveries, conflicts of interest."})+
 '<div class="field span-all"><button class="btn btn-primary" type="submit">Add to research watchlist ↗</button></div></form></section>'+
 '<section class="panel"><h3>Research watchlist</h3>'+
 (kol?'<div class="stack">'+state.kolWatch.slice().reverse().map(k=>'<div class="local-card"><div class="row between"><strong>'+esc(k.handle)+'</strong>'+btn("Remove","remove-kol",k.id,"btn-sm btn-danger")+'</div><p>'+esc(k.note||"No research notes yet.")+'</p><p>'+evidenceLink(k.url,"Open public profile")+'</p></div>').join("")+'</div>':empty("Your KOL and creator research list is empty. This isn't a live follower tracker."))+
 '</section></div>'+
 '<div class="quote" style="margin-top:26px">“Signals are where the investigation starts—not where the conclusion ends.”</div>';
}
export function handleIntelSubmit(form,ctx){
 if(form.id==="signalForm"){
  const d=Object.fromEntries(new FormData(form).entries()),result=opportunity(d);
  if(result.error){ctx.toast(result.error);return true;}
  if(ctx.state.signals.length>=120){ctx.toast("Local research register limit reached. Export or remove older entries.");return true;}
  ctx.state.signals.push(result.value);ctx.commit("Evidence-backed research note saved locally. It has not been independently verified.");return true;
 }
 if(form.id==="kolForm"){
  const result=kolEntry(Object.fromEntries(new FormData(form).entries()));
  if(result.error){ctx.toast(result.error);return true;}
  if(ctx.state.kolWatch.length>=80){ctx.toast("Local KOL research list limit reached.");return true;}
  ctx.state.kolWatch.push(result.value);ctx.commit("Public research profile added locally. No external KOL feed was accessed.");return true;
 }
 return false;
}
export function handleIntelAction(action,id,ctx){
 if(action==="remove-signal"){
  const index=ctx.state.signals.findIndex(x=>x.id===id);if(index<0)return true;
  ctx.state.signals.splice(index,1);ctx.commit("Research entry deleted from your browser.");return true;
 }
 if(action==="remove-kol"){
  const index=ctx.state.kolWatch.findIndex(x=>x.id===id);if(index<0)return true;
  ctx.state.kolWatch.splice(index,1);ctx.commit("Research profile removed.");return true;
 }
 if(action==="send-forge"){
  const s=ctx.state.signals.find(x=>x.id===id);if(!s)return true;
  if(ctx.state.proposals.length>=80){ctx.toast("Local Forge draft limit reached.");return true;}
  const current=ctx.state.proposals.find(p=>p.signalId===s.id);
  if(!current)ctx.state.proposals.push(proposalFromSignal(s));
  if(!ctx.commit("Signal transferred as a local Forge draft, not submitted to a public program."))return true;
  ctx.navigate("forge");return true;
 }
 return false;
}
