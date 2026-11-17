// End-to-end browser coverage: local-only learning, research, proposal, pairing and accessibility smoke.
import assert from "node:assert/strict";
import {chromium} from "playwright";
import {LESSONS} from "../modules/ugly-duck-tek.js";
const browser=await chromium.launch({headless:true});
const errors=[];
const base="http://127.0.0.1:8000/";
async function saved(page){return page.evaluate(()=>JSON.parse(localStorage.getItem("bodybagz.ecosystem.preview.v1")));}
try{
 const page=await browser.newPage({viewport:{width:1380,height:900},acceptDownloads:true});
 page.on("pageerror",e=>errors.push("Desktop: "+e.message));
 await page.goto(base,{waitUntil:"networkidle",timeout:30000});
 await page.locator("h1").filter({hasText:"We don’t just chase"}).waitFor({timeout:8000});
 for(const [route,title] of [["learn","Earn your builder readiness."],["intel","Study the signals."],["forge","Don't chase it."],["pairing","Explore the pair."],["architecture","Separate by design."]]){
  await page.locator('[data-nav="'+route+'"]').click();
  await page.locator("h1").filter({hasText:title}).waitFor({timeout:8000});
 }
 // Without JavaScript there must be a useful accessible overview instead of a blank shell.
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto(base,{waitUntil:"domcontentloaded"});
 for(const label of ["UGLY DUCK TEK","Watchtower Crypto","BAGZ Forge","BAGZ Pairing Desk"])
  assert.ok((await nojs.locator(".fallback h2").allTextContents()).includes(label),"No-JS overview must describe "+label);
 await nojs.close();

 // Failure and retry on first lesson, including a refresh within a lesson.
 await page.locator('[data-nav="learn"]').click();
 await page.locator('[data-action="open-lesson"][data-id="orientation"]').click();
 for(let i=0;i<5;i++){
  const q=LESSONS[0].questions[i];const wrong=(q.answer+1)%q.options.length;
  await page.locator('#lessonQuiz input[name="q'+i+'"][value="'+wrong+'"]').check();
 }
 await page.locator('#lessonQuiz button[type="submit"]').click();
 assert.equal((await saved(page)).lessons.orientation.passed,false);
 assert.equal((await saved(page)).lessons.orientation.attempts,1);
 await page.reload({waitUntil:"networkidle"});
 await page.locator('#lessonQuiz[data-lesson-id="orientation"]').waitFor({timeout:8000});
 for(let i=0;i<5;i++)
  await page.locator('#lessonQuiz input[name="q'+i+'"][value="'+LESSONS[0].questions[i].answer+'"]').check();
 await page.locator('#lessonQuiz button[type="submit"]').click();
 assert.equal((await saved(page)).lessons.orientation.passed,true);
 assert.equal((await saved(page)).lessons.orientation.attempts,2);
 await page.locator('[data-action="close-lesson"]').first().click();
 for(const lesson of LESSONS.slice(1)){
  await page.locator('[data-action="open-lesson"][data-id="'+lesson.id+'"]').click();
  for(let i=0;i<lesson.questions.length;i++)
   await page.locator('#lessonQuiz input[name="q'+i+'"][value="'+lesson.questions[i].answer+'"]').check();
  await page.locator('#lessonQuiz button[type="submit"]').click();
  await page.locator('[data-action="close-lesson"]').first().click();
 }
 await page.getByText("Local practice milestone reached.",{exact:false}).waitFor({timeout:8000});
 const practice=page.waitForEvent("download");
 await page.locator('[data-action="export-practice"]').click();
 assert.match((await practice).suggestedFilename(),/local-practice\.json$/);
 assert.equal((await saved(page)).practicePass.kind,"local-practice-only");

 await page.locator('[data-nav="intel"]').click();
 await page.locator("#kolForm #handle").fill("@OriginalResearcher");
 await page.locator("#kolForm #url").fill("https://example.org/creator");
 await page.locator("#kolForm #note").fill("Assess original evidence and delivery.");
 await page.locator('#kolForm button[type="submit"]').click();
 assert.equal((await saved(page)).kolWatch.length,1);
 await page.locator('[data-action="remove-kol"]').click();
 assert.equal((await saved(page)).kolWatch.length,0);
 // Form input must not accept a non-HTTPS or script URL.
 await page.locator("#signalForm #title").fill("Original music creator communities");
 await page.locator("#signalForm #sourceUrl").fill("http://example.org/unsecured");
 await page.locator("#signalForm #observation").fill("A visible community organized around independently published original music and artwork.");
 await page.locator("#signalForm #risk").fill("Participation might be temporarily inflated through coordinated promotion.");
 await page.locator('#signalForm button[type="submit"]').click();
 assert.equal((await saved(page)).signals.length,0);
 await page.locator("#signalForm #sourceUrl").fill("https://example.org/original-public-article");
 await page.locator('#signalForm button[type="submit"]').click();
 assert.equal((await saved(page)).signals.length,1);

 await page.locator('[data-action="send-forge"]').click();
 await page.locator("h1").filter({hasText:"Don't chase it."}).waitFor({timeout:8000});
 let data=await saved(page);
 const first=data.proposals[0];
 assert.equal(first.reviewPrepared,false);
 assert.equal(first.sourceUrl,"https://example.org/original-public-article");
 assert.equal(await page.locator(".review-preview-form").count(),0,"Imported source placeholders must never count as reviewed");
 const firstCard=page.locator('[data-project-id="'+first.id+'"]');
 await firstCard.locator("details summary").click();
 let edit=firstCard.locator("form.edit-proposal-form");
 await edit.locator('[name="pitch"]').fill("Produce an original multimedia music series with creator-owned works and open production notes.");
 await edit.locator('[name="value"]').fill("Release monthly original audio pieces, an open archive and hands-on contributor workshops.");
 await edit.locator('[name="risk"]').fill("Copyright, community safety and weak adoption require written rights checks and measured retention.");
 await edit.locator('button[type="submit"]').click();
 assert.equal((await saved(page)).proposals[0].reviewPrepared,true);
 const confirm=page.locator('[data-project-id="'+first.id+'"] .review-preview-form');
 await confirm.waitFor();
 assert.equal(await confirm.locator('input[name="acknowledge"]').isChecked(),false);
 await confirm.locator('input[name="acknowledge"]').check();
 await confirm.locator('button[type="submit"]').click();
 assert.equal((await saved(page)).proposals[0].status,"review-preview");
 await page.locator('[data-action="pair-proposal"][data-id="'+first.id+'"]').click();
 await page.locator("h1").filter({hasText:"Explore the pair."}).waitFor({timeout:8000});
 let forms=page.locator("form.pairing-review-form");
 assert.equal(await forms.count(),1);
 await forms.first().locator('input[name="check0"]').check();
 await forms.first().locator('button[type="submit"]').click();
 assert.equal((await saved(page)).pairingReviews.length,1);
 const exportPair=page.waitForEvent("download");
 await page.locator('[data-action="export-pairing"]').first().click();
 assert.match((await exportPair).suggestedFilename(),/bagz-pairing-research/);

 // Create a second independent review so duplicate forms, id collision and cascade are caught.
 await page.locator('[data-nav="forge"]').click();
 await page.locator("#proposalForm #name").fill("Open source creator learning community");
 await page.locator("#proposalForm #pitch").fill("Build a new community education program for new creative software builders.");
 await page.locator("#proposalForm #value").fill("Deliver a working online exercise library and monthly beginner workshops.");
 await page.locator("#proposalForm #risk").fill("Limited volunteer capacity and IP ownership need published policies.");
 await page.locator('#proposalForm button[type="submit"]').click();
 data=await saved(page);
 const second=data.proposals.find(x=>x.id!==first.id);
 assert.ok(second);
 const secondCard=page.locator('[data-project-id="'+second.id+'"]');
 await secondCard.locator("details summary").click();
 edit=secondCard.locator("form.edit-proposal-form");
 await edit.locator('[name="value"]').fill("Deliver a working open-source exercise library, a tested lesson and monthly workshops.");
 await edit.locator('button[type="submit"]').click();
 const confirmSecond=page.locator('[data-project-id="'+second.id+'"] .review-preview-form');
 await confirmSecond.locator('input[name="acknowledge"]').check();
 await confirmSecond.locator('button[type="submit"]').click();
 await page.locator('[data-action="pair-proposal"][data-id="'+second.id+'"]').click();
 forms=page.locator("form.pairing-review-form");
 assert.equal(await forms.count(),2);
 assert.equal(await page.evaluate(()=>{const a=[...document.querySelectorAll("form.pairing-review-form")].map(x=>x.id);return new Set(a).size===a.length;}),true);
 await forms.first().locator('input[name="check1"]').check();
 await forms.first().locator('button[type="submit"]').click();
 assert.equal((await saved(page)).pairingReviews.length,2);
 await page.locator('[data-nav="forge"]').click();
 await page.locator('[data-action="delete-proposal"][data-id="'+second.id+'"]').click();
 data=await saved(page);
 assert.equal(data.proposals.length,1);
 assert.equal(data.pairingReviews.length,1);
 assert.equal(data.pairingReviews[0].proposalId,first.id);

 await page.reload({waitUntil:"networkidle"});
 assert.equal((await saved(page)).proposals.length,1);
 assert.equal((await saved(page)).lessons.orientation.attempts,2);
 assert.equal(await page.locator('[data-action="mint-token"],[data-action="connect-wallet"],[data-action="launch-pair"]').count(),0);
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 mobile.on("pageerror",e=>errors.push("Mobile: "+e.message));
 await mobile.goto(base,{waitUntil:"networkidle",timeout:30000});
 await mobile.locator("#menuToggle").click();
 await mobile.locator('[data-nav="intel"]').click();
 await mobile.locator("h1").filter({hasText:"Study the signals."}).waitFor({timeout:7000});
 // Keyboard access to routes and forms (limited smoke, NOT a screen-reader audit).
 await mobile.keyboard.press("Tab");
 assert.equal(await mobile.evaluate(()=>document.activeElement?.tagName!=="BODY"),true);
 assert.equal(errors.length,0,errors.join("\n"));
 console.log("V0.2 browser smoke: failed quiz and retry, restore lesson, export, KOL CRUD, HTTPS validation, reviewed Forge plan, explicit gate, independent pairing forms, delete cascade, no-JS overview and mobile PASS.");
}catch(e){console.error("V0.2 browser smoke failed:",e);process.exitCode=1;}finally{await browser.close();}
