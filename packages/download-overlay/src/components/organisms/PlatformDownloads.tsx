'use client';

import Box from '@mui/joy/Box';
import React from 'react';

import PrimaryButton from '../molecules/PrimaryButton';
import SecondaryButton from '../molecules/SecondaryButton';
import useArch from '@/hooks/useArch';

import type { PlatformReleases } from '@/lib/server/getReleases';

export default function PlatformDownloads({
  platformReleases,
}: {
  platformReleases: PlatformReleases;
}) {
  const arch = useArch();

  const downloads = Object.values(
    arch
      ? platformReleases[arch]
      : { ...platformReleases.arm, ...platformReleases.x64 },
  )
    // put releases with recommended up top
    .sort((a, b) =>
      a.recommended === b.recommended ? 0 : a.recommended ? -1 : 1,
    );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      {downloads.length > 0
        ? downloads.map((release, index) => {
            if (index === 0)
              return (
                <PrimaryButton key={index} href={release.browser_download_url}>
                  {release.name}
                </PrimaryButton>
              );

            return (
              <SecondaryButton key={index} href={release.browser_download_url}>
                {release.name}
              </SecondaryButton>
            );
          })
        : 'No downloads found'}
    </Box>
  );
}
