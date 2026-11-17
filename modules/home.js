import {esc,navButton,metric,tag,fmtDate} from "../core/kit.js";
import {MODULES,PIPELINE} from "../core/catalog.js";
import {progress} from "./ugly-duck-tek.js";
export function renderHome(state){
 const p=progress(state);
 return '<section class="hero"><div class="hero-content"><div class="eyebrow">BODYBAGZ / CULTURAL IMAGINATION INITIATIVE</div>'+
 '<h1>We don’t just chase<br>the next meta.<br><span class="accent">We build the people</span><br>who create it.</h1>'+
 '<p class="lead">A culture-first development ecosystem: learn the fundamentals, study emerging opportunities, build original intellectual property, and evaluate responsible paths to market.</p>'+
 '<div class="hero-cta">'+navButton("Enter UGLY DUCK TEK","learn",true)+navButton("Explore the ecosystem","architecture")+'</div></div><span class="hero-bottom">BUILT IN THE TRENCHES. STILL BUILDING.</span></section>'+
 '<div class="section-heading"><div><h2>One movement. Independent tools.</h2><p>Each module has a single job, versioned contracts, and an open path to its own deployment.</p></div><span class="caption">MODULAR BY DESIGN</span></div>'+
 '<div class="grid grid-4">'+MODULES.map(m=>'<article class="panel feature-card" data-monogram="'+esc(m.glyph)+'"><div class="feature-top"><span class="module-num">MODULE '+esc(m.number)+'</span>'+tag(m.status,m.color)+'</div><h3>'+esc(m.name)+'</h3><p>'+esc(m.summary)+'</p>'+navButton("Open "+m.short,m.id)+'</article>').join("")+'</div>'+
 '<div class="section-heading"><div><h2>Your local workspace</h2><p>No accounts or background data collection. Activity stays in this browser.</p></div><span class="caption">PRACTICE STATE</span></div>'+
 '<div class="grid grid-4">'+
 metric("LEARNING",p.passed+" / 6","Readiness modules passed")+
 metric("RESEARCH SIGNALS",state.signals.length,"User-entered observations")+
 metric("PROJECT IDEAS",state.proposals.length,"Local Forge drafts")+
 metric("PAIRING REVIEWS",state.pairingReviews.length,"No transactions / research only")+
 '</div>'+
 '<div class="section-heading"><div><h2>The development pipeline</h2><p>A credible path from cultural discovery to builder participation.</p></div><span class="caption">CULTURE → CAPABILITY</span></div>'+
 '<div class="pathway">'+PIPELINE.map(x=>'<div class="path-step"><span class="number">'+esc(x.step)+'</span><strong>'+esc(x.title)+'</strong><p>'+esc(x.detail)+'</p></div>').join("")+'</div>'+
 '<div class="grid split" style="margin-top:20px"><section class="panel"><div class="eyebrow">WHY THIS EXISTS</div><h2 style="margin:22px 0 10px">Build the capacity.<br><span class="gold">Not just the hype.</span></h2><p>BodyBagz started with culture, music and resilience. This ecosystem adds education, verified research habits, developer incubation and practical tools so participants can prepare for changing ways of working and earning.</p>'+
 '<p>There is room for music, art, software, community ventures and other original creations. A token is an optional design choice—not the definition of success.</p>'+
 '<div class="btn-row">'+navButton("Read the architecture","architecture",true)+'<a class="btn btn-ghost" href="https://bodybagz.org" target="_blank" rel="noopener noreferrer">Visit BodyBagz.org ↗</a></div></section>'+
 '<section class="panel"><div class="eyebrow">SYSTEM STATE / V0.2</div><h3 style="margin-top:20px">What’s actually working</h3><div class="stack">'+[
 ["ON","Six practical learning tracks and quiz scoring"],
 ["ON","Manual sourced research and KOL watchlist"],
 ["ON","Builder drafts, cross-module idea transfer"],
 ["ON","Local pairing research checklists"],
 ["NEXT","Verifiable credential issuer & approved backend"],
 ["NEXT","Licensed live crypto/creator data connectors"],
 ["NEXT","On-chain eligibility review and human-authorized execution"]
 ].map(x=>'<div class="row between" style="border-bottom:1px solid #2b3032;padding:8px 0"><span class="small">'+esc(x[1])+'</span>'+tag(x[0],x[0]==="ON"?"green":"gold")+'</div>').join("")+'</div></section></div>'+
 '<div class="quote" style="margin-top:30px">“Cultural imagination means creating things that last longer than the cycle that introduced them.”</div>';
}
