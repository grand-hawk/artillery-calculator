/** @type {import("next").NextConfig} */
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

  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
};

export default config;
