import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import React from 'react';

import type { PropsWithChildren } from 'react';

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          '50': '#f4e1e6',
          '100': '#e5b4c2',
          '200': '#d3869b',
          '300': '#c55875',
          '400': '#bd375b',
          '500': '#b41443',
          '600': '#a51241',
          '700': '#920f3d',
          '800': '#7e0b38',
          '900': '#5d042f',
        },

        success: {
          '50': '#e5f0ef',
          '100': '#bfdbd6',
          '200': '#9ac5bd',
          '300': '#7caea3',
          '400': '#6c9d91',
          '500': '#5c8d80',
          '600': '#568074',
          '700': '#4e7066',
          '800': '#466058',
          '900': '#37453f',
        },

        neutral: {
          '50': '#ede5d5',
          '100': '#d4be98',
          '200': '#b89452',
          '300': '#9c6c00',
          '400': '#8c5300',
          '500': '#7d3a00',
          '600': '#7c3200',
          '700': '#792400',
          '800': '#731000',
          '900': '#6b0000',
        },

        text: {
          primary: '#89b481',
          secondary: '#d4be98',
          tertiary: '#282828',
        },

        background: {
          body: '#282828',
          surface: '#32302f',
          level1: '#3c3836',
          level2: '#504944',
        },
      },
    },
  },
});

export default function Theme({ children }: PropsWithChildren) {
  return (
    <CssVarsProvider defaultColorScheme="dark" defaultMode="dark" theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
