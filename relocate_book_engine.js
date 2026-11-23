import fs from 'fs';

let html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

const bookComment = '/* =====================================================================\n   Award & Experience Flippable Book & Draggable Loupe Engine';
const bookCodeStart = html.indexOf(bookComment);
const clothStartFn = 'function start() {\n    if (dead || running || !visible) return;';
const bookCodeEnd = html.indexOf(clothStartFn);

if (bookCodeStart === -1 || bookCodeEnd === -1) {
  throw new Error('Could not find book engine code boundaries');
}

const bookCode = html.substring(bookCodeStart, bookCodeEnd);
console.log('Found bookCode of length:', bookCode.length);

// Remove bookCode from createCloth
html = html.substring(0, bookCodeStart) + '\n  ' + html.substring(bookCodeEnd);
console.log('Removed bookCode from inside createCloth');

// Find insertion point in global scope right before window.addEventListener('message'
const messageListener = "window.addEventListener('message', (ev) => {";
const insertPoint = html.indexOf(messageListener);

if (insertPoint === -1) {
  throw new Error('Could not find messageListener in global scope');
}

// Insert bookCode into top-level scope
html = html.substring(0, insertPoint) + bookCode + '\n\n' + html.substring(insertPoint);
console.log('Inserted bookCode into top-level global scope before message listener');

// Also ensure .sb-3d in CSS has width: 100% and proper styling
html = html.replace('.sb-3d {', '.sb-3d {\n  width: 100%;');

fs.writeFileSync('public/landing-pages/kage.html', html, 'utf8');
console.log('Successfully updated kage.html with properly scoped book engine!');
