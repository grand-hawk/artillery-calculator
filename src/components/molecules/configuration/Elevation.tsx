import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';

export default function ElevationValue({
  elevation: [lowArc, highArc],
}: {
  elevation: [number, number];
}) {
  const t = useTranslations();

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.elevation')}</Typography>

      <Stack direction="row" spacing={1} alignItems="center">
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
