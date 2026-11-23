import { spawn } from 'child_process';
import http from 'http';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = 'C:\\Users\\DeLL\\AppData\\Local\\Temp\\edge_debug_profile';

const edgeProcess = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu',
  '--window-size=1400,1000',
  'http://localhost:3000/landing-pages/kage.html'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9222/json');
    const pages = await res.json();
    console.log('Pages found:', pages);
  } catch (err) {
    console.error('Fetch error:', err.message);
  } finally {
    edgeProcess.kill();
  }
}, 3000);
