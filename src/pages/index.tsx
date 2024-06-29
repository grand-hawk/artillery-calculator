import Head from 'next/head';
import React from 'react';
import { isMobile } from 'react-device-detect';

import Page from '@/components/layout/Page';
import PropUpdater from '@/components/utils/PropUpdater';
import Umami from '@/components/utils/Umami';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';
import locales from '@/i18n';
import getProps, { PropsMaxAge } from '@/lib/server/getProps';
import { usePropStore, type Props } from '@/stores/props';
import DesktopView from '@/views/Desktop';
import MobileView from '@/views/Mobile';

import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next';

export async function getStaticProps(context: GetStaticPropsContext): Promise<
  GetStaticPropsResult<{
    messages: unknown;

    fallback: {
      '/api/props': Props;
    };
  }>
> {
  return {
    props: {
      messages: locales[context.locale!],

      fallback: {
        '/api/props': await getProps(),
      },
    },
    revalidate: PropsMaxAge,
  };
}

export default function Index({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const setVersion = usePropStore((s) => s.setVersion);
  const setMotd = usePropStore((s) => s.setMotd);

  React.useEffect(() => {
    const { version, motd } = fallback['/api/props'];

    if (version) setVersion(version);
    if (motd) setMotd(motd);
  }, [fallback, setVersion, setMotd]);

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
        {isMobile || isSmallScreen ? <MobileView /> : <DesktopView />}
      </Page>

      <Umami />
      <PropUpdater />
    </>
  );
}
