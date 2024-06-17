import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import MapItem from '@/components/atoms/configuration/map/Item';
import ScrollBox from '@/components/molecules/ScrollBox';
import { maps } from '@/config/maps';
import { useDataStore } from '@/stores/data';

export default function MapSelection() {
  const t = useTranslations();

  const [listboxOpen, setListboxOpen] = React.useState<boolean>(false);

  const [mapIndex, setMapIndex] = useDataStore((s) => [
    s.mapIndex,
    s.setMapIndex,
  ]);

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.map')}</Typography>

      <Select
        value={mapIndex}
        onChange={(event, newValue) => setMapIndex(newValue as number)}
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
              <MapItem item={item} />
            </Option>
          ))}
        </ScrollBox>
      </Select>
    </DataContainer>
  );
}
