/* 
  Converts all images to webp and creates 64px variants
*/

import fs from 'node:fs';
import path from 'node:path';

import isImage from 'is-image';
import klaw from 'klaw';
import sharp from 'sharp';

const cwd = process.cwd();

const publicDir = path.resolve(cwd, 'public');
const imageDir = path.join(publicDir, 'images');
const webpDir = path.join(imageDir, 'webp');

if (fs.existsSync(webpDir))
  fs.rmSync(webpDir, {
    recursive: true,
  });
fs.mkdirSync(webpDir);

for await (const file of klaw(imageDir, {
  // stay in the images folder and dont go into the webp folder once it is created
  depthLimit: 0,
})) {
  if (!isImage(file.path)) continue;

  // expect no periods in filename besides ext seperator
  const fileName = path.basename(file.path).split('.')[0];

  sharp(file.path)
    .resize(64)
    .webp()
    .toBuffer()
    .then((imageBuffer) =>
      fs.writeFileSync(
        path.join(webpDir, `${fileName}_small.webp`),
        imageBuffer,
      ),
    )
    .catch((error) => {
      throw new Error(
        `Failed to generate 64px image for ${fileName}\n${error}`,
      );
    });
  console.log('Generated 64px images of maps');

  sharp(file.path)
    .webp({
      quality: 100,
    })
    .toBuffer()
    .then((imageBuffer) =>
      fs.writeFileSync(path.join(webpDir, `${fileName}.webp`), imageBuffer),
    )
    .catch((error) => {
      throw new Error(
        `Failed to generate large webp image for ${fileName}\n${error}`,
      );
    });
  console.log('Converted all large images to webp');
}
