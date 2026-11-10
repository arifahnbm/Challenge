# ThreeUI Kage Landing Page Integration

This project integrates the `<KageLandingPage />` component from [ThreeUI](https://threeui.com) using its exact canonical source files and registered binary assets.

## Overview

The Kage temple experience is an interactive full-page document with its original navigation, scroll-driven camera transitions, and local Three.js WebGL world.

### Configured Usage

```tsx
import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
```

---

## Registered Source Files & Asset Verification

All 8 registered source files and 14 binary assets match their canonical SHA-256 hashes byte-for-byte:

### Code & Markup Files
- `src/shaders/landing-pages/LandingPages.tsx` — SHA-256 `4d379461ad00eb4de7900df312878035383de7e1ed4e13283b8143a2eea9d30a`
- `src/shaders/landing-pages/pageTypography.ts` — SHA-256 `809cc65797d531cd3b3ca5a56815d55d24b3ee8d293e4e4bad6fdfe6c83244cc`
- `src/shaders/landing-pages/pageRecipes.ts` — SHA-256 `c9d9849cc255bac2d1d938d088c50917f84916f1c516d2bbb27fcfd803523233`
- `src/shaders/landing-pages/LandingPageFrame.tsx` — SHA-256 `61de2cc50888aac4ac5557420b07fa47ed3543bb57c1e0055fafdefa53dbaa78`
- `public/landing-pages/kage.html` — SHA-256 `c8e06b90397ac246baf0ab6f32f5f6b570acc6fe03c7009f711b579fb72d9f49`
- `public/landing-pages/secret-pathways-assets/fonts.css` — SHA-256 `985f85a904a4096f92c06552b06f42a45973ac004af4780d68f18af65ddcc1b0`
- `public/landing-pages/secret-pathways-assets/three.min.js` — SHA-256 `8a5f7249903b54d30f79f708699d2fed2d6a1d0741a4cd41377d1f01bb5a2271`
- `src/shaders/threeui.css` — SHA-256 `efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf`

### Binary Assets (WebP)
- `public/landing-pages/secret-pathways-assets/generated/kage-sanmon-preview.webp` (`186398` bytes, SHA-256 `23937f8c8350...`)
- `public/landing-pages/secret-pathways-assets/generated/kage-approach.webp` (`180064` bytes, SHA-256 `39ff33893609...`)
- `public/landing-pages/secret-pathways-assets/generated/kage-lantern-court.webp` (`197940` bytes, SHA-256 `c0a6ff7da1cd...`)
- `public/landing-pages/secret-pathways-assets/generated/kage-moonwater.webp` (`102234` bytes, SHA-256 `b8c8060c51c8...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/temple-wall.webp` (`86466` bytes, SHA-256 `41c00f017e4e...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/pine-tree.webp` (`195918` bytes, SHA-256 `79b233716d06...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/tall-grass.webp` (`351644` bytes, SHA-256 `8db0b5fbd160...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/sakura-branch.webp` (`252528` bytes, SHA-256 `48564194d404...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/maple-leaves.webp` (`178208` bytes, SHA-256 `35a90fec62c1...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/stone-lantern.webp` (`150108` bytes, SHA-256 `d5f3c881bc9d...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/garden-bush.webp` (`286406` bytes, SHA-256 `707e2516ebc0...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/basalt-stones.webp` (`167866` bytes, SHA-256 `150f1c87e181...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/hill.webp` (`84142` bytes, SHA-256 `ffba816244bc...`)
- `public/landing-pages/secret-pathways-assets/foreground/png/shrine-ruins.webp` (`145814` bytes, SHA-256 `77006e58f206...`)

---

## Commands

### 1. Verify Asset Integrity
To verify the SHA-256 hashes of all 22 registered files and binary assets:
```bash
npm test
# or
npm run verify
```

### 2. Run Development Server
```bash
npm run dev
```
Serves the application locally at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Typechecks with `tsc` and bundles with `vite build`.

