// Renders docs/preview (fictitious data + the built theme) with headless
// Chrome and writes docs/screenshots/<scene>.png. Run `npm run build` first.
// Usage: node scripts/screenshots.mjs [scene…]

import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const page = pathToFileURL(fileURLToPath(new URL('../docs/preview/index.html', import.meta.url)));
const outDir = fileURLToPath(new URL('../docs/screenshots/', import.meta.url));
const scenes = process.argv.slice(2).length ? process.argv.slice(2) : ['chat', 'menu', 'settings', 'profile'];

mkdirSync(outDir, { recursive: true });

for (const scene of scenes) {
  const out = `${outDir}${scene}.png`;
  execFileSync(CHROME, [
    '--headless=new',
    '--hide-scrollbars',
    '--window-size=1440,900',
    '--force-device-scale-factor=2',
    '--virtual-time-budget=3000', // let entrance animations settle
    `--screenshot=${out}`,
    `${page}?scene=${scene}`,
  ], { stdio: 'ignore' });
  console.log(`✓ docs/screenshots/${scene}.png`);
}
