// Assemble src/*.css into a single Vencord/Equicord theme file.
// Usage: node build.mjs [--watch]

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { watch } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('./src/', import.meta.url));
const DIST = fileURLToPath(new URL('./dist/', import.meta.url));
const OUT = join(DIST, 'Applecord.theme.css');

const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'));

const header = `/**
 * @name Applecord
 * @author Jules
 * @description Discord en Liquid Glass, façon iOS 27. Matériaux translucides, ressorts Apple, typographie SF.
 * @version ${pkg.version}
 */
`;

// ── Apple springs → CSS linear() ──────────────────────────────────────────
// Apple describes springs with two designer-facing params: damping ratio and
// response (seconds). We integrate the closed-form step response and sample
// it into a linear() easing, plus the settle time to use as the duration.

function springCurve(damping, response) {
  const w0 = (2 * Math.PI) / response;
  const x = (t) => {
    if (damping >= 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const wd = w0 * Math.sqrt(1 - damping * damping);
    const a = damping * w0;
    return 1 - Math.exp(-a * t) * (Math.cos(wd * t) + (a / wd) * Math.sin(wd * t));
  };

  // Settle time: last moment the curve is further than 0.1% from rest.
  let settle = 0;
  for (let t = 0; t < 5; t += 0.001) if (Math.abs(1 - x(t)) > 0.001) settle = t;
  settle = Math.ceil(settle * 100) / 100;

  const steps = 48;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const v = i === steps ? 1 : x((i / steps) * settle);
    points.push(+v.toFixed(4));
  }
  return { easing: `linear(${points.join(', ')})`, duration: `${Math.round(settle * 1000)}ms` };
}

// Values from Apple's "Designing Fluid Interfaces" (see .agents/skills/apple-design).
const springs = {
  smooth: springCurve(1.0, 0.35), // default: critically damped, no overshoot
  bouncy: springCurve(0.8, 0.4),  // only where the gesture carried momentum
};

const springTokens = `:root {\n${Object.entries(springs)
  .map(([name, s]) => `  --ac-spring-${name}: ${s.easing};\n  --ac-spring-${name}-duration: ${s.duration};`)
  .join('\n')}\n}\n`;

// ── Custom selectors ──────────────────────────────────────────────────────
// `@custom-selector :--name <selector list>;` (CSS draft spec) lets a long
// selector list be declared once in src/ and reused. Expanded to :is(…).

function expandCustomSelectors(css) {
  const defs = {};
  let start;
  while ((start = css.indexOf('@custom-selector')) !== -1) {
    // Find the terminating `;`, skipping over comments (which may contain one).
    let i = start;
    while (css[i] !== ';') i = css.startsWith('/*', i) ? css.indexOf('*/', i) + 2 : i + 1;
    const body = css.slice(start + '@custom-selector'.length, i).replace(/\/\*[\s\S]*?\*\//g, '');
    const [, name, list] = body.match(/^\s*:--([\w-]+)\s+([\s\S]+)$/);
    defs[name] = list.replace(/\s+/g, ' ').trim();
    css = css.slice(0, start) + css.slice(i + 1);
  }
  return css.replace(/:--([\w-]+)/g, (m, name) => (defs[name] ? `:is(${defs[name]})` : m));
}

// ── Build ─────────────────────────────────────────────────────────────────

async function build() {
  const files = (await readdir(SRC)).filter((f) => f.endsWith('.css')).sort();
  const parts = await Promise.all(
    files.map(async (f) => `/* ── ${f} ${'─'.repeat(Math.max(0, 66 - f.length))} */\n${await readFile(join(SRC, f), 'utf8')}`),
  );
  const css = expandCustomSelectors(
    [header, '/* ── springs (generated) ─────────────────────────────────────────────── */\n' + springTokens, ...parts].join('\n'),
  );
  await mkdir(DIST, { recursive: true });
  await writeFile(OUT, css);

  // Dev preview without a client mod: paste dist/inject.js into the DevTools
  // console on discord.com (Discord's CSP allows inline <style>, not remote CSS).
  // Never strip the space *before* ':' — `a :is(b)` and `a:is(b)` differ.
  const min = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/:\s+/g, ':').trim();
  await writeFile(
    join(DIST, 'inject.js'),
    `(()=>{const s=document.getElementById('applecord-dev')||document.head.appendChild(Object.assign(document.createElement('style'),{id:'applecord-dev'}));s.textContent=${JSON.stringify(min)};return 'Applecord injected ('+s.textContent.length+' chars)'})()\n`,
  );
  console.log(`✓ ${OUT.replace(process.cwd() + '/', '')} (${files.length} modules, ${(min.length / 1024).toFixed(1)} KB min)`);
}

await build();

if (process.argv.includes('--watch')) {
  let timer;
  watch(SRC, () => {
    clearTimeout(timer);
    timer = setTimeout(() => build().catch((e) => console.error(e)), 50);
  });
  console.log('… watching src/');
}
