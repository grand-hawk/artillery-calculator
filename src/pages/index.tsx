import Head from 'next/head';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

import Page from '@/components/layout/Page';
import { theme } from '@/components/utils/Theme';
import DesktopView from '@/components/views/Desktop';
import MobileView from '@/components/views/Mobile';
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
import getVersion from '@/utils/version';

import type {
  MobileModeMutable,
  MobileModes,
} from '@/components/molecules/configuration/MobileMode';
import type { Projectile } from '@/config/projectiles';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export interface ViewProps {
  mobileMode: MobileModeMutable;
  motd: string | null;
  elevation: number;
  projectile: Projectile;
  azimuth: number;
  distance: number;
  version: string;
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    version: string;
    motd: string | null;
  }>
> {
  return {
    props: {
      version: getVersion(),
      motd: await getMotd(),
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

  const projectileData = useDataStore((s) => s.projectile);
  const projectile =
    guns[projectileData.gunKey].projectiles[projectileData.index];

  const distance = studsToMeters(
    calculateDistance(gun.x, gun.y, target.x, target.y) * map.size,
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
        {isMobileDevice || isSmallScreen ? (
          <MobileView
            mobileMode={mobileMode}
            motd={motd}
            elevation={elevation}
            azimuth={azimuth}
            distance={distance}
            projectile={projectile}
            version={version}
          />
        ) : (
          <DesktopView
            mobileMode={mobileMode}
            motd={motd}
            elevation={elevation}
            azimuth={azimuth}
            distance={distance}
            projectile={projectile}
            version={version}
          />
        )}
      </Page>
    </>
  );
}
