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
    locales: ['de-DE', 'en-US', 'es-ES', 'pl-PL', 'ru-RU', 'uk-UA'],
    defaultLocale: 'en-US',
  },
};

export default config;
