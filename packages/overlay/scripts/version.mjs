/* eslint-disable import/first */

// shush any warnings, only care about the version log
process.emit = () => undefined;

import config from '../src/tauri.conf.json' with { type: 'json' };

const { version } = config;

process.stdout.write(version);
