import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import HeightmapProvider from '@/components/providers/HeightmapProvider';
import useProperLocale from '@/hooks/useProperLocale';
import locales, { config } from '@/i18n';
import objectKeySearch from '@/utils/objectKeySearch';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const locale = useProperLocale();

  return (
    <React.StrictMode>
      <NextIntlClientProvider
        getMessageFallback={(info) =>
          objectKeySearch(
            locales[config.defaultLocale] as Parameters<
              typeof objectKeySearch
            >[0],
            info.key,
          ) as string
        }
        locale={locale}
        messages={pageProps.messages}
        onError={(error) =>
          process.env.NODE_ENV === 'development'
            ? console.warn(error)
            : console.error(error)
        }
      >
        <HeightmapProvider>
          <Component {...pageProps} />
        </HeightmapProvider>
      </NextIntlClientProvider>
    </React.StrictMode>
  );
}

export default App;
