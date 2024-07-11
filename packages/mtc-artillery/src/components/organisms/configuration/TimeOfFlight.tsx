import todec from '2dec';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import useDistanceWithHeight from '@/hooks/data/useDistanceWithHeight';
import useElevation from '@/hooks/data/useElevation';
import useProjectile from '@/hooks/data/useProjectile';
import { calculateTimeOfFlight } from '@/utils/math';

export default function TimeOfFlightValue({
  minimized = false,
}: {
  minimized?: boolean;
}) {
  const t = useTranslations();

  const { velocity } = useProjectile();
  const [lowArc, highArc] = useElevation();
  const distance = useDistanceWithHeight();

  const lowArcTof = todec(
    Math.max(0, calculateTimeOfFlight(lowArc, velocity, distance)),
  );
  const highArcTof = todec(calculateTimeOfFlight(highArc, velocity, distance));

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.timeOfFlight')}</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {lowArc ? (
          <>
            <Typography>{lowArcTof}</Typography>

            {!!highArc && (
              <>
                <Typography component="b" level="body-sm">
                  {minimized ? '/' : t('typography.or')}
                </Typography>

                <Typography>
                  {minimized
                    ? highArcTof
                    : t('units.second', {
                        value: highArcTof,
                      })}
                </Typography>
              </>
            )}
          </>
        ) : (
          <Typography>{t('typography.notApplicable')}</Typography>
        )}
      </Box>
    </DataContainer>
  );
}
