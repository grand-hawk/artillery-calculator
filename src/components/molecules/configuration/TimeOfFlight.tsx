import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import { calculateTimeOfFlight } from '@/utils/math';

export default function TimeOfFlightValue({
  elevation: lowArcElevation,
  velocity,
}: {
  elevation: number;
  velocity: number;
}) {
  const t = useTranslations();

  const highArcElevation = 90 - lowArcElevation;
  const highArcTOF = calculateTimeOfFlight(highArcElevation, velocity);

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.timeOfFlight')}</Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        {lowArcElevation ? (
          <>
            <Typography>
              {todec(calculateTimeOfFlight(lowArcElevation, velocity))}
            </Typography>

            <Typography component="b" level="body-sm">
              {t('typography.or')}
            </Typography>

            <Typography>
              {t(`units.second`, { value: todec(highArcTOF) })}
            </Typography>
          </>
        ) : (
          <Typography>{t('typography.notApplicable')}</Typography>
        )}
      </Stack>
    </DataContainer>
  );
}
