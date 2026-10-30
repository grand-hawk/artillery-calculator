import todec from '2dec';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/DataContainer';
import useArcs from '@/hooks/data/useArcs';

export default function ElevationValue() {
  const t = useTranslations();

  const [lowArc, highArc] = useArcs();

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.elevation')}</Typography>

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
            <Typography>{todec(lowArc.elevation)}°</Typography>

            {highArc && (
              <>
                <Typography component="b" level="body-sm">
                  {t('typography.or')}
                </Typography>

                <Typography>{todec(highArc.elevation)}°</Typography>
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
