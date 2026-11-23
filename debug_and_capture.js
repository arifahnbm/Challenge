import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = 'C:\\Users\\DeLL\\AppData\\Local\\Temp\\edge_debug_profile_2';
const artifactOut = 'C:\\Users\\DeLL\\.gemini\\antigravity\\brain\\08201f6d-05b2-4bc5-8f1e-2f4eef4c2429\\book_live.png';

async function main() {
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--window-size=1440,1100',
    'http://localhost:3000/landing-pages/kage.html'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch('http://127.0.0.1:9223/json');
    const pages = await res.json();
    const page = pages.find(p => p.type === 'page' && p.url.includes('kage.html'));
    if (!page) {
      console.error('Kage page not found in CDP targets:', pages);
      return;
    }

    console.log('Connecting to page WebSocket:', page.webSocketDebuggerUrl);
    const ws = new WebSocket(page.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description).join(' ');
        console.log(`[BROWSER ${msg.params.type}]:`, text);
      } else if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    const send = (method, params = {}) => new Promise((resolve) => {
      const curId = id++;
      callbacks.set(curId, resolve);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

    await new Promise(r => { ws.onopen = r; });
    await send('Runtime.enable');
    await send('Page.enable');

    console.log('Waiting for preloader done and #sbBook img to load...');
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      const checkRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const pre = document.getElementById('pre');
            const img = document.querySelector('#sbBook img');
            const preDone = pre && pre.classList.contains('done');
            const hasImg = !!img && img.naturalWidth > 0;
            return { preDone, hasImg, srcLen: img ? (img.src || '').length : 0 };
          })()
        `,
        returnByValue: true
      });
      const val = checkRes.result?.value;
      if (val && val.preDone && val.hasImg) {
        console.log('Book is ready! Image natural width > 0, src length:', val.srcLen);
        ready = true;
        break;
      }
      await new Promise(r => setTimeout(r, 400));
    }

    if (!ready) {
      console.warn('Timed out waiting for #sbBook img! Will attempt scroll and capture anyway.');
    }

    // Scroll to #lessons
    console.log('Scrolling to #lessons...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sec = document.getElementById('lessons');
          if (sec) sec.scrollIntoView({ behavior: 'instant' });
        })()
      `
    });

    await new Promise(r => setTimeout(r, 800));

    // Capture screenshot
    console.log('Capturing screenshot of #lessons with book...');
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(ss.result.data, 'base64');
    fs.writeFileSync(artifactOut, buffer);
    console.log(`Screenshot saved to ${artifactOut} (${buffer.length} bytes)`);

  } finally {
    edgeProcess.kill();
  }
}

main().catch(console.error);
