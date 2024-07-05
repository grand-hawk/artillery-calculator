// ENV: SHARP_EFFORT

import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

import isImage from 'is-image';
import klaw from 'klaw';

import convertMap from './maps.mjs';

const start = performance.now();
const effort = Number(process.env.SHARP_EFFORT ?? 4);
const cwd = process.cwd();

const imageDir = path.join(path.resolve(cwd, 'public'), 'images');
const webpDir = path.join(imageDir, 'webp');

console.info('Effort:', effort);

if (fs.existsSync(webpDir))
  fs.rmSync(webpDir, {
    recursive: true,
  });
fs.mkdirSync(webpDir, { recursive: true });

for await (const file of klaw(imageDir)) {
  if (file.path.includes(webpDir)) continue;
  if (!isImage(file.path)) continue;

  const relativeName = file.path.split(imageDir)[1].trim(1);
  const targetDir = path.join(
    webpDir,
    relativeName.split(path.sep).slice(0, -1).join(path.sep),
  );
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  // expect no periods in filename besides ext seperator
  const fileName = path.basename(file.path).split('.')[0];
  const targetFile = path.join(targetDir, `${fileName}.webp`);
  const relativeTarget = path.relative(process.cwd(), targetFile);

  switch (targetDir.split(path.sep).pop()) {
    case 'maps':
    case 'heightmaps':
      await convertMap(effort, file.path, targetFile, relativeTarget);
      break;
  }
}

console.log('Took', `${((performance.now() - start) / 1_000).toFixed(5)}s`);
