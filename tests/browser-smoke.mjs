// Browser smoke: exercise the actual private learning → research → Forge → pairing preview.
// This test does not mint NFTs, connect wallets, scrape KOL posts or publish user data.
import assert from "node:assert/strict";
import {chromium} from "playwright";
import {LESSONS} from "../modules/ugly-duck-tek.js";
const browser=await chromium.launch({headless:true});
const errors=[];
try{
 const page=await browser.newPage({viewport:{width:1380,height:900},acceptDownloads:true});
 page.on("pageerror",e=>errors.push("Desktop: "+e.message));
 await page.goto("http://127.0.0.1:8000/",{waitUntil:"networkidle",timeout:30000});
 await page.locator("h1").filter({hasText:"We don’t just chase"}).waitFor({timeout:7000});
 for(const [route,title] of [["learn","Earn your builder readiness."],["intel","Study the signals."],["forge","Don't chase it."],["pairing","Explore the pair."],["architecture","Separate by design."]]){
  await page.locator('[data-nav="'+route+'"]').click();
  await page.locator("h1").filter({hasText:title}).waitFor({timeout:8000});
 }
 await page.locator('[data-nav="learn"]').click();
 for(const lesson of LESSONS){
  await page.locator('[data-action="open-lesson"][data-id="'+lesson.id+'"]').click();
  for(let i=0;i<lesson.questions.length;i++){
   await page.locator('#lessonQuiz input[name="q'+i+'"][value="'+lesson.questions[i].answer+'"]').check();
  }
  await page.locator('#lessonQuiz button[type="submit"]').click();
  await page.locator('[data-action="close-lesson"]').first().click();
 }
 await page.getByText("Local practice milestone reached.",{exact:false}).waitFor({timeout:7000});
 await page.locator('[data-nav="intel"]').click();
 await page.locator("#signalForm #title").fill("Original music creator communities");
 await page.locator("#signalForm #sourceUrl").fill("https://example.org/original-public-article");
 await page.locator("#signalForm #observation").fill("A visible community is organizing around independently published original music and artwork.");
 await page.locator("#signalForm #risk").fill("Activity might be temporary and could be overstated by promotional posts.");
 await page.locator('#signalForm button[type="submit"]').click();
 await page.locator('[data-action="send-forge"]').click();
 await page.locator("h1").filter({hasText:"Don't chase it."}).waitFor({timeout:7000});
 await page.locator('[data-action="mark-preview"]').click();
 await page.locator('[data-action="pair-proposal"]').click();
 await page.locator("h1").filter({hasText:"Explore the pair."}).waitFor({timeout:7000});
 await page.locator("#pairingReviewForm").waitFor();
 await page.locator('#pairingReviewForm input[name="check0"]').check();
 await page.locator('#pairingReviewForm button[type="submit"]').click();
 assert.equal(await page.locator('#pairingReviewForm input[name="check0"]').isChecked(),true);
 assert.equal(await page.locator('[data-action="mint-token"],[data-action="connect-wallet"],[data-action="launch-pair"]').count(),0);
 await page.reload({waitUntil:"networkidle"});
 await page.getByText("RESEARCH CASE",{exact:false}).first().waitFor({timeout:7000});
 const current=await page.evaluate(()=>JSON.parse(localStorage.getItem("bodybagz.ecosystem.preview.v1")));
 assert.equal(Object.keys(current.lessons).length,6);
 assert.equal(current.practicePass.kind,"local-practice-only");
 assert.equal(current.signals.length,1);
 assert.equal(current.proposals.length,1);
 assert.equal(current.pairingReviews.length,1);
 assert.equal(errors.length,0,errors.join("\n"));
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 mobile.on("pageerror",e=>errors.push("Mobile: "+e.message));
 await mobile.goto("http://127.0.0.1:8000/",{waitUntil:"networkidle",timeout:30000});
 await mobile.locator("#menuToggle").click();
 await mobile.locator('[data-nav="intel"]').click();
 await mobile.locator("h1").filter({hasText:"Study the signals."}).waitFor({timeout:7000});
 assert.equal(errors.length,0,errors.join("\n"));
 console.log("BodyBagz desktop quizzes → sourced opportunity → Forge review → pairing checklist and mobile navigation PASSED.");
}catch(error){console.error("BodyBagz browser smoke failed:",error);process.exitCode=1;}
finally{await browser.close();}
