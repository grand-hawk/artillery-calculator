import Tab from '@mui/joy/Tab';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import Head from 'next/head';
import React from 'react';

import Page from '@/components/layout/Page';
import Code from '@/components/molecules/Code';
import CustomTabList from '@/components/molecules/CustomTabList';
import CustomTabPanel from '@/components/molecules/CustomTabPanel';
import PlatformDownloads from '@/components/organisms/PlatformDownloads';
import getReleases from '@/lib/server/getReleases';

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
    revalidate: 120,
  };
}

export default function Index({
  releases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

        <Tabs
          sx={{
            background: 'none',
            gap: 2,
            marginY: 2,
          }}
        >
          <CustomTabList>
            <Tab disableIndicator value={0}>
              Windows
            </Tab>

            <Tab disableIndicator value={1}>
              Linux
            </Tab>

            <Tab disableIndicator value={2}>
              MacOS
            </Tab>
          </CustomTabList>

          <CustomTabPanel value={0}>
            <Typography marginBottom={2}>
              Download one of the following executable(s) and run it. It will
              install the <Code>mtc-artillery-overlay</Code> application on your
              system.
            </Typography>

            <PlatformDownloads platformReleases={releases.win} />

            <Typography marginTop={2}>
              It might say that the executable is a virus or trojan. It is not,
              this is a common issue for compiled languages. The executables are
              built by GitHub and not an individual, everything is provably
              safe.
            </Typography>
          </CustomTabPanel>

          <CustomTabPanel value={1}>
            <PlatformDownloads platformReleases={releases.linux} />
          </CustomTabPanel>

          <CustomTabPanel value={2}>
            <PlatformDownloads platformReleases={releases.macos} />
          </CustomTabPanel>
        </Tabs>

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
