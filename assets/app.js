// BodyBagz Ecosystem v0.1: static, browser-local module orchestration.
import {loadState,saveState} from "../core/storage.js";
import {renderHome} from "../modules/home.js";
import {renderLearn,handleLearnAction,handleLearnSubmit} from "../modules/ugly-duck-tek.js";
import {renderIntel,handleIntelAction,handleIntelSubmit} from "../modules/watchtower-crypto.js";
import {renderForge,handleForgeAction,handleForgeSubmit} from "../modules/bagz-forge.js";
import {renderPairing,handlePairingAction,handlePairingSubmit} from "../modules/pairing-desk.js";
import {renderArchitecture} from "../modules/architecture.js";

const app=document.querySelector("#app"),sidebar=document.querySelector("#sidebar"),menu=document.querySelector("#menuToggle"),
 scrim=document.querySelector("#mobileScrim"),toastNode=document.querySelector("#toast");
let state=loadState(),toastTimer=0;
const modules={
 home:{title:"COMMAND HUB",render:renderHome},
 learn:{title:"UGLY DUCK TEK",render:renderLearn},
 intel:{title:"WATCHTOWER CRYPTO",render:renderIntel},
 forge:{title:"BAGZ FORGE",render:renderForge},
 pairing:{title:"BAGZ PAIRING DESK",render:renderPairing},
 architecture:{title:"ARCHITECTURE",render:renderArchitecture}
};
const current=()=>{const route=(location.hash||"#/home").replace(/^#\/?/,"").split(/[?#]/)[0];return Object.prototype.hasOwnProperty.call(modules,route)?route:"home";};
function closeMenu(){sidebar.classList.remove("open");menu.setAttribute("aria-expanded","false");scrim.hidden=true;}
function showToast(message){
 clearTimeout(toastTimer);toastNode.textContent=message;toastNode.hidden=false;
 toastTimer=setTimeout(()=>{toastNode.hidden=true;},5500);
}
function render(focus=false){
 const route=current(),page=modules[route];
 app.innerHTML=page.render(state);
 document.querySelector("#currentModule").textContent=page.title;
 document.querySelector("#year").textContent=new Date().getFullYear();
 document.querySelectorAll("[data-nav]").forEach(n=>{
  const selected=n.dataset.nav===route;
  n.classList.toggle("active",selected);
  if(selected)n.setAttribute("aria-current","page");else n.removeAttribute("aria-current");
 });
 closeMenu();
 if(focus){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});}
}
const ctx={
 get state(){return state;},
 toast:showToast,
 render:()=>render(false),
 navigate:route=>{if(!modules[route])return;location.hash="#/"+route;if(current()===route)render(false);},
 commit:(message)=>{
  if(!saveState(state)){
   state=loadState();render(false);showToast("Could not save this entry. The browser may be full or saved data failed validation.");
   return false;
  }
  render(false);showToast(message);return true;
 }
};
window.addEventListener("hashchange",()=>render(true));
menu.addEventListener("click",()=>{
 const next=!sidebar.classList.contains("open");sidebar.classList.toggle("open",next);
 menu.setAttribute("aria-expanded",String(next));scrim.hidden=!next;
});
scrim.addEventListener("click",closeMenu);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
document.addEventListener("click",e=>{
 const el=e.target.closest("[data-action]");if(!el||!app.contains(el))return;
 const action=el.dataset.action,id=el.dataset.id||"";
 if(handleLearnAction(action,id,ctx))return;
 if(handleIntelAction(action,id,ctx))return;
 if(handleForgeAction(action,id,ctx))return;
 if(handlePairingAction(action,id,ctx))return;
});
document.addEventListener("submit",e=>{
 const form=e.target;if(!(form instanceof HTMLFormElement)||!app.contains(form))return;
 e.preventDefault();
 if(handleLearnSubmit(form,ctx))return;
 if(handleIntelSubmit(form,ctx))return;
 if(handleForgeSubmit(form,ctx))return;
 if(handlePairingSubmit(form,ctx))return;
});
render();
