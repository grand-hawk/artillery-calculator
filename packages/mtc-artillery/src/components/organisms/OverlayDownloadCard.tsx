import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DownloadOverlayCardLink from '@/components/atoms/downloadOverlayCard/Link';
import HeaderCard from '@/components/atoms/HeaderCard';

export default function OverlayDownloadCard() {
  const t = useTranslations();

  if (!process.env.NEXT_PUBLIC_DOWNLOAD_OVERLAY_URL) return null;

  return (
    <HeaderCard sx={{ backgroundColor: 'unset' }} variant="outlined">
      <Typography>
        {t.rich('typography.downloadOverlay', {
          link: () => <DownloadOverlayCardLink />,
        })}
      </Typography>
    </HeaderCard>
  );
}
