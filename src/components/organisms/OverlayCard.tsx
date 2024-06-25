import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import HeaderCard from '@/components/atoms/HeaderCard';
import OverlayCardLink from '@/components/atoms/overlayCard/Link';

function OverlayCard() {
  const t = useTranslations();

  return (
    <HeaderCard sx={{ backgroundColor: 'unset' }} variant="outlined">
      <Typography>
        {t.rich('typography.downloadOverlay', {
          link: (chunks) => <OverlayCardLink renderText={chunks} />,
        })}
      </Typography>
    </HeaderCard>
  );
}

export default OverlayCard;
