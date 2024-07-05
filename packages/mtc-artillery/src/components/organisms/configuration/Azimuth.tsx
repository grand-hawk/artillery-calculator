import todec from '2dec';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import useAzimuth from '@/hooks/data/useAzimuth';

export default function AzimuthValue() {
  const t = useTranslations();

  const azimuth = useAzimuth();

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.azimuth')}</Typography>

      <Typography>{todec(azimuth)}°</Typography>
    </DataContainer>
  );
}
