import Box from '@mui/joy/Box';
import React from 'react';
import { isMobile } from 'react-device-detect';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import ConfigurationGroup from '@/components/atoms/ConfigurationGroup';
import AzimuthValue from '@/components/organisms/configuration/Azimuth';
import DistanceValue from '@/components/organisms/configuration/Distance';
import ElevationValue from '@/components/organisms/configuration/Elevation';
import MapSelection from '@/components/organisms/configuration/Map';
import MobileMode from '@/components/organisms/configuration/MobileMode';
import ProjectileSelection from '@/components/organisms/configuration/Projectile';
import TimeOfFlightValue from '@/components/organisms/configuration/TimeOfFlight';
import Footer from '@/components/organisms/Footer';
import Motd from '@/components/organisms/Motd';
import Canvas from '@/components/templates/Canvas';
import { usePropStore } from '@/stores/props';

export default function MobileView() {
  const version = usePropStore((s) => s.version);
  const motd = usePropStore((s) => s.motd);

  return (
    <Box
      className="mobile"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          width: '100%',

          gap: 4,

          '& [aria-roledescription]': {
            aspectRatio: '1/1',
          },
        }}
      >
        <Canvas />

        <ColumnContainer>
          <Motd message={motd || undefined} />

          {isMobile && <MobileMode />}

          <ConfigurationGroup>
            <ElevationValue />
            <AzimuthValue />
            <DistanceValue />
            <TimeOfFlightValue />
            <ProjectileSelection />
            <MapSelection />
          </ConfigurationGroup>
        </ColumnContainer>
      </Box>

      <Footer version={version!} />
    </Box>
  );
}
