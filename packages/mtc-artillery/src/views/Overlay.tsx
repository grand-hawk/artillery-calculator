import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import React from 'react';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import AzimuthValue from '@/components/organisms/configuration/Azimuth';
import DistanceValue from '@/components/organisms/configuration/Distance';
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

const windowWidth = 326;
const navigationHeight = 40;
const canvasHeight = 326;
const dataHeight = 225;

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

        await appWindow.setSize(
          new LogicalSize(
            windowWidth,
            navigationHeight + canvasHeight + dataHeight,
          ),
        );
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
          },

          body: {
            backgroundColor: 'unset',
          },
        }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: `${navigationHeight}px ${canvasHeight}px ${dataHeight}px`,

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
          <ColumnContainer sx={{ gap: 1 }}>
            <RowContainer>
              <ElevationValue />

              <AzimuthValue />
            </RowContainer>

            <RowContainer>
              <DistanceValue />
            </RowContainer>
          </ColumnContainer>

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
