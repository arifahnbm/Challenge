const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

  const port = 9333;
  const browser = spawn(browserPath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'about:blank'
  ]);

  let versionData = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      versionData = await new Promise((res, rej) => {
        http.get(`http://127.0.0.1:${port}/json/version`, resp => {
          let data = '';
          resp.on('data', chunk => data += chunk);
          resp.on('end', () => res(JSON.parse(data)));
        }).on('error', rej);
      });
      if (versionData) break;
    } catch {}
  }

  if (!versionData) {
    console.error('Failed to connect to browser CDP');
    browser.kill();
    return;
  }

  function wrapWs(wsUrl) {
    const ws = new WebSocket(wsUrl);
    let msgId = 1;
    const pending = new Map();
    ws.addEventListener('message', ev => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      }
    });

    const ready = new Promise(res => ws.addEventListener('open', res));
    const send = async (method, params = {}) => {
      await ready;
      return new Promise(resolve => {
        const curId = msgId++;
        pending.set(curId, resolve);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    };

    return { ws, ready, send };
  }

  const rootCdp = wrapWs(versionData.webSocketDebuggerUrl);
  await rootCdp.ready;

  const target = await rootCdp.send('Target.createTarget', { url: 'http://127.0.0.1:5173/' });
  const pageWsUrl = `ws://127.0.0.1:${port}/devtools/page/${target.result.targetId}`;
  const pageCdp = wrapWs(pageWsUrl);
  await pageCdp.ready;

  await pageCdp.send('Page.enable');
  await pageCdp.send('Runtime.enable');

  console.log('Navigating to http://127.0.0.1:5173/...');
  await pageCdp.send('Page.navigate', { url: 'http://127.0.0.1:5173/' });

  // Wait 4.5 seconds for preloader and initial reveals
  await new Promise(r => setTimeout(r, 4500));

  // Check state inside the iframe
  const evalResult = await pageCdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        const iframe = document.querySelector('iframe');
        if (!iframe) return { error: 'No iframe found' };
        const doc = iframe.contentDocument;
        if (!doc) return { error: 'Cannot access iframe contentDocument' };
        const hero = doc.getElementById('hero');
        const role = doc.getElementById('role-rotator');
        const greeting = doc.getElementById('greeting-rotator');
        const cue = doc.querySelector('.hero-cue');
        const pre = doc.getElementById('pre');
        return {
          scrollY: iframe.contentWindow.scrollY,
          preClass: pre ? pre.className : 'null',
          heroVisible: !!hero,
          roleText: role ? role.textContent : 'null',
          roleStyle: role ? iframe.contentWindow.getComputedStyle(role).opacity : 'null',
          cueStyle: cue ? iframe.contentWindow.getComputedStyle(cue).opacity : 'null',
          cueDisplay: cue ? iframe.contentWindow.getComputedStyle(cue).display : 'null',
          greetingText: greeting ? greeting.textContent : 'null',
          rvCount: doc.querySelectorAll('.rv-in').length,
          totalRv: doc.querySelectorAll('[data-rv], .mask-line').length
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Evaluated State at 4.5s:', JSON.stringify(evalResult.result ? evalResult.result.value : evalResult, null, 2));

  // Take screenshot
  const shot = await pageCdp.send('Page.captureScreenshot', { format: 'png' });
  if (shot.result && shot.result.data) {
    fs.writeFileSync('D:\\Magang\\Inagata\\Challenge\\test-role-rotator.png', Buffer.from(shot.result.data, 'base64'));
    console.log('Screenshot saved to test-role-rotator.png');
  }

  // Wait 3.5 more seconds to verify rotation
  await new Promise(r => setTimeout(r, 3500));
  const evalResult2 = await pageCdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        const iframe = document.querySelector('iframe');
        const doc = iframe.contentDocument;
        const role = doc.getElementById('role-rotator');
        const greeting = doc.getElementById('greeting-rotator');
        return {
          roleText: role ? role.textContent : 'null',
          greetingText: greeting ? greeting.textContent : 'null'
        };
      })()
    `,
    returnByValue: true
  });
  console.log('State after 3.5s:', JSON.stringify(evalResult2.result ? evalResult2.result.value : evalResult2, null, 2));

  pageCdp.ws.close();
  rootCdp.ws.close();
  browser.kill();
}

main().catch(console.error);
