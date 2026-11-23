import fs from 'fs';

const html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

// Check Lenis or Locomotive or custom scroll
console.log('Has Lenis?', html.includes('lenis') || html.includes('Lenis'));
console.log('Has ScrollTrigger?', html.includes('ScrollTrigger'));
console.log('Has window.scrollTo?', html.includes('scrollTo'));

// Search where hash links or #lessons are handled
const hashMatches = html.match(/hash|location\.hash|addEventListener\(['"]hashchange/g);
console.log('Hash mentions:', hashMatches);

// Search for scroll event listener
const scrollListener = html.match(/window\.addEventListener\(['"]scroll['"][^)]+\)/g);
console.log('Scroll listeners:', scrollListener);
