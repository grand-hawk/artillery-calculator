import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/configuration/DataContainer';

export default function SimpleValue({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <DataContainer>
      <Typography level="title-md">{name}</Typography>

      <Typography>{value}</Typography>
    </DataContainer>
  );
}
