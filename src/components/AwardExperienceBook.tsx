'use client';

import React, { useEffect, useRef, useState } from 'react';
import { sortedAwardsExperiences, AwardExperienceItem } from '../data/awardsExperiences';
import { generateSpreadDataUrls } from './bookSpreadRenderer';
import './AwardExperienceBook.css';

interface AwardExperienceBookProps {
  items?: AwardExperienceItem[];
  className?: string;
}

export default function AwardExperienceBook({
  items = sortedAwardsExperiences,
  className = ''
}: AwardExperienceBookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalSpreads, setTotalSpreads] = useState<number>(items.length);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Generate spread images from data
    const pageDataList = generateSpreadDataUrls(items);
    if (!pageDataList || pageDataList.length === 0) return;

    const M = pageDataList.length;
    setTotalSpreads(M);

    const wrap = root.querySelector('#sbWrap') as HTMLElement;
    const stage = root.querySelector('#sbStage') as HTMLElement;
    const sb3d = root.querySelector('#sb3d') as HTMLElement;
    const book = root.querySelector('#sbBook') as HTMLElement;
    const capBox = root.querySelector('#sbCaptions') as HTMLElement;
    const hint = root.querySelector('#sbHint') as HTMLElement;
    const loupe = root.querySelector('#loupe') as HTMLElement;
    const zoomWrap = root.querySelector('#zoomWrap') as HTMLElement;
    const zoomInner = root.querySelector('#zoomInner') as HTMLElement;
    const zRead = root.querySelector('#zRead') as HTMLElement;
    const loupeBtn = root.querySelector('#loupeBtn') as HTMLElement;
    const zInBtn = root.querySelector('#zIn') as HTMLButtonElement;
    const zOutBtn = root.querySelector('#zOut') as HTMLButtonElement;
    const btnLeft = root.querySelector('#sbLeft') as HTMLButtonElement;
    const btnRight = root.querySelector('#sbRight') as HTMLButtonElement;

    if (!wrap || !stage || !sb3d || !book || !loupe || !zoomWrap || !zoomInner) return;

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Turning leaf constants */
    const N = 18;
    const SPAN = 0.449;
    const BETA = 0.60;
    let idx = 0;
    let turn: { dir: 'next' | 'prev'; from: number; to: number; t: number } | null = null;
    let strips: HTMLElement[] = [];

    function el(t: string, c?: string): HTMLElement {
      const e = document.createElement(t);
      if (c) e.className = c;
      return e;
    }

    function imgEl(i: number, side: string): HTMLImageElement {
      const im = document.createElement('img');
      im.className = 'sb-half-img ' + side;
      im.draggable = false;
      im.alt = '';
      im.src = pageDataList[i].url;
      return im;
    }

    function halfEl(pos: string, i: number): HTMLElement {
      const d = el('div', 'sb-half ' + pos);
      d.appendChild(imgEl(i, pos));
      d.appendChild(el('div', 'gutter-shade ' + pos));
      return d;
    }

    function buildCurl(dir: 'next' | 'prev', from: number, to: number): HTMLElement {
      strips = [];
      const c = el('div', 'curl ' + dir);
      c.style.setProperty('--n', String(N));
      c.style.setProperty('--span', String(SPAN));
      let host: HTMLElement = c;

      for (let i = 0; i < N; i++) {
        const s = el('div', 'strip');
        s.style.setProperty('--i', String(i));
        const gut = 'calc(var(--bw) * 0.5)';
        const sw = 'calc(var(--bw) * ' + SPAN + ' / ' + N + ')';
        const A = 'calc(-1 * (' + gut + ' + ' + i + ' * ' + sw + '))';
        const B = 'calc(' + (i + 1) + ' * ' + sw + ' - ' + gut + ')';
        const f = el('div', 'face front');
        const b = el('div', 'face back');

        const dress = (e: HTMLElement, url: string, px: string) => {
          e.style.backgroundImage = 'url(' + url + ')';
          e.style.backgroundPositionX = px;
        };

        dress(f, pageDataList[from].url, dir === 'next' ? A : B);
        dress(b, pageDataList[to].url, dir === 'next' ? B : A);

        f.appendChild(el('div', 'sh'));
        f.appendChild(el('div', 'gl'));
        b.appendChild(el('div', 'sh'));
        b.appendChild(el('div', 'gl'));

        s.appendChild(f);
        s.appendChild(b);
        if (i === N - 1) s.classList.add('edge');
        host.appendChild(s);
        host = s;
        strips.push(s);
      }
      return c;
    }

    function applyTurn(t: number) {
      const th = Math.PI * t;
      const beta = BETA * Math.sin(Math.PI * t);
      const D = 180 / Math.PI;
      const tt = th + beta;
      const td = (2 * beta) / N;

      sb3d.style.setProperty('--tt', (tt * D).toFixed(2) + 'deg');
      sb3d.style.setProperty('--td', (td * D).toFixed(3) + 'deg');
      sb3d.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3));
      fadeCaption(t);

      for (let i = 0; i < strips.length; i++) {
        const l1 = Math.abs(Math.cos(tt - i * td));
        const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
        const st = strips[i].style;
        st.setProperty('--lit', l1.toFixed(3));
        st.setProperty('--a1', ((1 - l1) * 0.62).toFixed(3));
        st.setProperty('--a2', ((1 - l2) * 0.62).toFixed(3));
      }
    }

    function paint() {
      book.textContent = '';
      if (!turn) {
        const f = el('div', 'sb-full');
        const im = document.createElement('img');
        im.src = pageDataList[idx].url;
        im.alt = pageDataList[idx].title;
        im.draggable = false;
        f.appendChild(im);
        book.appendChild(f);
        sb3d.style.setProperty('--shade', '0');

        if (pageDataList[idx] && pageDataList[idx].link) {
          const linkHotspot = el('a', 'sb-book-hotspot') as HTMLAnchorElement;
          linkHotspot.href = pageDataList[idx].link;
          linkHotspot.target = '_blank';
          linkHotspot.rel = 'noopener noreferrer';
          linkHotspot.title = pageDataList[idx].linkText || 'Buka Tautan';
          book.appendChild(linkHotspot);
        }
      } else {
        const next = turn.dir === 'next';
        book.appendChild(halfEl('left', next ? turn.from : turn.to));
        book.appendChild(halfEl('right', next ? turn.to : turn.from));
        book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
        applyTurn(turn.t);
      }

      const a = el('button', 'sb-zone sb-prev');
      const b = el('button', 'sb-zone sb-next');
      a.setAttribute('aria-label', 'previous page');
      b.setAttribute('aria-label', 'next page');
      book.appendChild(a);
      book.appendChild(b);

      layout();
      caption();
      setCurrentPage(turn ? turn.to : idx);
      syncZoomLayer();
      placeLoupe();
    }

    let capOut: HTMLElement | null = null;
    let capIn: HTMLElement | null = null;

    function caption() {
      capBox.textContent = '';
      capOut = capIn = null;
      const curItem = pageDataList[idx];
      if (!curItem) return;

      const track = el('div', 'sb-caption-track');
      if (turn) {
        capOut = el('p', 'sb-caption live');
        capOut.textContent = pageDataList[turn.from].title;
        track.appendChild(capOut);

        capIn = el('p', 'sb-caption live');
        capIn.textContent = pageDataList[turn.to].title;
        track.appendChild(capIn);
        fadeCaption(turn.t);
      } else {
        const p = el('p', 'sb-caption');
        p.textContent = curItem.title;
        track.appendChild(p);
      }
      capBox.appendChild(track);

      const hasLink1 = !!curItem.link;
      const hasLink2 = !!(curItem as any).link2;

      if (hasLink1 || hasLink2) {
        const linksWrap = el('div', 'sb-links-group');
        if (hasLink1) {
          const linkA = document.createElement('a');
          linkA.className = 'sb-ext-link primary';
          linkA.href = curItem.link!;
          linkA.target = '_blank';
          linkA.rel = 'noopener noreferrer';
          linkA.innerHTML = `<span>${curItem.linkText || 'Lihat Artikel / Coverage'}</span><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 3h7v7M13 3L4 12"/></svg>`;
          linksWrap.appendChild(linkA);
        }
        if (hasLink2) {
          const linkB = document.createElement('a');
          linkB.className = 'sb-ext-link secondary';
          linkB.href = (curItem as any).link2;
          linkB.target = '_blank';
          linkB.rel = 'noopener noreferrer';
          linkB.innerHTML = `<span>${(curItem as any).linkText2 || 'Lihat Liputan / Dok'}</span><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 3h7v7M13 3L4 12"/></svg>`;
          linksWrap.appendChild(linkB);
        }
        capBox.appendChild(linksWrap);
      }
    }

    function fadeCaption(t: number) {
      if (!capOut || !capIn) return;
      const out = 1 - Math.max(0, Math.min(1, (t - 0.1) / 0.28));
      const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.3));
      capOut.style.opacity = out.toFixed(3);
      capIn.style.opacity = inn.toFixed(3);
    }

    function layout() {
      sb3d.style.setProperty('--bw', book.clientWidth + 'px');
    }

    window.addEventListener('resize', layout);

    /* Spring Loop */
    let spring: {
      kind: 'spring' | 'tween';
      v?: number;
      target: number;
      from?: number;
      dur?: number;
      e?: number;
      done?: () => void;
      k?: number;
      c?: number;
    } | null = null;

    function animateTo(target: number, onDone?: () => void, stiff = 150, damp = 22) {
      spring = { kind: 'spring', v: 0, target: target, done: onDone, k: stiff, c: damp };
      kick();
    }

    let raf: number | null = null;
    let last = 0;

    function tick(now: number) {
      raf = null;
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
      last = now;

      if (spring && turn) {
        const s = spring;
        if (s.kind === 'tween') {
          s.e = (s.e || 0) + dt;
          const k = Math.min(1, s.e / (s.dur || 1));
          turn.t = (s.from || 0) + (s.target - (s.from || 0)) * k;
          applyTurn(turn.t);
          if (k >= 1) {
            spring = null;
            if (s.done) s.done();
          }
        } else {
          const x = turn.t - s.target;
          s.v = (s.v || 0) + (-(s.k || 150) * x - (s.c || 22) * (s.v || 0)) * dt;
          turn.t += s.v * dt;
          if (Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
            turn.t = s.target;
            spring = null;
            applyTurn(turn.t);
            if (s.done) s.done();
          } else {
            applyTurn(turn.t);
          }
        }
      }

      viewSpring();
      const lmoved = loupeEase();

      if ((spring || viewActive || lmoved) && raf === null) {
        raf = requestAnimationFrame(tick);
      }
    }

    function kick() {
      if (raf === null) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    /* Tilt + Zoom */
    const TILT_X = 4.5;
    const TILT_Y = 7;
    const ZOOM_MIN = 0.9;
    const ZOOM_MAX = 1.5;
    const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
    let viewActive = false;
    let lastZ = 1;

    function applyView() {
      sb3d.style.setProperty('--rx', view.rx.toFixed(2) + 'deg');
      sb3d.style.setProperty('--ry', view.ry.toFixed(2) + 'deg');
      sb3d.style.setProperty('--zoom', view.z.toFixed(3));
      if (view.z !== lastZ) {
        lastZ = view.z;
        placeLoupe();
      }
    }

    function viewSpring() {
      const e = 0.14;
      let moved = false;
      const pairs: Array<[keyof typeof view, keyof typeof view]> = [
        ['rx', 'trx'],
        ['ry', 'try_'],
        ['z', 'tz']
      ];
      for (const [k, t] of pairs) {
        const d = view[t] - view[k];
        if (Math.abs(d) > 0.0006) {
          view[k] += d * e;
          moved = true;
        } else {
          view[k] = view[t];
        }
      }
      if (moved) applyView();
      viewActive = moved;
      return moved;
    }

    function setView(rx: number, ry: number, z: number) {
      view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
      view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
      view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
      viewActive = true;
      kick();
      syncZoom();
    }

    function tiltTo(cx: number, cy: number) {
      if (drag) return;
      const r = book.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)));
      const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, view.tz);
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      tiltTo(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    /* Pointer Work */
    let drag: {
      dir: 'next' | 'prev';
      x0: number;
      w: number;
      moved: number;
      vel: number;
      tPrev: number;
    } | null = null;

    function hideHint() {
      hint.classList.add('gone');
    }

    const onStagePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const onBook = (e.target as HTMLElement).closest('.sb-zone');
      stage.setPointerCapture(e.pointerId);
      hideHint();
      if (!onBook) return;
      const r = book.getBoundingClientRect();
      const dir = (e.clientX - r.left) / r.width > 0.5 ? 'next' : 'prev';
      startTurn(dir, 0);
      drag = { dir: dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
    };

    const onStagePointerMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x0;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      const raw = (drag.dir === 'next' ? -dx : dx) / (drag.w * 0.62);
      const t = Math.max(0, Math.min(1, raw));
      const now = performance.now();
      drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
      drag.tPrev = now;
      if (turn) {
        turn.t = t;
        applyTurn(t);
      }
    };

    const endDrag = () => {
      if (!drag) return;
      const d = drag;
      drag = null;
      if (!turn) return;
      if (d.moved < 6) {
        commit();
        return;
      }
      const go = turn.t > 0.42 || d.vel > 1.1;
      if (go) commit();
      else cancel();
    };

    stage.addEventListener('pointerdown', onStagePointerDown);
    stage.addEventListener('pointermove', onStagePointerMove);
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    /* Turn Control */
    function startTurn(dir: 'next' | 'prev', t: number) {
      spring = null;
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      shoveLoupe(dir);
      const from = idx;
      turn = {
        dir: dir,
        from: from,
        to: dir === 'next' ? (from + 1) % M : (from - 1 + M) % M,
        t: t || 0
      };
      paint();
    }

    function commit() {
      if (!turn) return;
      if (REDUCED) {
        idx = turn.to;
        turn = null;
        paint();
        return;
      }
      animateTo(
        1,
        () => {
          if (!turn) return;
          idx = turn.to;
          turn = null;
          paint();
        },
        170,
        26
      );
      kick();
    }

    function cancel() {
      if (!turn) return;
      animateTo(
        0,
        () => {
          turn = null;
          paint();
        },
        150,
        24
      );
      kick();
    }

    function step(dir: 'next' | 'prev') {
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      startTurn(dir, 0);
      commit();
    }

    btnLeft.onclick = () => step('prev');
    btnRight.onclick = () => step('next');

    /* Loupe + Controls */
    const MAG = 2.3;
    let loupeOn = true;
    let lx: number | null = null;
    let ly: number | null = null;
    let lgrab: { cx: number; cy: number; lx0: number; ly0: number } | null = null;
    let lTarget: { x: number; y: number } | null = null;

    function loupeSize() {
      return Math.round(Math.max(165, Math.min(262, book.clientWidth * 0.235)));
    }

    function bookBox() {
      return { x: 0, y: 0, w: book.clientWidth, h: book.clientHeight };
    }

    function restLoupe() {
      const b = bookBox();
      lx = b.x + b.w * 0.88;
      ly = b.y + b.h * 0.855;
      placeLoupe();
    }

    function syncZoomLayer() {
      zoomInner.textContent = '';
      for (let i = 0; i < book.children.length; i++) {
        const c = book.children[i] as HTMLElement;
        if (c.classList.contains('sb-zone')) continue;
        zoomInner.appendChild(c.cloneNode(true));
      }
    }

    function placeLoupe() {
      if (lx === null) return;
      const B = bookBox(),
        bw = B.w,
        bh = B.h;
      if (!bw) return;
      const R = loupeSize() / 2,
        bez = R * 2 * 0.058;
      loupe.style.setProperty('--lr', R * 2 + 'px');
      loupe.style.transform =
        'translate3d(' + (lx - R).toFixed(1) + 'px,' + (ly - R).toFixed(1) + 'px,0)';
      if (loupeOn) loupe.classList.add('on');

      const z = view.z,
        cx = bw / 2,
        cy = bh / 2;
      const x0 = cx + (bw * 0.051 - cx) * z,
        x1 = cx + (bw * 0.949 - cx) * z;
      const y0 = cy + (bh * 0.218 - cy) * z,
        y1 = cy + (bh * 0.782 - cy) * z;

      const nx = Math.max(x0, Math.min(lx, x1));
      const ny = Math.max(y0, Math.min(ly, y1));
      const inside =
        lx > x0 && lx < x1 && ly > y0 && ly < y1
          ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
          : -Math.hypot(lx - nx, ly - ny);
      const k = Math.max(0, Math.min(1, (inside + R * 0.3) / (R * 0.55)));

      zoomWrap.style.opacity = (loupeOn ? k : 0).toFixed(3);
      if (k <= 0.002) return;
      const r = (R - bez).toFixed(1);
      const mask =
        'radial-gradient(circle ' +
        r +
        'px at ' +
        lx.toFixed(1) +
        'px ' +
        ly.toFixed(1) +
        'px,' +
        '#000 calc(100% - 1px),transparent 100%)';
      zoomWrap.style.webkitMaskImage = mask;
      zoomWrap.style.maskImage = mask;

      const px = cx + (lx - cx) / z,
        py = cy + (ly - cy) / z,
        s = MAG * z;
      zoomInner.style.transform =
        'translate(' +
        (lx - px * s).toFixed(1) +
        'px,' +
        (ly - py * s).toFixed(1) +
        'px) ' +
        'scale(' +
        s.toFixed(4) +
        ')';
    }

    function shoveLoupe(dir: 'next' | 'prev') {
      if (!loupeOn || lx === null || lgrab) return;
      const b = bookBox();
      const nx = (b.w / 2 + (lx - b.x - b.w / 2) / view.z) / b.w,
        ny = (b.h / 2 + (ly - b.y - b.h / 2) / view.z) / b.h;
      if (nx < 0.02 || nx > 0.98 || ny < 0.17 || ny > 0.83) return;
      lTarget = { x: b.x + b.w * (dir === 'next' ? 0.12 : 0.88), y: b.y + b.h * 0.855 };
      kick();
    }

    function loupeEase() {
      if (!lTarget || lx === null || ly === null) return false;
      if (lgrab) {
        lTarget = null;
        return false;
      }
      const dx = lTarget.x - lx,
        dy = lTarget.y - ly;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        lx = lTarget.x;
        ly = lTarget.y;
        lTarget = null;
        placeLoupe();
        return false;
      }
      lx += dx * 0.17;
      ly += dy * 0.17;
      placeLoupe();
      return true;
    }

    loupe.addEventListener('pointerdown', (e: PointerEvent) => {
      if (!loupeOn || e.button !== 0 || lx === null || ly === null) return;
      e.preventDefault();
      e.stopPropagation();
      lTarget = null;
      lgrab = { cx: e.clientX, cy: e.clientY, lx0: lx, ly0: ly };
      loupe.classList.add('held');
      loupe.setPointerCapture(e.pointerId);
      hideHint();
    });

    loupe.addEventListener('pointermove', (e: PointerEvent) => {
      if (!lgrab) return;
      const b = bookBox(),
        R = loupeSize() / 2;
      lx = Math.max(b.x - R * 0.7, Math.min(b.x + b.w + R * 0.7, lgrab.lx0 + (e.clientX - lgrab.cx)));
      ly = Math.max(b.y - R * 0.7, Math.min(b.y + b.h + R * 1.0, lgrab.ly0 + (e.clientY - lgrab.cy)));
      placeLoupe();
    });

    function dropLoupe() {
      lgrab = null;
      loupe.classList.remove('held');
    }

    loupe.addEventListener('pointerup', dropLoupe);
    loupe.addEventListener('pointercancel', dropLoupe);

    loupeBtn.onclick = () => {
      loupeOn = !loupeOn;
      loupeBtn.setAttribute('aria-pressed', String(loupeOn));
      loupe.classList.toggle('on', loupeOn);
      if (loupeOn && lx === null) restLoupe();
    };

    function syncZoom() {
      if (zRead) zRead.textContent = Math.round(view.tz * 100) + '%';
      if (zOutBtn) zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
      if (zInBtn) zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
    }

    if (zInBtn) {
      zInBtn.onclick = () => {
        setView(view.trx, view.try_, view.tz * 1.16);
        hideHint();
      };
    }
    if (zOutBtn) {
      zOutBtn.onclick = () => {
        setView(view.trx, view.try_, view.tz / 1.16);
        hideHint();
      };
    }

    // Init & Boot
    paint();
    applyView();
    syncZoom();
    restLoupe();

    return () => {
      window.removeEventListener('resize', layout);
      window.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerdown', onStagePointerDown);
      stage.removeEventListener('pointermove', onStagePointerMove);
      stage.removeEventListener('pointerup', endDrag);
      stage.removeEventListener('pointercancel', endDrag);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <div className={`award-book-container ${className}`} ref={containerRef}>
      <div className="sb-wrap" id="sbWrap">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <filter id="sb-mblur-1">
            <feGaussianBlur stdDeviation="5 0" />
          </filter>
          <filter id="sb-mblur-2">
            <feGaussianBlur stdDeviation="14 0" />
          </filter>
        </svg>

        <div className="sb-stage" id="sbStage">
          <button className="sb-arrow left" id="sbLeft" aria-label="previous page">
            <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
              <polyline
                points="11,3 3,22 11,41"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="sb-3d" id="sb3d">
            <div className="sb-tilt" id="sbTilt">
              <div className="sb-cast ambient" aria-hidden="true" />
              <div className="sb-cast contact" aria-hidden="true" />
              <div className="sb-cast hair" aria-hidden="true" />
              <div className="sb-book" id="sbBook" />
            </div>

            <div className="zoomwrap" id="zoomWrap" aria-hidden="true">
              <div className="zoominner" id="zoomInner" />
            </div>

            <div className="loupe" id="loupe">
              <span className="grip" />
              <span className="ring">
                <span className="lens" id="loupeLens">
                  <span className="mag" id="loupeMag" />
                </span>
              </span>
            </div>
          </div>

          <button className="sb-arrow right" id="sbRight" aria-label="next page">
            <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
              <polyline
                points="3,3 11,22 3,41"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="sb-captions" id="sbCaptions" />

        <div className="sb-tools" role="group" aria-label="view controls">
          <button className="tool" id="zOut" aria-label="zoom out">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8" />
            </svg>
          </button>
          <span className="zoom-read" id="zRead">
            100%
          </span>
          <button className="tool" id="zIn" aria-label="zoom in">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 17.4 17.4M6.2 8.6h4.8M8.6 6.2v4.8" />
            </svg>
          </button>
          <span className="tool-sep" aria-hidden="true" />
          <button className="tool" id="loupeBtn" aria-label="magnifier" aria-pressed="true">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <circle cx="8.8" cy="8.8" r="5.8" />
              <path d="M13 13l4.4 4.4" />
              <path d="M6.4 7.2a3.2 3.2 0 0 1 2.4-1.4" opacity=".55" />
            </svg>
          </button>
        </div>

        <p className="sb-hint" id="sbHint">
          Drag the page edge to flip · Drag the brass magnifying glass to inspect
        </p>
      </div>
    </div>
  );
}
