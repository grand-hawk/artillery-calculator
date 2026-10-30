import todec from '2dec';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/DataContainer';
import useArcs from '@/hooks/data/useArcs';

export default function TimeOfFlightValue({
  minimized = false,
}: {
  minimized?: boolean;
}) {
  const t = useTranslations();

  const [lowArc, highArc] = useArcs();

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
            <Typography>{todec(lowArc.timeOfFlight)}</Typography>

            {highArc && (
              <>
                <Typography component="b" level="body-sm">
                  {minimized ? '/' : t('typography.or')}
                </Typography>

                <Typography>
                  {minimized
                    ? todec(highArc.timeOfFlight)
                    : t('units.second', {
                        value: todec(highArc.timeOfFlight),
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
