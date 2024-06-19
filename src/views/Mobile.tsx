import Box from '@mui/joy/Box';
import React from 'react';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import ConfigurationGroup from '@/components/atoms/ConfigurationGroup';
import AzimuthValue from '@/components/molecules/configuration/Azimuth';
import DistanceValue from '@/components/molecules/configuration/Distance';
import ElevationValue from '@/components/molecules/configuration/Elevation';
import MapSelection from '@/components/molecules/configuration/Map';
import MobileMode from '@/components/molecules/configuration/MobileMode';
import ProjectileSelection from '@/components/molecules/configuration/Projectile';
import TimeOfFlightValue from '@/components/molecules/configuration/TimeOfFlight';
import Motd from '@/components/organisms/Motd';
import VersionAlert from '@/components/organisms/VersionAlert';
import Canvas from '@/components/templates/Canvas';
import Footer from '@/components/templates/Footer';

import type { ViewProps } from '@/pages';

export default function MobileView({ motd, version }: ViewProps) {
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

          gap: 4,

          width: '100%',

          '& [aria-roledescription]': {
            aspectRatio: '1/1',
          },
        }}
      >
        <Canvas />

        <ColumnContainer>
          <VersionAlert currentVersion={version} />
          <Motd message={motd || undefined} />

          <MobileMode />

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

      <Footer version={version} sx={{ width: '100%' }} />
    </Box>
  );
}
