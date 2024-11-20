'use client';

import Tab from '@mui/joy/Tab';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { useLocalStorage } from 'usehooks-ts';

import Code from '@/components/molecules/Code';
import CustomTabList from '@/components/molecules/CustomTabList';
import CustomTabPanel from '@/components/molecules/CustomTabPanel';
import WarningCard from '@/components/molecules/WarningCard';
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
        <Typography sx={{ marginBottom: 2 }}>
          Download one of the following executable(s) and run it. It will
          install the <Code>mtc-artillery-overlay</Code> application on your
          system.
        </Typography>

        <PlatformDownloads platformReleases={releases.win} />

        <WarningCard sx={{ marginTop: 2 }}>
          <Typography>
            Some executables might be flagged as a virus or trojan, but this is
            a common issue with compiled languages. All executables are safely
            built by GitHub and are fully verifiable.
          </Typography>
        </WarningCard>
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
