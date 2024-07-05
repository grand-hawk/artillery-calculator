import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

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
        timeZone="Europe/Amsterdam"
        onError={(error) =>
          process.env.NODE_ENV === 'development'
            ? console.warn(error)
            : console.error(error)
        }
      >
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </React.StrictMode>
  );
}

export default App;
