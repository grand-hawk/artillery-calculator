import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import React from 'react';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import AzimuthValue from '@/components/organisms/configuration/Azimuth';
import ElevationValue from '@/components/organisms/configuration/Elevation';
import MapSelection from '@/components/organisms/configuration/Map';
import ProjectileSelection from '@/components/organisms/configuration/Projectile';
import Canvas from '@/components/templates/Canvas';
import RowContainer from '@tauri/atoms/RowContainer';
import Navigation from '@tauri/templates/Navigation';

declare global {
  interface Window {
    umami: {
      track: (event: string) => void;
    };
  }
}

export default function OverlayView() {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if ('umami' in window) window.umami.track('Overlay app');
      } catch (error) {
        console.warn(error);
      }
    }, 10_000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          '*': {
            overflow: 'hidden',
          },

          body: {
            backgroundColor: 'unset',
          },
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '40px 326px 180px',

          borderRadius: 8,
          backgroundColor: 'black',

          '.canvas-sheet': {
            borderRadius: '0 !important',
          },
        }}
      >
        <Navigation />

        <Canvas />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            gap: 0.5,

            padding: 2,
          }}
        >
          <RowContainer
            sx={{
              '& .datacontainer': {
                flexDirection: 'column',
                gap: 0,
              },
            }}
          >
            <ElevationValue />

            <AzimuthValue />
          </RowContainer>

          <ColumnContainer
            sx={{
              gap: 0.5,

              '& .datacontainer': {
                justifyContent: 'stretch',

                '& > .MuiButton-root, & > .MuiSelect-root': {
                  width: '100%',
                  justifyContent: 'space-between',
                },

                '& > .MuiTypography-root': {
                  display: 'none',
                },
              },
            }}
          >
            <ProjectileSelection />

            <MapSelection />
          </ColumnContainer>
        </Box>
      </Box>
    </>
  );
}
