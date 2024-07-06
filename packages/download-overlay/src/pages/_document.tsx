import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <noscript>JavaScript is required to run this app</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
