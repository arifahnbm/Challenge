import fs from 'fs';

const html = fs.readFileSync('dumped_kage.html', 'utf8');

const match = html.match(/<div class="sb-full"><img src="([^"]+)"/);
if (match) {
  const dataUrl = match[1];
  console.log('Found data URL, length:', dataUrl.length);
  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const outPath = 'C:\\Users\\DeLL\\.gemini\\antigravity\\brain\\08201f6d-05b2-4bc5-8f1e-2f4eef4c2429\\dumped_spread.webp';
  fs.writeFileSync(outPath, buffer);
  console.log('Saved dumped_spread.webp, bytes:', buffer.length);
} else {
  console.log('sb-full img NOT found in dumped_kage.html');
}
