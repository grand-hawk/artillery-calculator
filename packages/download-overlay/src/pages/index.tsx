import Typography from '@mui/joy/Typography';
import Head from 'next/head';
import React from 'react';
import { useIsClient } from 'usehooks-ts';

import Page from '@/components/layout/Page';
import getReleases from '@/lib/server/getReleases';
import DownloadTabs from '@/templates/DownloadTabs';

import type { Releases } from '@/lib/server/getReleases';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ releases: Releases }>
> {
  let releases: Releases | undefined;

  if (process.env.NODE_ENV === 'development')
    releases = {
      win: {
        arm: {
          arm: { name: 'ARM', browser_download_url: '', recommended: false },
        },
        x64: {
          x64: { name: 'x64', browser_download_url: '', recommended: false },
        },
      },
      linux: {
        arm: {
          arm: { name: 'ARM', browser_download_url: '', recommended: false },
        },
        x64: {
          x64: { name: 'x64', browser_download_url: '', recommended: false },
        },
      },
      macos: {
        arm: {
          arm: { name: 'ARM', browser_download_url: '', recommended: false },
        },
        x64: {
          x64: { name: 'x64', browser_download_url: '', recommended: false },
        },
      },
    } as Releases;
  else releases = await getReleases();

  return {
    props: {
      releases,
    },
    revalidate: 300,
  };
}

export default function Index({
  releases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isClient = useIsClient();

  return (
    <>
      <Head>
        <title>Overlay download</title>
      </Head>

      <Page>
        <Typography
          level="h1"
          sx={(theme) => ({
            fontWeight: 500,
            color: theme.palette.primary[200],
          })}
        >
          Download overlay
        </Typography>

        {isClient && <DownloadTabs releases={releases} />}

        <Typography
          component="a"
          href={`https://github.com/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/releases/latest`}
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          View all releases on GitHub
        </Typography>
      </Page>
    </>
  );
}
