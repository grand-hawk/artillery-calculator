import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import useElevation from '@/hooks/data/useElevation';

export default function ElevationValue() {
  const t = useTranslations();

  const [lowArc, highArc] = useElevation();

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.elevation')}</Typography>

      <Stack alignItems="center" direction="row" spacing={1}>
        {lowArc ? (
          <>
            <Typography>{todec(lowArc)}°</Typography>

            {!!highArc && (
              <>
                <Typography component="b" level="body-sm">
                  {t('typography.or')}
                </Typography>

                <Typography>{todec(highArc)}°</Typography>
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
