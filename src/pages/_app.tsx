import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import HeightmapProvider from '@/components/providers/HeightmapProvider';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeightmapProvider>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
      >
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </HeightmapProvider>
  );
}

export default App;
