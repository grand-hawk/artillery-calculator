import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
    >
      <Component {...pageProps} />

      {process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && (
        <Script
          defer
          src={new URL(
            '/script.js',
            process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN,
          ).toString()}
          data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
          data-host-url={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
        />
      )}
    </NextIntlClientProvider>
  );
}

export default App;
