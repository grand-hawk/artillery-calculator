'use client';

import Tab from '@mui/joy/Tab';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { useLocalStorage } from 'usehooks-ts';

import Code from '@/components/molecules/Code';
import CustomTabList from '@/components/molecules/CustomTabList';
import CustomTabPanel from '@/components/molecules/CustomTabPanel';
import PlatformDownloads from '@/components/organisms/PlatformDownloads';

import type { Releases } from '@/lib/server/getReleases';

export default function DownloadTabs({ releases }: { releases: Releases }) {
  const [activeTab, setActiveTab] = useLocalStorage<number>('tab', 0);

  return (
    <Tabs
      sx={{
        background: 'none',
        gap: 2,
        marginY: 2,
      }}
      value={activeTab}
      onChange={(_, value) => setActiveTab(value as number)}
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
          It might say that the executable is a virus or trojan. It is not, this
          is a common issue for compiled languages. The executables are built by
          GitHub and not an individual, everything is provably safe.
        </Typography>
      </CustomTabPanel>

      <CustomTabPanel value={1}>
        <PlatformDownloads platformReleases={releases.linux} />
      </CustomTabPanel>

      <CustomTabPanel value={2}>
        <PlatformDownloads platformReleases={releases.macos} />
      </CustomTabPanel>
    </Tabs>
  );
}
