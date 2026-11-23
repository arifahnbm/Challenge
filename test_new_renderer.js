import fs from 'fs';
import { drawLandscapeSpreadOnCanvas, safeRoundRect } from './src/components/bookSpreadRenderer.js';
import { sortedAwardsExperiences } from './src/data/awardsExperiences.js';

// Mock Canvas & Context
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
  clip() { this.ops.push(['clip']); }
  createRadialGradient() { return { addColorStop: () => {} }; }
  createLinearGradient() { return { addColorStop: () => {} }; }
  roundRect(x, y, w, h, r) { this.ops.push(['roundRect', x, y, w, h, r]); }
  drawImage(...args) { this.ops.push(['drawImage', ...args]); }
}

class MockCanvas {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.ctx = new MockContext();
  }
  getContext(type) { return this.ctx; }
  toDataURL(fmt) { return 'data:image/webp;base64,MOCK_LANDSCAPE_DATA'; }
}

try {
  console.log('Testing sortedAwardsExperiences count:', sortedAwardsExperiences.length);
  const canvas = new MockCanvas();
  const url = drawLandscapeSpreadOnCanvas(canvas, sortedAwardsExperiences[0], 0, sortedAwardsExperiences.length, null);
  console.log('Result URL:', url);
  console.log('Canvas Width:', canvas.width, 'Height:', canvas.height);
  console.log('Total drawing operations:', canvas.ctx.ops.length);
  console.log('First 5 items sorted:');
  sortedAwardsExperiences.forEach((it, i) => {
    console.log(` ${i + 1}. [${it.category}] ${it.date} (${it.sortDate}) -> ${it.title}`);
  });
} catch (e) {
  console.error('Error during test:', e);
}
