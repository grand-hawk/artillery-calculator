/* 
  Converts all images to webp
*/

import fs from 'node:fs';
import path from 'node:path';

import isImage from 'is-image';
import klaw from 'klaw';
import sharp from 'sharp';

const cwd = process.cwd();

const imageDir = path.join(path.resolve(cwd, 'public'), 'images');
const webpDir = path.join(imageDir, 'webp');

if (fs.existsSync(webpDir))
  fs.rmSync(webpDir, {
    recursive: true,
  });
fs.mkdirSync(webpDir);

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

  const webp = sharp(file.path).webp({ quality: 100, effort: 6 });
  const { width, height } = await webp.metadata();

  const target = Math.max(width, height);
  webp.resize(target, target, {
    fit: sharp.fit.contain,
  });

  webp
    .toBuffer()
    .then((imageBuffer) =>
      fs.writeFileSync(path.join(targetDir, `${fileName}.webp`), imageBuffer),
    )
    .catch((error) => {
      throw new Error(
        `Failed to generate webp image for ${fileName}\n${error}`,
      );
    });
}
