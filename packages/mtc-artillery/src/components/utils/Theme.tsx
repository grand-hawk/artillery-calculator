import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { useRouter } from 'next/router';
import React from 'react';

import type { PropsWithChildren } from 'react';

export const normalTheme = extendTheme({});

export const lolcatTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: '#100c15',
          popup: '#1d1526',
          surface: '#1d1526',
        },
        neutral: {
          softBg: '#2e243b',
          softHoverBg: '#3a2c4a',
          softActiveBg: '#574270',

          plainBg: '#2e243b',
          plainHoverBg: '#3a2c4a',
          plainActiveBg: '#574270',

          outlinedHoverBg: '#2d213b',
        },
      },
    },
  },
});

export default function Theme({ children }: PropsWithChildren) {
  const { locale } = useRouter();

  const theme = locale === 'lolcat-US' ? lolcatTheme : normalTheme;

  return (
    <CssVarsProvider defaultColorScheme="dark" defaultMode="dark" theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
