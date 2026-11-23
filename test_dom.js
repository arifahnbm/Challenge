import { execSync } from 'child_process';
import fs from 'fs';

try {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const output = execSync(`"${edgePath}" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom "http://localhost:3000/landing-pages/kage.html"`, {
    maxBuffer: 50 * 1024 * 1024,
    encoding: 'utf8'
  });
  console.log('Dumped DOM length:', output.length);
  fs.writeFileSync('dumped_kage.html', output, 'utf8');

  // Check awardBookContainer
  const hasBook = output.includes('id="awardBookContainer"');
  console.log('Has awardBookContainer in dumped DOM:', hasBook);

  // Check what is inside sbBook in dumped DOM
  const sbBookStart = output.indexOf('id="sbBook"');
  if (sbBookStart !== -1) {
    console.log('sbBook in dumped DOM:\n', output.substring(sbBookStart, sbBookStart + 400));
  } else {
    console.log('id="sbBook" NOT found in dumped DOM!');
  }

  // Check captions in dumped DOM
  const capStart = output.indexOf('id="sbCaptions"');
  if (capStart !== -1) {
    console.log('sbCaptions in dumped DOM:\n', output.substring(capStart, capStart + 300));
  }
} catch (err) {
  console.error('Exec error:', err.message);
}
