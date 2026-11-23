import fs from 'fs';

let html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

// 1. Add .sb-book-hotspot CSS right after .sb-ext-link
const extLinkCss = `.sb-ext-link svg {
  width: 14px;
  height: 14px;
}`;
const hotspotCss = `.sb-ext-link svg {
  width: 14px;
  height: 14px;
}

.sb-book-hotspot {
  position: absolute;
  right: 5%;
  bottom: 8%;
  width: 42%;
  height: 8%;
  cursor: pointer;
  z-index: 50;
}`;
if (html.includes(extLinkCss) && !html.includes('.sb-book-hotspot')) {
  html = html.replace(extLinkCss, hotspotCss);
  console.log('Added .sb-book-hotspot to CSS');
}

// 2. Replace generateSpreadDataUrls and start of initAwardExperienceBook
const oldGen = `function generateSpreadDataUrls(spreads, onlyFirst = false) {
  if (typeof document === 'undefined') return [];
  const canvas = document.createElement('canvas');
  const list = [];
  
  // Render first spread immediately for instant initial display
  if (spreads.length > 0) {
    list.push({
      title: spreads[0].spreadTitle,
      subtitle: spreads[0].subtitle,
      url: drawSpreadOnCanvas(canvas, spreads[0], 0, spreads.length)
    });
  }

  // Render remaining spreads
  for (let i = 1; i < spreads.length; i++) {
    if (onlyFirst) {
      // Placeholder while deferred
      list.push({
        title: spreads[i].spreadTitle,
        subtitle: spreads[i].subtitle,
        url: list[0].url
      });
    } else {
      list.push({
        title: spreads[i].spreadTitle,
        subtitle: spreads[i].subtitle,
        url: drawSpreadOnCanvas(canvas, spreads[i], i, spreads.length)
      });
    }
  }

  if (onlyFirst && spreads.length > 1) {
    setTimeout(() => {
      const c = document.createElement('canvas');
      for (let i = 1; i < spreads.length; i++) {
        __bookPageDataList[i] = {
          title: spreads[i].spreadTitle,
          subtitle: spreads[i].subtitle,
          url: drawSpreadOnCanvas(c, spreads[i], i, spreads.length)
        };
      }
    }, 200);
  }

  return list;
}

let __awardBookInitialized = false;
let __bookPageDataList = [];
let __bookIdx = 0;
let __bookTurn = null;
let __bookStrips = [];
let __bookSpring = null;
let __bookRaf = null;
let __bookLastTime = 0;
let __bookView = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
let __bookViewActive = false;
let __bookLastZ = 1;
let __bookDrag = null;
let __bookLoupeOn = true;
let __bookLx = null;
let __bookLy = null;
let __bookLgrab = null;
let __bookLTarget = null;

function initAwardExperienceBook(spreadData) {
  const container = document.getElementById('awardBookContainer');
  if (!container) return;

  const dataList = (Array.isArray(spreadData) && spreadData.length) ? spreadData : DEFAULT_AWARDS_EXPERIENCES;
  const newKey = JSON.stringify(dataList.map(d => d.id || d.spreadTitle));
  if (__spreadsCacheKey === newKey && __bookPageDataList.length > 0) {
    return; // Already initialized with exact same data, prevent redundant work
  }
  __spreadsCacheKey = newKey;
  __bookPageDataList = generateSpreadDataUrls(dataList, true);
  if (!__bookPageDataList.length) return;`;

const newGen = `function generateSpreadDataUrls(items) {
  if (typeof document === 'undefined') return [];
  const canvas = document.createElement('canvas');
  const list = [];
  
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const loadedImg = __bookLoadedImages[i] || null;
    list.push({
      id: it.id,
      title: it.title,
      subtitle: it.subtitle,
      date: it.date,
      link: it.link,
      linkText: it.linkText,
      url: drawLandscapeSpreadOnCanvas(canvas, it, i, items.length, loadedImg)
    });
  }
  return list;
}

let __awardBookInitialized = false;
let __bookPageDataList = [];
let __bookIdx = 0;
let __bookTurn = null;
let __bookStrips = [];
let __bookSpring = null;
let __bookRaf = null;
let __bookLastTime = 0;
let __bookView = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
let __bookViewActive = false;
let __bookLastZ = 1;
let __bookDrag = null;
let __bookLoupeOn = true;
let __bookLx = null;
let __bookLy = null;
let __bookLgrab = null;
let __bookLTarget = null;

function initAwardExperienceBook(spreadData) {
  const container = document.getElementById('awardBookContainer');
  if (!container) return;

  const dataList = getSortedAwardsExperiences(spreadData);
  const newKey = JSON.stringify(dataList.map(d => d.id || d.title));
  if (__spreadsCacheKey === newKey && __bookPageDataList.length > 0) {
    return; // Already initialized with exact same data
  }
  __spreadsCacheKey = newKey;
  __bookPageDataList = generateSpreadDataUrls(dataList);
  if (!__bookPageDataList.length) return;`;

