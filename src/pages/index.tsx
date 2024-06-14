import Head from 'next/head';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

import Page from '@/components/layout/Page';
import { theme } from '@/components/utils/Theme';
import Umami from '@/components/utils/Umami';
import { maps } from '@/config/maps';
import { guns } from '@/config/projectiles';
import useHeightmapContext from '@/hooks/useHeightmapContext';
import useIsMobile from '@/hooks/useIsMobile';
import locales from '@/i18n';
import getMotd from '@/lib/server/getMotd';
import { useDataStore } from '@/stores/data';
import {
  calculateAzimuth,
  calculateDistance,
  calculateHighElevation,
  calculateLowElevation,
  studsToMeters,
} from '@/utils/math';
import getVersion from '@/utils/version';
import DesktopView from '@/views/Desktop';
import MobileView from '@/views/Mobile';

import type {
  MobileModeMutable,
  MobileModes,
} from '@/components/molecules/configuration/MobileMode';
import type { Projectile } from '@/config/projectiles';
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next';

export interface ViewProps {
  mobileMode: MobileModeMutable;
  motd: string | null;
  elevation: [number, number];
  projectile: Projectile;
  azimuth: number;
  distance: number;
  version: string;
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<
  GetStaticPropsResult<{
    version: string;
    motd: string | null;
    messages: unknown;
  }>
> {
  return {
    props: {
      version: getVersion(),
      motd: await getMotd(),
      messages: locales[context.locale!],
    },
    revalidate: 120,
  };
}

export default function Index({
  version,
  motd,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isSmallScreen = !useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
  );
  const isMobileDevice = useIsMobile();
  const mobileMode = React.useRef<MobileModes>('gun');

  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];

  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  let gunHeight = 0;
  let targetHeight = 0;

  const heightmapContext = useHeightmapContext();
  if (heightmapContext && map.heightmap) {
    gunHeight =
      (heightmapContext.getImageData(
        gun.x * map.heightmap.width,
        gun.y * map.heightmap.height,
        1,
        1,
      ).data[0] /
        255) *
      map.heightmap[255];

    targetHeight =
      (heightmapContext.getImageData(
        target.x * map.heightmap.width,
        target.y * map.heightmap.height,
        1,
        1,
      ).data[0] /
        255) *
      map.heightmap[255];
  }

  const projectileData = useDataStore((s) => s.projectile);
  const projectile =
    guns[projectileData.gunKey].projectiles[projectileData.index];

  const heightDifference =
    studsToMeters(targetHeight) - studsToMeters(gunHeight);
  const distance = studsToMeters(
    calculateDistance(gun.x, gun.y, target.x, target.y) * map.size,
  );
  const distanceWithHeight = studsToMeters(
    calculateDistance(
      gun.x,
      gun.y,
      target.x,
      target.y,
      gunHeight,
      targetHeight,
    ) * map.size,
  );
  const lowElevation = calculateLowElevation(
    distance,
    projectile.velocity,
    heightDifference,
  );
  const highElevation = calculateHighElevation(
    distance,
    projectile.velocity,
    heightDifference,
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
        {isMobileDevice || isSmallScreen ? (
          <MobileView
            mobileMode={mobileMode}
            motd={motd}
            elevation={[lowElevation, highElevation]}
            azimuth={azimuth}
            distance={distanceWithHeight}
            projectile={projectile}
            version={version}
          />
        ) : (
          <DesktopView
            mobileMode={mobileMode}
            motd={motd}
            elevation={[lowElevation, highElevation]}
            azimuth={azimuth}
            distance={distanceWithHeight}
            projectile={projectile}
            version={version}
          />
        )}
      </Page>

      <Umami />
    </>
  );
}
