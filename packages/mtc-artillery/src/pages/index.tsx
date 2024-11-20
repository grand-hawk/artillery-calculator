import Head from 'next/head';
import { useTranslations } from 'next-intl';
import React from 'react';
import { isMobile } from 'react-device-detect';

import Page from '@/components/layout/Page';
import Settings from '@/components/templates/Settings';
import PropUpdater from '@/components/utils/PropUpdater';
import Umami from '@/components/utils/Umami';
import useIsSmallScreen from '@/hooks/useIsSmallScreen';
import locales from '@/i18n';
import { getCachedProps } from '@/lib/server/getProps';
import { usePropStore } from '@/stores/props';
import DesktopView from '@/views/Desktop';
import MobileView from '@/views/Mobile';

import type { Props } from '@/stores/props';
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
        '/api/props': await getCachedProps(),
      },
    },
  };
}

export default function Index({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const t = useTranslations();

  const isSmallScreen = useIsSmallScreen();

  const setVersion = usePropStore((s) => s.setVersion);
  const setMotd = usePropStore((s) => s.setMotd);

  React.useEffect(() => {
    const { version, motd } = fallback['/api/props'];

    if (version) setVersion(version);
    if (motd) setMotd(motd);
  }, [fallback, setVersion, setMotd]);

  return (
    <>
      <Head>
        <title>MTC Artillery</title>
        <meta content={t('meta.description')} name="description" />
        <meta
          content="Roblox, Artillery, Artillery Calculator, MTC, MTC4, Multicrew Tank Combat, Multicrew Tank Combat 4"
          name="keywords"
        />
      </Head>

      <Page>
        {isMobile || isSmallScreen ? <MobileView /> : <DesktopView />}
      </Page>

      <Umami />
      <PropUpdater />
      <Settings />
    </>
  );
}
