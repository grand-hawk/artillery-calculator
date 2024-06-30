import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React from 'react';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import ConfigurationGroup from '@/components/atoms/ConfigurationGroup';
import Konata from '@/components/atoms/Konata';
import AzimuthValue from '@/components/organisms/configuration/Azimuth';
import DistanceValue from '@/components/organisms/configuration/Distance';
import ElevationValue from '@/components/organisms/configuration/Elevation';
import MapSelection from '@/components/organisms/configuration/Map';
import ProjectileSelection from '@/components/organisms/configuration/Projectile';
import TimeOfFlightValue from '@/components/organisms/configuration/TimeOfFlight';
import Footer from '@/components/organisms/Footer';
import Motd from '@/components/organisms/Motd';
import OverlayCard from '@/components/organisms/OverlayCard';
import Canvas from '@/components/templates/Canvas';
import { usePropStore } from '@/stores/props';

export default function DesktopView() {
  const t = useTranslations();

  const { locale } = useRouter();

  const version = usePropStore((s) => s.version);
  const motd = usePropStore((s) => s.motd);

  return (
    <Box
      className="desktop"
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr min-content',
        rowGap: 4,
      }}
      zIndex={1}
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
                md: '80vw',
                lg: '75vw',
              },

              padding: 4,
              gap: 4,
            }}
          >
            <Canvas />

            <ColumnContainer>
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

              <OverlayCard />
            </ColumnContainer>
          </Box>
        </Box>
      </Box>

      <Footer version={version!} />

      {locale === 'lolcat-US' && <Konata />}
    </Box>
  );
}
