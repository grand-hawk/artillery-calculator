import Head from 'next/head';
import React from 'react';

import Page from '@/components/layout/Page';
import Umami from '@/components/utils/Umami';
import useIsMobile from '@/hooks/useIsMobile';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';
import locales from '@/i18n';
import getMotd from '@/lib/server/getMotd';
import getVersion from '@/utils/version';
import DesktopView from '@/views/Desktop';
import MobileView from '@/views/Mobile';

import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next';

export interface ViewProps {
  motd: string | null;
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
  const isMobileDevice = useIsMobile();
  const isSmallScreen = useIsSmallScreen();

  return (
    <>
      <Head>
        <title>MTC Artillery</title>
        <meta
          content="An artillery calculator made for Multicrew Tank Combat on Roblox."
          name="description"
        />
        <meta
          content="Roblox, Artillery, Artillery Calculator, MTC, Multicrew Tank Combat"
          name="keywords"
        />
      </Head>

      <Page>
        {isMobileDevice || isSmallScreen ? (
          <MobileView motd={motd} version={version} />
        ) : (
          <DesktopView motd={motd} version={version} />
        )}
      </Page>

      <Umami />
    </>
  );
}
