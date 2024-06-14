/* 
  Converts all heightmap images to single channel webp
*/

import fs from 'node:fs';
import path from 'node:path';

import isImage from 'is-image';
import klaw from 'klaw';
import sharp from 'sharp';

const cwd = process.cwd();

const imageDir = path.join(path.resolve(cwd, 'public'), 'images');
const heightmapDir = path.join(imageDir, 'heightmaps');
const targetDir = path.join(imageDir, 'webp', 'heightmaps');

if (fs.existsSync(targetDir))
  fs.rmSync(targetDir, {
    recursive: true,
  });
fs.mkdirSync(targetDir, { recursive: true });

for await (const file of klaw(heightmapDir)) {
  if (!isImage(file.path)) continue;

  // expect no periods in filename besides ext seperator
  const fileName = path.basename(file.path).split('.')[0];

  const webp = sharp(file.path).grayscale().webp({ quality: 100, effort: 6 });

  webp
    .toBuffer()
    .then((imageBuffer) =>
      fs.writeFileSync(path.join(targetDir, `${fileName}.webp`), imageBuffer),
    )
    .catch((error) => {
      throw new Error(
        `Failed to generate large webp image for ${fileName}\n${error}`,
      );
    });
}
