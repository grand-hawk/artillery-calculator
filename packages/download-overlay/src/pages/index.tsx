import Tab from '@mui/joy/Tab';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import Head from 'next/head';
import React from 'react';

import Page from '@/components/layout/Page';
import CustomTabList from '@/components/molecules/CustomTabList';
import CustomTabPanel from '@/components/molecules/CustomTabPanel';
import PlatformDownloads from '@/components/organisms/PlatformDownloads';
import getReleases from '@/lib/server/getReleases';

import type { Releases } from '@/lib/server/getReleases';
import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ releases: Releases }>
> {
  return {
    props: {
      releases: await getReleases(),
    },
    revalidate: 60,
  };
}

export default function Index({
  releases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  React.useEffect(() => console.log('Releases:', releases));

  return (
    <>
      <Head>
        <title>Artillery overlay</title>
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
            <PlatformDownloads platformReleases={releases.win} />
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
