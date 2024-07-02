import Divider from '@mui/joy/Divider';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import MapItem from '@/components/molecules/configuration/map/Item';
import ScrollBox from '@/components/molecules/ScrollBox';
import { gameMaps } from '@/config/maps';
import { useDataStore } from '@/stores/data';

import type { MapId } from '@/config/maps';

export default function MapSelection() {
  const t = useTranslations();

  const [listboxOpen, setListboxOpen] = React.useState<boolean>(false);

  const mapId = useDataStore((s) => s.mapId);
  const setMapId = useDataStore((s) => s.setMapId);

  return (
    <DataContainer>
      <Typography level="title-md" sx={{ marginY: 0.5 }}>
        {t('typography.map')}
      </Typography>

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
        value={mapId}
        variant="soft"
        onChange={(event, newValue) => setMapId(newValue!)}
        onClose={() => setListboxOpen(false)}
        onListboxOpenChange={() => setListboxOpen(true)}
      >
        <ScrollBox dependency={listboxOpen}>
          <Divider sx={{ marginY: 0.5 }}>{t('typography.active')}</Divider>

          {(Object.keys(gameMaps) as MapId[])
            .filter((value) => gameMaps[value].inRotation)
            .map((value) => (
              <Option key={value} value={value}>
                <MapItem gameMap={gameMaps[value]} />
              </Option>
            ))}

          <Divider sx={{ marginY: 1.5 }} />

          {(Object.keys(gameMaps) as MapId[])
            .filter((value) => !gameMaps[value].inRotation)
            .map((value) => (
              <Option key={value} value={value}>
                <MapItem gameMap={gameMaps[value]} />
              </Option>
            ))}
        </ScrollBox>
      </Select>
    </DataContainer>
  );
}
