const newTab = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
const ws = new WebSocket(newTab.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);

let id = 1;
const callbacks = new Map();
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const curId = id++;
    callbacks.set(curId, { resolve, reject });
    ws.send(JSON.stringify({ id: curId, method, params }));
  });
}

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && callbacks.has(msg.id)) {
    const cb = callbacks.get(msg.id);
    callbacks.delete(msg.id);
    if (msg.error) cb.reject(msg.error);
    else cb.resolve(msg.result);
  }
};

await send('Page.enable');
await send('Runtime.enable');

console.log('Testing direct kage.html');
await send('Page.navigate', { url: 'http://localhost:3000/landing-pages/kage.html' });
await new Promise(r => setTimeout(r, 2000));

const res = await send('Runtime.evaluate', {
  expression: `(() => {
    const track = document.getElementById('cards-track');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    return {
      hasTrack: !!track,
      cardsCount: cards.length,
      cards: cards.map(c => ({
        id: c.getAttribute('data-project-id'),
        title: c.querySelector('.project-title')?.innerText.trim(),
        year: c.querySelector('.project-year')?.innerText.trim(),
        client: c.querySelector('.project-client')?.innerText.trim(),
        role: c.querySelector('.project-role-tag span')?.innerText.trim(),
        badges: Array.from(c.querySelectorAll('.project-badge')).map(b => b.innerText.trim()),
        tech: Array.from(c.querySelectorAll('.project-tech-tag')).map(t => t.innerText.trim()),
        links: Array.from(c.querySelectorAll('.project-link-btn')).map(a => ({ title: a.getAttribute('title'), href: a.href }))
      }))
    };
  })()`,
  returnByValue: true
});

console.log('Direct kage.html result:', JSON.stringify(res.result.value, null, 2));

console.log('Testing root http://localhost:3000/ with iframe');
await send('Page.navigate', { url: 'http://localhost:3000/' });
await new Promise(r => setTimeout(r, 4000));

const resRoot = await send('Runtime.evaluate', {
  expression: `(() => {
    const iframe = document.querySelector('iframe');
    let doc = document;
    try {
      if (iframe && iframe.contentDocument) doc = iframe.contentDocument;
    } catch(e) {}
    const track = doc.getElementById('cards-track');
    const cards = Array.from(doc.querySelectorAll('.project-card'));
    return {
      hasIframe: !!iframe,
      cardsCount: cards.length,
      cards: cards.map(c => ({
        id: c.getAttribute('data-project-id'),
        title: c.querySelector('.project-title')?.innerText.trim(),
        year: c.querySelector('.project-year')?.innerText.trim(),
        client: c.querySelector('.project-client')?.innerText.trim(),
        role: c.querySelector('.project-role-tag span')?.innerText.trim(),
        badges: Array.from(c.querySelectorAll('.project-badge')).map(b => b.innerText.trim()),
        tech: Array.from(c.querySelectorAll('.project-tech-tag')).map(t => t.innerText.trim()),
        links: Array.from(c.querySelectorAll('.project-link-btn')).map(a => ({ title: a.getAttribute('title'), href: a.href }))
      }))
    };
  })()`,
  returnByValue: true
});

console.log('Root with iframe result:', JSON.stringify(resRoot.result.value, null, 2));

await send('Target.closeTarget', { targetId: newTab.id });
ws.close();
process.exit(0);
