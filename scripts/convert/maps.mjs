import fs from 'node:fs';

import sharp from 'sharp';

export default async function convertMap(
  effort,
  path,
  targetFile,
  relativeTarget,
) {
  const webp = sharp(path).webp({
    quality: 100,
    effort,
  });

  webp.resize(1024, 1024, {
    fit: sharp.fit.contain,
  });

  try {
    const imageBuffer = await webp.toBuffer();
    fs.writeFileSync(targetFile, imageBuffer);
  } catch (error) {
    throw new Error(`Failed to convert: ${relativeTarget}\n${error}`);
  } finally {
    console.info('Converted:', relativeTarget);
  }
}
