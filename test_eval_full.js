import { spawn } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = 'C:\\Users\\DeLL\\AppData\\Local\\Temp\\edge_debug_profile';

async function main() {
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    'http://localhost:3000/landing-pages/kage.html'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch('http://127.0.0.1:9222/json');
    const pages = await res.json();
    const page = pages.find(p => p.type === 'page' && p.url.includes('kage.html'));
    if (!page) {
      console.error('Kage page not found');
      return;
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
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

    await new Promise(r => setTimeout(r, 2500));

    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            hasList: typeof window.__bookPageDataList !== 'undefined',
            listVal: window.__bookPageDataList ? window.__bookPageDataList.length : 'none',
            hasExperiences: typeof DEFAULT_AWARDS_EXPERIENCES !== 'undefined',
            hasDrawSpread: typeof drawSpreadOnCanvas !== 'undefined',
            hasInit: typeof initAwardExperienceBook !== 'undefined'
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Eval Full:', JSON.stringify(evalRes, null, 2));
  } finally {
    edgeProcess.kill();
  }
}

main().catch(console.error);
