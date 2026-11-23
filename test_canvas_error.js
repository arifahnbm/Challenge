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

    await new Promise(r => setTimeout(r, 2000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          try {
            const list = window.__bookPageDataList;
            const bookEl = document.getElementById('sbBook');
            const img = bookEl ? bookEl.querySelector('img') : null;

            let testDrawError = null;
            try {
              const c = document.createElement('canvas');
              drawSpreadOnCanvas(c, DEFAULT_AWARDS_EXPERIENCES[0], 0, 3);
            } catch (err) {
              testDrawError = err.message + '\\n' + err.stack;
            }

            return {
              listLength: list ? list.length : 0,
              firstItemTitle: list && list[0] ? list[0].title : null,
              firstItemUrlLen: list && list[0] && list[0].url ? list[0].url.length : 0,
              firstItemUrlPrefix: list && list[0] && list[0].url ? list[0].url.substring(0, 100) : null,
              imgSrcLen: img && img.src ? img.src.length : 0,
              imgNaturalWidth: img ? img.naturalWidth : 0,
              imgNaturalHeight: img ? img.naturalHeight : 0,
              imgComplete: img ? img.complete : null,
              testDrawError
            };
          } catch (e) {
            return { fatal: e.message + '\\n' + e.stack };
          }
        })()
      `,
      returnByValue: true
    });

    console.log('Browser Eval Result:', JSON.stringify(evalRes.result.value, null, 2));
  } finally {
    edgeProcess.kill();
  }
}

main().catch(console.error);
