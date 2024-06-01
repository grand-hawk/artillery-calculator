import todec from '2dec';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Head from 'next/head';
import React from 'react';

import Dynamic from '@/components/layout/Dynamic';
import Page from '@/components/layout/Page';
import ElevationValue from '@/components/molecules/configuration/Elevation';
import MapSelection from '@/components/molecules/configuration/Map';
import MobileMode from '@/components/molecules/configuration/MobileMode';
import ProjectileSelection from '@/components/molecules/configuration/Projectile';
import SimpleValue from '@/components/molecules/configuration/Simple';
import TimeOfFlightValue from '@/components/molecules/configuration/TimeOfFlight';
import Canvas from '@/components/organisms/Canvas';
import Footer from '@/components/organisms/Footer';
import Motd from '@/components/organisms/Motd';
import { maps } from '@/config/maps';
import { guns } from '@/config/projectiles';
import useIsMobile from '@/hooks/useIsMobile';
import getMotd from '@/lib/server/getMotd';
import { useDataStore } from '@/stores/data';
import {
  calculateAzimuth,
  calculateDistance,
  calculateElevation,
  metersToStuds,
  studsToMeters,
} from '@/utils/math';

import type { MobileModes } from '@/components/molecules/configuration/MobileMode';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    version: string;
    motd: string | null;
  }>
> {
  const version = (process.env.VERCEL_GIT_COMMIT_SHA ?? 'dev').slice(0, 9);

  return {
    props: {
      version,
      motd: await getMotd(),
    },
    revalidate: 120,
  };
}

export default function Index({
  version,
  motd,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isMobile = useIsMobile();
  const mobileMode = React.useRef<MobileModes>('gun');

  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];

  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  const projectileData = useDataStore((s) => s.projectile);
  const projectile =
    guns[projectileData.gunKey].projectiles[projectileData.index];

  const distance = studsToMeters(
    calculateDistance(gun.x, gun.y, target.x, target.y) * (map?.size || 0),
  );
  const elevation = calculateElevation(
    metersToStuds(distance),
    projectile.velocity,
  );
  const azimuth = calculateAzimuth(gun.x, gun.y, target.x, target.y);

  return (
    <>
      <Head>
        <title>MTC Artillery</title>
        <meta
          name="description"
          content="An artillery calculator made for Multicrew Tank Combat on Roblox."
        />
        <meta
          name="keywords"
          content="Roblox, Artillery, Artillery Calculator, MTC, Multicrew Tank Combat"
        />
      </Head>

      <Page>
        <Dynamic>
          <Canvas isMobile={isMobile} mobileMode={mobileMode} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <Motd message={motd || undefined} />

            <Stack
              spacing={1}
              sx={{
                '& > div': {
                  alignItems: 'center',
                  height: 35,
                },
              }}
            >
              {isMobile && <MobileMode mobileMode={mobileMode} />}

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
            </Stack>

            {!isMobile && (
              <Typography>
                Left click to set the gun position. Right click to set the
                target position. Hold middle click to move the map around, and
                scroll wheel to zoom.
              </Typography>
            )}

            <Footer version={version} />
          </Box>
        </Dynamic>
      </Page>
    </>
  );
}