if (html.includes(oldGen)) {
  html = html.replace(oldGen, newGen);
  console.log('Replaced generateSpreadDataUrls and start of initAwardExperienceBook');
} else {
  console.warn('oldGen block not matched exactly!');
}

// 3. Update paint() to add hotspot and caption() to add .sb-ext-link
const oldPaintCaption = `    if (!__bookTurn) {
      const f = el('div', 'sb-full');
      const im = document.createElement('img');
      im.src = __bookPageDataList[__bookIdx].url;
      im.alt = __bookPageDataList[__bookIdx].title;
      im.draggable = false;
      f.appendChild(im);
      book.appendChild(f);
      sb3d.style.setProperty('--shade', '0');
    } else {`;

const newPaintCaption = `    if (!__bookTurn) {
      const f = el('div', 'sb-full');
      const im = document.createElement('img');
      im.src = __bookPageDataList[__bookIdx].url;
      im.alt = __bookPageDataList[__bookIdx].title;
      im.draggable = false;
      f.appendChild(im);
      book.appendChild(f);
      sb3d.style.setProperty('--shade', '0');

      if (__bookPageDataList[__bookIdx] && __bookPageDataList[__bookIdx].link) {
        const linkHotspot = el('a', 'sb-book-hotspot');
        linkHotspot.href = __bookPageDataList[__bookIdx].link;
        linkHotspot.target = '_blank';
        linkHotspot.rel = 'noopener noreferrer';
        linkHotspot.title = __bookPageDataList[__bookIdx].linkText || 'Buka Tautan';
        linkHotspot.setAttribute('data-cursor', 'pointer');
        book.appendChild(linkHotspot);
      }
    } else {`;

if (html.includes(oldPaintCaption)) {
  html = html.replace(oldPaintCaption, newPaintCaption);
  console.log('Updated paint() with hotspot');
}

const oldCaption = `  let capOut = null, capIn = null;
  function caption() {
    capBox.textContent = '';
    capOut = capIn = null;
    if (__bookTurn) {
      capOut = el('p', 'sb-caption live');
      capOut.textContent = __bookPageDataList[__bookTurn.from].title;
      capBox.appendChild(capOut);

      capIn = el('p', 'sb-caption live');
      capIn.textContent = __bookPageDataList[__bookTurn.to].title;
      capBox.appendChild(capIn);
      fadeCaption(__bookTurn.t);
    } else {
      const p = el('p', 'sb-caption');
      p.textContent = __bookPageDataList[__bookIdx].title;
      capBox.appendChild(p);
    }
  }`;

const newCaption = `  let capOut = null, capIn = null;
  function caption() {
    capBox.textContent = '';
    capOut = capIn = null;
    const curItem = __bookPageDataList[__bookIdx];
    if (!curItem) return;

    const track = el('div', 'sb-caption-track');
    if (__bookTurn) {
      capOut = el('p', 'sb-caption live');
      capOut.textContent = __bookPageDataList[__bookTurn.from].title;
      track.appendChild(capOut);

      capIn = el('p', 'sb-caption live');
      capIn.textContent = __bookPageDataList[__bookTurn.to].title;
      track.appendChild(capIn);
      fadeCaption(__bookTurn.t);
    } else {
      const p = el('p', 'sb-caption');
      p.textContent = curItem.title;
      track.appendChild(p);
    }
    capBox.appendChild(track);

    if (curItem.link) {
      const linkA = document.createElement('a');
      linkA.className = 'sb-ext-link';
      linkA.href = curItem.link;
      linkA.target = '_blank';
      linkA.rel = 'noopener noreferrer';
      linkA.setAttribute('data-cursor', 'pointer');
      linkA.innerHTML = '<span>' + (curItem.linkText || 'Lihat Artikel / Instagram') + '</span><svg viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 3h7v7M13 3L4 12\"/></svg>';
      capBox.appendChild(linkA);
    }
  }`;

if (html.includes(oldCaption)) {
  html = html.replace(oldCaption, newCaption);
  console.log('Updated caption() with interactive link button');
}

// 4. Add image preloading trigger inside initAwardExperienceBook
const oldAttach = `  if (!wrap || !stage || !sb3d || !book || !loupe || !zoomWrap || !zoomInner) return;`;
const newAttach = `  if (!wrap || !stage || !sb3d || !book || !loupe || !zoomWrap || !zoomInner) return;

  preloadBookImages(dataList, (idx, img) => {
    const c = document.createElement('canvas');
    __bookPageDataList[idx].url = drawLandscapeSpreadOnCanvas(c, dataList[idx], idx, dataList.length, img);
    if (__bookIdx === idx && !__bookTurn) {
      const im = book.querySelector('.sb-full img');
      if (im) im.src = __bookPageDataList[idx].url;
      syncZoomLayer();
    }
  });`;

if (html.includes(oldAttach)) {
  html = html.replace(oldAttach, newAttach);
  console.log('Added preloadBookImages trigger in initAwardExperienceBook');
}

fs.writeFileSync('public/landing-pages/kage.html', html, 'utf8');
console.log('Finished patching kage.html!');
