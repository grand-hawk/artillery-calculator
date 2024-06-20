import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import React from 'react';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import AzimuthValue from '@/components/molecules/configuration/Azimuth';
import ElevationValue from '@/components/molecules/configuration/Elevation';
import MapSelection from '@/components/molecules/configuration/Map';
import ProjectileSelection from '@/components/molecules/configuration/Projectile';
import Canvas from '@/components/templates/Canvas';
import RowContainer from '@tauri/atoms/RowContainer';
import Navigation from '@tauri/templates/Navigation';

export default function OverlayView() {
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
