/**
 * Post-build fix for `output: 'export'` (Next.js 16.4.x).
 *
 * The App Router client requests per-segment prefetch payloads as flat files
 * (convertSegmentPathToStaticExportFilename → `__next.$d$lang.about.__PAGE__.txt`),
 * but the exporter writes nested segments as folders
 * (`__next.$d$lang/about/__PAGE__.txt`). On a static host those requests 404 and
 * client-side navigation loses its instant prefetch.
 *
 * This script moves every nested segment file to the flat name the client expects.
 * It is a no-op when the exporter already writes flat files.
 */
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve(process.argv[2] ?? 'out');
let moved = 0;

function walkFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(full) : [full];
  });
}

function visit(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith('__next.')) {
      // e.g. <page>/__next.$d$lang/about/__PAGE__.txt → <page>/__next.$d$lang.about.__PAGE__.txt
      for (const file of walkFiles(full)) {
        const relative = path.relative(full, file).split(path.sep).join('.');
        const target = path.join(dir, `${entry.name}.${relative}`);
        if (!fs.existsSync(target)) {
          fs.renameSync(file, target);
          moved += 1;
        }
      }
      fs.rmSync(full, { recursive: true, force: true });
    } else if (entry.name !== '_next' && entry.name !== 'images') {
      visit(full);
    }
  }
}

if (!fs.existsSync(outDir)) {
  console.error(`[fix-segment-prefetch] ${outDir} not found — run "next build" first.`);
  process.exit(1);
}

visit(outDir);
console.log(`[fix-segment-prefetch] flattened ${moved} segment prefetch file(s) in ${path.relative(process.cwd(), outDir) || '.'}`);
