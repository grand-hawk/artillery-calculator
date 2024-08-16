import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import React from 'react';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import AzimuthValue from '@/components/organisms/configuration/Azimuth';
import DistanceValue from '@/components/organisms/configuration/Distance';
import ElevationValue from '@/components/organisms/configuration/Elevation';
import MapSelection from '@/components/organisms/configuration/Map';
import ProjectileSelection from '@/components/organisms/configuration/Projectile';
import TimeOfFlightValue from '@/components/organisms/configuration/TimeOfFlight';
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

const windowWidth = 326;

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

  React.useEffect(() => {
    async function updateSize() {
      try {
        const { appWindow, LogicalSize } = await import(
          '@tauri-apps/api/window'
        );

        const height = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
        );

        await appWindow.setSize(new LogicalSize(windowWidth, height));
      } catch (error) {
        console.error(error);
      }
    }

    updateSize();
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{
          '*': {
            overflow: 'hidden',

            userSelect: 'none',
          },

          body: {
            backgroundColor: 'unset',
          },
        }}
      />

      <Box
        sx={{
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

            gap: 2,
            padding: 2,

            // items centered by default
            '& .datacontainer': {
              alignItems: 'stretch',
            },
          }}
        >
          <ColumnContainer sx={{ gap: 1 }}>
            <RowContainer>
              <ElevationValue />

              <AzimuthValue />
            </RowContainer>

            <RowContainer>
              <DistanceValue />
              <TimeOfFlightValue minimized />
            </RowContainer>
          </ColumnContainer>

          <ColumnContainer
            sx={{
              gap: 0.5,

              '& .datacontainer': {
                justifyContent: 'stretch',

                // ensure elements are full width
                '& > .MuiButton-root, & > .MuiSelect-root': {
                  width: '100%',
                  justifyContent: 'space-between',
                },

                // hide titles on left side
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
