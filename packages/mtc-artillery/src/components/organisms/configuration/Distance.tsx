import todec from '2dec';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/DataContainer';
import useDistanceWithHeight from '@/hooks/data/useDistanceWithHeight';

export default function DistanceValue() {
  const t = useTranslations();

  const distanceWithHeight = useDistanceWithHeight();

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.distance')}</Typography>

      <Typography>
        {t(`units.meter`, { value: todec(distanceWithHeight) })}
      </Typography>
    </DataContainer>
  );
}
