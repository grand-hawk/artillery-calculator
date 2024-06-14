import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import { calculateTimeOfFlight } from '@/utils/math';

export default function TimeOfFlightValue({
  elevation: [lowArc, highArc],
  velocity,
}: {
  elevation: [number, number];
  velocity: number;
}) {
  const t = useTranslations();

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.timeOfFlight')}</Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        {lowArc ? (
          <>
            <Typography>
              {todec(calculateTimeOfFlight(lowArc, velocity))}
            </Typography>

            {highArc && (
              <>
                <Typography component="b" level="body-sm">
                  {t('typography.or')}
                </Typography>

                <Typography>
                  {t(`units.second`, {
                    value: todec(calculateTimeOfFlight(highArc, velocity)),
                  })}
                </Typography>
              </>
            )}
          </>
        ) : (
          <Typography>{t('typography.notApplicable')}</Typography>
        )}
      </Stack>
    </DataContainer>
  );
}
