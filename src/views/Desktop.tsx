import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import ConfigurationGroup from '@/components/atoms/ConfigurationGroup';
import AzimuthValue from '@/components/organisms/configuration/Azimuth';
import DistanceValue from '@/components/organisms/configuration/Distance';
import ElevationValue from '@/components/organisms/configuration/Elevation';
import MapSelection from '@/components/organisms/configuration/Map';
import ProjectileSelection from '@/components/organisms/configuration/Projectile';
import TimeOfFlightValue from '@/components/organisms/configuration/TimeOfFlight';
import Motd from '@/components/organisms/Motd';
import VersionAlert from '@/components/organisms/VersionAlert';
import Canvas from '@/components/templates/Canvas';
import Footer from '@/components/templates/Footer';

import type { ViewProps } from '@/pages';

export default function DesktopView({ motd, version }: ViewProps) {
  const t = useTranslations();

  return (
    <Box
      className="desktop"
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr min-content',
        rowGap: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',

              maxWidth: {
                sm: '90vw',
                lg: '75vw',
              },

              padding: 4,
              gap: 4,
            }}
          >
            <Canvas />

            <ColumnContainer>
              <VersionAlert currentVersion={version} />
              <Motd message={motd || undefined} />

              <ConfigurationGroup>
                <ElevationValue />
                <AzimuthValue />
                <DistanceValue />
                <TimeOfFlightValue />
                <ProjectileSelection />
                <MapSelection />
              </ConfigurationGroup>

              <Typography sx={{ marginTop: 'auto' }}>
                {t('typography.instructions')}
              </Typography>
            </ColumnContainer>
          </Box>
        </Box>
      </Box>

      <Footer version={version} />
    </Box>
  );
}
