import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';

export default function ElevationValue({
  elevation: lowArcElevation,
}: {
  elevation: number;
}) {
  const t = useTranslations();

  // Yeah it's just that...
  const highArcElevation = 90 - lowArcElevation;

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.elevation')}</Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        {lowArcElevation ? (
          <>
            <Typography>{todec(lowArcElevation)}°</Typography>

            <Typography component="b" level="body-sm">
              {t('typography.or')}
            </Typography>

            <Typography>{todec(highArcElevation)}°</Typography>
          </>
        ) : (
          <Typography>{t('typography.notApplicable')}</Typography>
        )}
      </Stack>
    </DataContainer>
  );
}
