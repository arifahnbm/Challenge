import fs from 'fs';

let html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

const oldCode = `setTimeout(() => {
    try {
      initAwardExperienceBook(DEFAULT_AWARDS_EXPERIENCES);
    } catch (e) {
      console.error('initAwardExperienceBook error:', e);
    }
  }, 40);`;

const newCode = `setTimeout(() => {
    try {
      console.log('[BOOK DEBUG] Calling initAwardExperienceBook');
      initAwardExperienceBook(DEFAULT_AWARDS_EXPERIENCES);
      console.log('[BOOK DEBUG] initAwardExperienceBook finished! book children count:', document.getElementById('sbBook')?.children?.length);
    } catch (e) {
      console.error('[BOOK DEBUG] initAwardExperienceBook error:', e.message, e.stack);
      window.__bookError = e.message + '\\n' + e.stack;
      const b = document.getElementById('sbBook');
      if (b) b.innerHTML = '<div style="color:red;padding:20px;font-size:16px;">Error: ' + e.message + '<pre>' + e.stack + '</pre></div>';
    }
  }, 40);`;

if (html.includes(oldCode)) {
  html = html.replace(oldCode, newCode);
  fs.writeFileSync('public/landing-pages/kage.html', html, 'utf8');
  console.log('Added [BOOK DEBUG] error catching to kage.html');
} else {
  console.log('oldCode not found in kage.html!');
}
