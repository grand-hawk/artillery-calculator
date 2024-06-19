import bundleAnalyzer from '@next/bundle-analyzer';

import i18nConfig from './src/i18n/config.json' with { type: 'json' };

/** @type {import('next').NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },

  i18n: i18nConfig,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(config);
