import fs from 'node:fs';
import path from 'node:path';

const tmp = path.resolve('.tmp');
if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true });

const id = process.argv[2];
if (!id) throw new Error('no id supplied');

const response = await fetch(
  `https://assetdelivery.roblox.com/v1/asset/?id=${id}`,
);
if (!response.ok) throw new Error(response.statusText);

const arrayBuffer = await response.arrayBuffer();

fs.writeFileSync(path.join(tmp, id), Buffer.from(arrayBuffer));
