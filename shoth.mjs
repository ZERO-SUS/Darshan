import puppeteer from 'puppeteer';
const OUT='C:/Users/Admin/AppData/Local/Temp/claude/C--Users-Admin/f0185bf1-527a-4df9-9ae2-29b7ef0d24c4/scratchpad';
const b=await puppeteer.launch({headless:'new',executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-sandbox','--disable-gpu','--ignore-gpu-blocklist','--enable-webgl']});
const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.setViewport({width:1440,height:900});
await p.goto('http://localhost:4173/projects',{waitUntil:'networkidle2',timeout:60000}); await new Promise(r=>setTimeout(r,3000));
await p.screenshot({path:OUT+'/h-projects.png'});
await p.goto('http://localhost:4173/contact',{waitUntil:'networkidle2',timeout:60000}); await new Promise(r=>setTimeout(r,3000));
await p.screenshot({path:OUT+'/h-contact.png'});
// mobile projects
await p.setViewport({width:390,height:844});
await p.goto('http://localhost:4173/projects',{waitUntil:'networkidle2',timeout:60000}); await new Promise(r=>setTimeout(r,3000));
await p.screenshot({path:OUT+'/h-projects-m.png'});
console.log('ERRORS:', errs.length?JSON.stringify([...new Set(errs)]):'none');
await b.close();
