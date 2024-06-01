import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
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
  const highArcElevation = 90 - lowArcElevation;
  const highArcTOF = calculateTimeOfFlight(highArcElevation, velocity);

  return (
    <DataContainer>
      <Typography level="title-md">Time of flight</Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {lowArcElevation ? (
          <>
            <Typography>
              {todec(calculateTimeOfFlight(lowArcElevation, velocity))}
            </Typography>

            <Typography component="b" level="body-sm">
              or
            </Typography>

            <Typography>
              {todec(highArcTOF)} second
              {highArcTOF >= 1 && highArcTOF < 2 ? '' : 's'}
            </Typography>
          </>
        ) : (
          <Typography>N/A</Typography>
        )}
      </Stack>
    </DataContainer>
  );
}
