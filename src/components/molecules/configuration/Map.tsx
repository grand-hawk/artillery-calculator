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

  const mapIndex = useDataStore((s) => s.mapIndex);
  const setMapIndex = useDataStore((s) => s.setMapIndex);

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.map')}</Typography>

      <Select
        listboxOpen={listboxOpen}
        slotProps={{
          listbox: {
            placement: 'top-end',
          },
        }}
        sx={{
          userSelect: 'none',
        }}
        value={mapIndex}
        variant="soft"
        onChange={(event, newValue) => setMapIndex(newValue as number)}
        onClose={() => setListboxOpen(false)}
        onListboxOpenChange={() => setListboxOpen(true)}
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
