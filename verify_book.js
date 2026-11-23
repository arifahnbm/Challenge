import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempDir = 'C:\\Users\\DeLL\\AppData\\Local\\Temp';
const tempOut = path.join(tempDir, 'book_screenshot.png');
const artifactOut = 'C:\\Users\\DeLL\\.gemini\\antigravity\\brain\\08201f6d-05b2-4bc5-8f1e-2f4eef4c2429\\book_screenshot.png';

try {
  if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
  console.log('Taking screenshot with msedge...');
  execSync(`"${edgePath}" --headless=new --disable-gpu --window-size=1440,1000 --virtual-time-budget=6000 --screenshot="${tempOut}" "http://localhost:3000/landing-pages/kage.html#lessons"`, {
    stdio: 'inherit'
  });
  if (fs.existsSync(tempOut)) {
    fs.copyFileSync(tempOut, artifactOut);
    console.log('Screenshot successfully copied to artifact directory:', artifactOut);
  } else {
    console.log('Temp screenshot was not created.');
  }
} catch (e) {
  console.error('Error:', e.message);
}
