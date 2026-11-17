// Small shared UI primitives. Untrusted text is escaped before HTML insertion.
export const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export const trim=(x,max=500)=>String(x??"").trim().slice(0,max);
export const validUrl=x=>{try{const u=new URL(x);return ["https:","http:"].includes(u.protocol)&&Boolean(u.hostname);}catch{return false;}};
export const safeUrl=x=>validUrl(x)?esc(x):"#";
export const uid=(prefix="local")=>prefix+"-"+(typeof crypto!=="undefined"&&typeof crypto.randomUUID==="function"?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
export const dateStamp=()=>new Date().toISOString();
export const fmtDate=x=>{const d=new Date(x);return Number.isFinite(d.valueOf())?d.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"Unknown date";};
export const tag=(value,type="")=>'<span class="tag '+(type?"tag-"+type:"")+'">'+esc(value)+'</span>';
export const navButton=(text,route,primary=false)=>'<a class="btn '+(primary?"btn-primary":"btn-ghost")+'" href="#/'+esc(route)+'">'+esc(text)+' <span aria-hidden="true">↗</span></a>';
export const btn=(label,action,id="",klass="")=>'<button type="button" class="btn '+klass+'" data-action="'+esc(action)+'"'+(id?' data-id="'+esc(id)+'"':"")+'>'+esc(label)+'</button>';
export const field=(name,label,opts={})=>'<div class="field '+(opts.full?"span-all":"")+'"><label for="'+esc(name)+'">'+esc(label)+'</label>'+
 (opts.multiline?'<textarea class="textarea" id="'+esc(name)+'" name="'+esc(name)+'" maxlength="'+(opts.max||1200)+'" placeholder="'+esc(opts.placeholder||"")+'"'+(opts.required?" required":"")+'></textarea>':
 opts.choices?'<select class="select" id="'+esc(name)+'" name="'+esc(name)+'"'+(opts.required?" required":"")+'>'+opts.choices.map(o=>'<option value="'+esc(o[0])+'">'+esc(o[1])+'</option>').join("")+'</select>':
 '<input class="input" id="'+esc(name)+'" name="'+esc(name)+'" type="'+esc(opts.type||"text")+'" maxlength="'+(opts.max||160)+'" placeholder="'+esc(opts.placeholder||"")+'"'+(opts.required?" required":"")+'>'+
 '</div>';
export const empty=(msg)=>'<div class="empty">'+esc(msg)+'</div>';
export const evidenceLink=(url,label="Original source")=>validUrl(url)?'<a class="text-link" href="'+safeUrl(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>':'<span class="muted">Source not yet provided</span>';
export function downloadJson(filename,obj){
 const blob=new Blob([JSON.stringify(obj,null,2)+"\n"],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),250);
}
export function header(kicker,title,subtitle,actions=""){return '<div class="page-heading"><div><div class="eyebrow">'+esc(kicker)+'</div><h1>'+esc(title)+'</h1><p>'+esc(subtitle)+'</p></div>'+(actions?'<div class="page-actions">'+actions+'</div>':"")+'</div>';}
export function metric(label,value,sub=""){return '<div class="metric"><div class="metric-label">'+esc(label)+'</div><strong>'+esc(value)+'</strong><small>'+esc(sub)+'</small></div>';}
