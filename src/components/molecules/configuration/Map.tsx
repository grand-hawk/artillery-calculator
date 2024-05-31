import Box from '@mui/joy/Box';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import React from 'react';

import DataContainer from '../../atoms/configuration/DataContainer';
import ScrollBox from '../ScrollBox';
import { maps } from '@/config/maps';
import { useDataStore } from '@/stores/data';

export default function MapSelection() {
  const [listboxOpen, setListboxOpen] = React.useState<boolean>(false);

  const [mapIndex, setMapIndex] = useDataStore((s) => [
    s.mapIndex,
    s.setMapIndex,
  ]);

  return (
    <DataContainer>
      <Typography level="title-md">Map</Typography>

      <Select
        value={mapIndex}
        onChange={(event, newValue) => setMapIndex(newValue as number)}
        placeholder="Select a map..."
        slotProps={{
          listbox: {
            placement: 'top-end',
          },
        }}
        listboxOpen={listboxOpen}
        onListboxOpenChange={() => setListboxOpen(true)}
        onClose={() => setListboxOpen(false)}
        variant="soft"
      >
        <ScrollBox dependency={listboxOpen}>
          {maps.map((item, index) => (
            <Option key={index} value={index}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',

                    '& img': {
                      borderRadius: theme.radius.sm,
                    },
                  })}
                >
                  <Image
                    src={`/images/webp/${item.image}_small.webp`}
                    alt=""
                    height={24}
                    width={24}
                  />
                </Box>

                {item.name}
              </Stack>
            </Option>
          ))}
        </ScrollBox>
      </Select>
    </DataContainer>
  );
}
