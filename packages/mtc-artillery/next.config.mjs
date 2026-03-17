import bundleAnalyzer from '@next/bundle-analyzer';

import i18nConfig from './src/i18n/config.json' with { type: 'json' };

/** @type {import('next').NextConfig} */
const config = {
  i18n: i18nConfig,

  eslint: {
    // ran by itself as script command
    ignoreDuringBuilds: true,
  },

  output: process.env.NEXT_OUTPUT,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(config);
