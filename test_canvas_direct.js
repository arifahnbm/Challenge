import fs from 'fs';

const html = fs.readFileSync('public/landing-pages/kage.html', 'utf8');

// Extract the book code section from kage.html
const startMarker = 'const DEFAULT_AWARDS_EXPERIENCES =';
const endMarker = 'function initAwardExperienceBook(';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

const code = html.substring(startIdx, endIdx);
console.log('Extracted code length:', code.length);

// Mock canvas and 2d context
class MockContext {
  constructor() {
    this.fillStyle = '';
    this.strokeStyle = '';
    this.lineWidth = 1;
    this.font = '';
    this.textAlign = '';
    this.textBaseline = '';
    this.ops = [];
  }
  fillRect(...args) { this.ops.push(['fillRect', ...args]); }
  strokeRect(...args) { this.ops.push(['strokeRect', ...args]); }
  clearRect(...args) { this.ops.push(['clearRect', ...args]); }
  fillText(text, x, y) { this.ops.push(['fillText', text, x, y]); }
  measureText(text) { return { width: (text || '').length * 8 }; }
  beginPath() { this.ops.push(['beginPath']); }
  moveTo(x, y) { this.ops.push(['moveTo', x, y]); }
  lineTo(x, y) { this.ops.push(['lineTo', x, y]); }
  quadraticCurveTo(...args) { this.ops.push(['quadraticCurveTo', ...args]); }
  arc(...args) { this.ops.push(['arc', ...args]); }
  fill() { this.ops.push(['fill']); }
  stroke() { this.ops.push(['stroke']); }
  save() { this.ops.push(['save']); }
  restore() { this.ops.push(['restore']); }
  createRadialGradient() {
    return { addColorStop: () => {} };
  }
  createLinearGradient() {
    return { addColorStop: () => {} };
  }
  roundRect(x, y, w, h, r) {
    this.ops.push(['roundRect', x, y, w, h, r]);
  }
}

class MockCanvas {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.ctx = new MockContext();
  }
  getContext(type) { return this.ctx; }
  toDataURL(fmt) { return 'data:image/webp;base64,MOCK_DATA'; }
}

try {
  const runner = new Function('MockCanvas', `
    ${code}
    const canvas = new MockCanvas();
    const url = drawSpreadOnCanvas(canvas, DEFAULT_AWARDS_EXPERIENCES[0], 0, 3);
    return { url, opsCount: canvas.ctx.ops.length, ops: canvas.ctx.ops.slice(0, 30) };
  `);
  const result = runner(MockCanvas);
  console.log('Success! Ops count:', result.opsCount);
  console.log('Sample ops:', result.ops);
} catch (err) {
  console.error('Execution error:', err.message, err.stack);
}
