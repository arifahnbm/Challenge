/**
 * Canvas Spread Generator for ThreeUI Flippable Landscape Book
 * Dynamically draws 1800x1000 landscape 2-page sketchbook spreads
 * with curved corners, authentic Japanese Washi aesthetics, image media on the left,
 * structured details on the right, and interactive article/Instagram links.
 */

export function safeRoundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === 'function') {
    try {
      ctx.roundRect(x, y, w, h, r);
      return;
    } catch (e) {}
  }
  const rad = typeof r === 'number' ? r : (Array.isArray(r) ? (r[0] || 0) : 0);
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
}

export function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 6) {
  if (!text) return y;
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let linesDrawn = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
      linesDrawn++;
      if (linesDrawn >= maxLines - 1 && n < words.length - 1) {
        ctx.fillText(line.trim() + '...', x, currentY);
        return currentY + lineHeight;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

export function drawHankoSeal(ctx, x, y, size, text) {
  ctx.save();
  ctx.strokeStyle = '#c23b22';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(194, 59, 34, 0.08)';

  const r = 6;
  ctx.beginPath();
  safeRoundRect(ctx, x, y, size, size, r);
  ctx.stroke();
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.beginPath();
  safeRoundRect(ctx, x + 3.5, y + 3.5, size - 7, size - 7, r - 2);
  ctx.stroke();

  ctx.fillStyle = '#b83a2c';
  ctx.font = `bold ${Math.round(size * 0.44)}px 'Shippori Mincho', 'NotoJP', serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + size / 2, y + size / 2 + 1);
  ctx.restore();
}

export function drawPillBadge(ctx, x, y, text, isAward = true) {
  ctx.save();
  ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const metrics = ctx.measureText(text);
  const padX = 12;
  const h = 24;
  const w = metrics.width + padX * 2;

  ctx.fillStyle = isAward ? 'rgba(194, 59, 34, 0.10)' : 'rgba(44, 62, 80, 0.08)';
  ctx.strokeStyle = isAward ? 'rgba(194, 59, 34, 0.40)' : 'rgba(44, 62, 80, 0.30)';
  ctx.lineWidth = 1.2;

  ctx.beginPath();
  safeRoundRect(ctx, x, y, w, h, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = isAward ? '#b83a2c' : '#2c3e50';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + padX, y + h / 2);
  ctx.restore();
  return w;
}

export function drawPlaque(ctx, x, y, w, h, quote) {
  if (!quote) return;
  ctx.save();
  ctx.fillStyle = 'rgba(247, 243, 233, 0.85)';
  ctx.beginPath();
  safeRoundRect(ctx, x, y, w, h, 8);
  ctx.fill();

  ctx.strokeStyle = 'rgba(180, 160, 130, 0.45)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  safeRoundRect(ctx, x + 4, y + 4, w - 8, h - 8, 6);
  ctx.stroke();

  const corners = [
    [x + 4, y + 4],
    [x + w - 4, y + 4],
    [x + 4, y + h - 4],
    [x + w - 4, y + h - 4]
  ];
  ctx.fillStyle = '#b83a2c';
  corners.forEach(([cx, cy]) => {
    ctx.fillRect(cx - 2, cy - 2, 4, 4);
  });

  ctx.fillStyle = '#6b584c';
  ctx.font = "italic 15px 'Cormorant Garamond', Georgia, serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(quote, x + w / 2, y + h / 2);
  ctx.restore();
}

/**
 * Draw Left Page: Visual Media, Hanko Seal, Image Caption, and Date
 */
export function drawLeftPage(ctx, item, pageNum, loadedImg = null) {
  const startX = 70;
  const width = 740;
  let curY = 85;

  ctx.save();

  // 1. Running Header & Hanko Seal
  const headerCat = item.category === 'award' ? 'HONORS & ACCOLADES' : 'EXPERIENCE ARCHIVE';
  ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = '#8c7d75';
  ctx.textAlign = 'left';
  ctx.fillText(`PLATE ${String(pageNum).padStart(2, '0')}  /  ${headerCat}`, startX, curY);

  drawHankoSeal(ctx, startX + width - 60, curY - 20, 52, item.sealJp || '栄冠');

  curY += 45;

  // 2. Date Badge on Left
  if (item.date) {
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = '#b83a2c';
    ctx.textAlign = 'left';
    ctx.fillText(`📅  ${item.date}`, startX, curY);
  }

  curY += 25;

  // 3. Image Photo Frame (Landscape 16:10 inside the left page)
  const imgFrameX = startX;
  const imgFrameY = curY;
  const imgFrameW = width;
  const imgFrameH = 600;

  // Outer photo mat background with soft shadow
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.strokeStyle = 'rgba(200, 185, 160, 0.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  safeRoundRect(ctx, imgFrameX, imgFrameY, imgFrameW, imgFrameH, 12);
  ctx.fill();
  ctx.stroke();

  // Render Image inside frame if loaded
  const innerPad = 14;
  const innerX = imgFrameX + innerPad;
  const innerY = imgFrameY + innerPad;
  const innerW = imgFrameW - innerPad * 2;
  const innerH = imgFrameH - innerPad * 2 - 36; // leave space for caption bar

  if (loadedImg && loadedImg.complete && loadedImg.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    safeRoundRect(ctx, innerX, innerY, innerW, innerH, 8);
    ctx.clip();

    // Scale to fit cover / contain
    const imgRatio = loadedImg.naturalWidth / loadedImg.naturalHeight;
    const boxRatio = innerW / innerH;
    let dw, dh, dx, dy;
    if (imgRatio > boxRatio) {
      dh = innerH;
      dw = innerH * imgRatio;
      dx = innerX + (innerW - dw) / 2;
      dy = innerY;
    } else {
      dw = innerW;
      dh = innerW / imgRatio;
      dx = innerX;
      dy = innerY + (innerH - dh) / 2;
    }
    ctx.drawImage(loadedImg, dx, dy, dw, dh);
    ctx.restore();
  } else {
    // Stylized paper placeholder
    ctx.save();
    ctx.fillStyle = 'rgba(242, 236, 222, 0.65)';
    ctx.beginPath();
    safeRoundRect(ctx, innerX, innerY, innerW, innerH, 8);
    ctx.fill();

    ctx.strokeStyle = 'rgba(194, 59, 34, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#a69588';
    ctx.font = "italic 16px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = 'center';
    ctx.fillText(item.title, innerX + innerW / 2, innerY + innerH / 2 - 10);
    ctx.font = "12px -apple-system, sans-serif";
    ctx.fillText("Visual Artifact & Mockup", innerX + innerW / 2, innerY + innerH / 2 + 18);
    ctx.restore();
  }

  // Inner border around photo
  ctx.strokeStyle = 'rgba(160, 140, 115, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  safeRoundRect(ctx, innerX, innerY, innerW, innerH, 8);
  ctx.stroke();

  // Caption below the image
  ctx.fillStyle = '#4a3d35';
  ctx.font = "italic 15px 'Cormorant Garamond', Georgia, serif";
  ctx.textAlign = 'center';
  ctx.fillText(item.imageCaption || item.subtitle, imgFrameX + imgFrameW / 2, imgFrameY + imgFrameH - 18);

  ctx.restore();

  // 4. Page Footer
  ctx.font = "13px 'Cinzel', serif";
  ctx.fillStyle = '#9e8f86';
  ctx.textAlign = 'center';
  ctx.fillText(`—  ${pageNum}  —`, startX + width / 2, 940);

  ctx.restore();
}

/**
 * Draw Right Page: Structured Information, Badges, Narrative, Highlights, and Interactive Link Button
 */
export function drawRightPage(ctx, item, pageNum) {
  const startX = 990;
  const width = 740;
  let curY = 85;

  ctx.save();

  // 1. Running Header
  const headerCat = item.category === 'award' ? 'HONORS & RECOGNITION' : 'PRACTICAL EXPERIENCE';
  ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = '#8c7d75';
  ctx.textAlign = 'left';
  ctx.fillText(`PLATE ${String(pageNum).padStart(2, '0')}  /  ${headerCat}`, startX, curY);

  curY += 40;

  // 2. Distinction Badge & Date Tag
  if (item.badge) {
    drawPillBadge(ctx, startX, curY, item.badge, item.category === 'award');
  }

  if (item.date) {
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = '#7a6a61';
    ctx.textAlign = 'right';
    ctx.fillText(item.date, startX + width - 10, curY + 16);
  }

  curY += 48;

  // 3. Main Title
  ctx.font = "bold 28px 'Cinzel', 'Shippori Mincho', 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = '#1c1715';
  ctx.textAlign = 'left';
  curY = drawWrappedText(ctx, item.title, startX, curY, width, 36, 2);

  curY += 10;

  // 4. Organization & Subtitle
  ctx.font = "600 15px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = '#b83a2c';
  ctx.fillText(item.organization, startX, curY);
  curY += 22;

  if (item.subtitle && item.subtitle !== item.organization) {
    ctx.font = "italic 15px 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = '#5c4e46';
    ctx.fillText(item.subtitle, startX, curY);
    curY += 28;
  } else {
    curY += 10;
  }

  // 5. Quote Plaque
  if (item.quote) {
    drawPlaque(ctx, startX, curY, width, 48, item.quote);
    curY += 66;
  }

  // 6. Narrative Description
  ctx.font = "16px/1.65 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = '#2c2420';
  curY = drawWrappedText(ctx, item.description, startX, curY, width, 26, 5);

  curY += 24;

  // 7. Highlights / Skill Tags
  ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = '#7a6a61';
  ctx.fillText('KOMPETENSI UTAMA & HIGHLIGHTS', startX, curY);
  curY += 16;

  if (Array.isArray(item.highlights)) {
    let tagX = startX;
    item.highlights.forEach(tag => {
      ctx.font = "500 12px -apple-system, BlinkMacSystemFont, sans-serif";
      const tm = ctx.measureText(tag);
      const tw = tm.width + 16;
      const th = 22;

      if (tagX + tw > startX + width) {
        tagX = startX;
        curY += 28;
      }

      ctx.fillStyle = 'rgba(235, 227, 214, 0.7)';
      ctx.strokeStyle = 'rgba(180, 160, 130, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      safeRoundRect(ctx, tagX, curY, tw, th, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#3a302a';
      ctx.fillText(tag, tagX + 8, curY + 15);

      tagX += tw + 8;
    });
  }

  curY += 46;

  // 8. Interactive Action Link Button (Drawn on canvas)
  if (item.link) {
    const btnText = item.linkText || "Lihat Artikel / Instagram ↗";
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, sans-serif";
    const btnW = ctx.measureText(btnText).width + 36;
    const btnH = 34;

    ctx.save();
    ctx.fillStyle = 'rgba(194, 59, 34, 0.9)';
    ctx.strokeStyle = '#c23b22';
    ctx.lineWidth = 1;
    ctx.beginPath();
    safeRoundRect(ctx, startX, curY, btnW, btnH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(btnText, startX + 18, curY + btnH / 2);
    ctx.restore();
  }

  // 9. Page Footer
  ctx.font = "13px 'Cinzel', serif";
  ctx.fillStyle = '#9e8f86';
  ctx.textAlign = 'center';
  ctx.fillText(`—  ${pageNum}  —`, startX + width / 2, 940);

  ctx.restore();
}

/**
 * Draw Complete 1800x1000 Landscape Spread on Canvas
 */
export function drawLandscapeSpreadOnCanvas(canvas, item, spreadIndex, totalSpreads, loadedImg = null) {
  const ctx = canvas.getContext('2d');
  const W = 1800;
  const H = 1000;
  canvas.width = W;
  canvas.height = H;

  ctx.save();

  // Smooth curved outer corners for the book
  ctx.beginPath();
  safeRoundRect(ctx, 0, 0, W, H, 20);
  ctx.clip();

  // 1. Background Antique Washi Paper Tone
  ctx.fillStyle = '#fcf8f0';
  ctx.fillRect(0, 0, W, H);

  // Subtle radial gradient
  const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 950);
  bgGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  bgGrad.addColorStop(0.7, 'rgba(250, 244, 232, 0.25)');
  bgGrad.addColorStop(1, 'rgba(224, 214, 194, 0.5)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Deckled Margins
  ctx.strokeStyle = 'rgba(190, 175, 150, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  // 3. Center Spine & Gutter Shadow
  const gutterX = W / 2; // 900
  const spineGrad = ctx.createLinearGradient(gutterX - 80, 0, gutterX + 80, 0);
  spineGrad.addColorStop(0, 'rgba(45, 30, 15, 0)');
  spineGrad.addColorStop(0.35, 'rgba(45, 30, 15, 0.08)');
  spineGrad.addColorStop(0.48, 'rgba(30, 20, 10, 0.22)');
  spineGrad.addColorStop(0.5, 'rgba(20, 12, 6, 0.40)'); // Deep crease fold
  spineGrad.addColorStop(0.52, 'rgba(30, 20, 10, 0.22)');
  spineGrad.addColorStop(0.65, 'rgba(45, 30, 15, 0.08)');
  spineGrad.addColorStop(1, 'rgba(45, 30, 15, 0)');
  ctx.fillStyle = spineGrad;
  ctx.fillRect(gutterX - 80, 30, 160, H - 60);

  // Japanese bookbinding thread stitches
  const stitchYs = [120, 220, 320, 420, 520, 620, 720, 820, 900];
  ctx.strokeStyle = '#8a6d4b';
  ctx.lineWidth = 2.5;
  stitchYs.forEach(sy => {
    ctx.beginPath();
    ctx.moveTo(gutterX - 4, sy - 7);
    ctx.lineTo(gutterX + 4, sy + 7);
    ctx.stroke();

    ctx.fillStyle = '#3a2b1d';
    ctx.beginPath();
    ctx.arc(gutterX - 4, sy - 7, 2, 0, Math.PI * 2);
    ctx.arc(gutterX + 4, sy + 7, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4. Draw Left Page (Image & Media)
  const leftPageNum = spreadIndex * 2 + 1;
  drawLeftPage(ctx, item, leftPageNum, loadedImg);

  // 5. Draw Right Page (Details & Interactive Link)
  const rightPageNum = spreadIndex * 2 + 2;
  drawRightPage(ctx, item, rightPageNum);

  ctx.restore();

  try {
    return canvas.toDataURL('image/webp', 0.88);
  } catch (e) {
    return canvas.toDataURL('image/jpeg', 0.88);
  }
}

export function generateSpreadDataUrls(items) {
  if (typeof document === 'undefined') return [];
  const canvas = document.createElement('canvas');
  return items.map((item, index) => {
    return {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      date: item.date,
      link: item.link,
      linkText: item.linkText,
      url: drawLandscapeSpreadOnCanvas(canvas, item, index, items.length, null)
    };
  });
}
