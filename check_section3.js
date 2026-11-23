import fs from 'fs';

const html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

const sIdx = html.indexOf('id="lessons"');
const eIdx = html.indexOf('</section>', sIdx);

console.log('Section lessons HTML:\n', html.substring(sIdx, eIdx + 10));
