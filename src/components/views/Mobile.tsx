import todec from '2dec';
import Box from '@mui/joy/Box';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import ConfigurationGroup from '@/components/atoms/ConfigurationGroup';
import ElevationValue from '@/components/molecules/configuration/Elevation';
import MapSelection from '@/components/molecules/configuration/Map';
import MobileMode from '@/components/molecules/configuration/MobileMode';
import ProjectileSelection from '@/components/molecules/configuration/Projectile';
import SimpleValue from '@/components/molecules/configuration/Simple';
import TimeOfFlightValue from '@/components/molecules/configuration/TimeOfFlight';
import Footer from '@/components/organisms/Footer';
import Motd from '@/components/organisms/Motd';
import Canvas from '@/components/templates/Canvas';

import type { ViewProps } from '@/pages';

export default function MobileView({
  mobileMode,
  motd,
  elevation,
  azimuth,
  distance,
  projectile,
  version,
}: ViewProps) {
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
          gridAutoRows: '1fr 1fr',

          gap: 4,

          width: '100%',

          '& [aria-roledescription]': {
            aspectRatio: '1/1',
          },
        }}
      >
        <Canvas isMobile mobileMode={mobileMode} />

        <ColumnContainer>
          <Motd message={motd || undefined} />

          <MobileMode mobileMode={mobileMode} />

          <ConfigurationGroup>
            <ElevationValue elevation={elevation} />
            <SimpleValue name="Azimuth" value={`${todec(azimuth)}°`} />
            <SimpleValue
              name="Distance"
              value={`${todec(distance)} meter${distance >= 1 && distance < 2 ? '' : 's'}`}
            />
            <TimeOfFlightValue
              elevation={elevation}
              velocity={projectile.velocity}
            />
            <ProjectileSelection />
            <MapSelection />
          </ConfigurationGroup>
        </ColumnContainer>
      </Box>

      <Footer version={version} sx={{ width: '100%' }} />
    </Box>
  );
}
