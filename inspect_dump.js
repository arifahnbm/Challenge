import fs from 'fs';

const html = fs.readFileSync('dumped_kage.html', 'utf8');
const preIndex = html.indexOf('id="pre"');
console.log('Preloader element in dumped DOM:');
console.log(html.substring(preIndex - 30, preIndex + 250));

const bodyMatch = html.match(/<body[^>]*>/);
console.log('\nBody tag:', bodyMatch ? bodyMatch[0] : 'not found');

const preCssIndex = html.indexOf('#pre{');
if (preCssIndex === -1) {
  const altIndex = html.indexOf('#pre {');
  console.log('\n#pre CSS:', html.substring(altIndex, altIndex + 300));
} else {
  console.log('\n#pre CSS:', html.substring(preCssIndex, preCssIndex + 300));
}
