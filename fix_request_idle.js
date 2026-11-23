import fs from 'fs';

let html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

// 1. Fix the requestIdleCallback error in generateSpreadDataUrls
const badDeferCode = `if (onlyFirst && spreads.length > 1) {
    // Defer remaining spreads to background after initial render
    const deferTimer = (window.requestIdleCallback || setTimeout);
    deferTimer(() => {
      const c = document.createElement('canvas');
      for (let i = 1; i < spreads.length; i++) {
        __bookPageDataList[i] = {
          title: spreads[i].spreadTitle,
          subtitle: spreads[i].subtitle,
          url: drawSpreadOnCanvas(c, spreads[i], i, spreads.length)
        };
      }
    }, 200);
  }`;

const fixedDeferCode = `if (onlyFirst && spreads.length > 1) {
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
  }`;

if (html.includes(badDeferCode)) {
  html = html.replace(badDeferCode, fixedDeferCode);
  console.log('Fixed requestIdleCallback bug in generateSpreadDataUrls');
} else {
  console.log('badDeferCode not found exactly, searching via regex...');
  html = html.replace(/const deferTimer = \(window\.requestIdleCallback \|\| setTimeout\);\s*deferTimer\(/, 'setTimeout(');
}

// 2. Clean debug code in start()
const debugCodeStart = `setTimeout(() => {
    try {
      console.log('[BOOK DEBUG] Calling initAwardExperienceBook');`;

if (html.includes(debugCodeStart)) {
  const debugCodeEnd = `}, 40);`;
  const idxStart = html.indexOf(debugCodeStart);
  const idxEnd = html.indexOf(debugCodeEnd, idxStart) + debugCodeEnd.length;
  const cleanCode = `setTimeout(() => {
    try {
      initAwardExperienceBook(DEFAULT_AWARDS_EXPERIENCES);
    } catch (e) {
      console.error('initAwardExperienceBook error:', e);
    }
  }, 40);`;
  html = html.substring(0, idxStart) + cleanCode + html.substring(idxEnd);
  console.log('Cleaned debug code in start()');
}

fs.writeFileSync('public/landing-pages/kage.html', html, 'utf8');
console.log('Saved kage.html');
