import { useRouter } from 'next/router';
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
    </NextIntlClientProvider>
  );
}

export default App;
