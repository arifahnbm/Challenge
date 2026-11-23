import { spawn } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = 'C:\\Users\\DeLL\\AppData\\Local\\Temp\\edge_debug_check';

async function main() {
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    'http://localhost:3000/landing-pages/kage.html'
  ]);

  try {
    await new Promise(r => setTimeout(r, 2000));
    const res = await fetch('http://127.0.0.1:9225/json');
    const pages = await res.json();
    const page = pages.find(p => p.type === 'page' && p.url.includes('kage.html'));
    if (!page) {
      console.error('Page not found');
      return;
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description).join(' ');
        console.log(`[CONSOLE ${msg.params.type}]:`, text);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[EXCEPTION]:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
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

    console.log('Waiting 7 seconds for initialization...');
    await new Promise(r => setTimeout(r, 7000));

    const check = await send('Runtime.evaluate', {
      expression: `
        (() => {
          try {
            const container = document.getElementById('awardBookContainer');
            const book = document.getElementById('sbBook');
            const img = book ? book.querySelector('img') : null;
            const full = book ? book.querySelector('.sb-full') : null;
            const extLink = document.querySelector('.sb-ext-link');

            return {
              containerExists: !!container,
              bookExists: !!book,
              bookChildrenCount: book ? book.children.length : 0,
              bookHtmlSnippet: book ? book.innerHTML.substring(0, 400) : null,
              imgSrcLength: img && img.src ? img.src.length : 0,
              imgSrcPrefix: img && img.src ? img.src.substring(0, 80) : null,
              imgComplete: img ? img.complete : null,
              imgNaturalWidth: img ? img.naturalWidth : 0,
              imgNaturalHeight: img ? img.naturalHeight : 0,
              hasExtLink: !!extLink,
              extLinkText: extLink ? extLink.textContent : null,
              extLinkHref: extLink ? extLink.href : null,
              pageDataCount: typeof __bookPageDataList !== 'undefined' ? __bookPageDataList.length : 'undefined'
            };
          } catch (e) {
            return { evalError: e.message + '\\n' + e.stack };
          }
        })()
      `,
      returnByValue: true
    });

    console.log('Book Check Raw:', JSON.stringify(check, null, 2));
  } finally {
    edgeProcess.kill();
  }
}

main().catch(console.error);
