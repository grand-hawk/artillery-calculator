import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import useGameMap from '@/hooks/data/useGameMap';
import { useDataStore } from '@/stores/data';

import type { SliderProps } from '@mui/joy/Slider';

export default function HeightmapOpacitySlider({ ...props }: SliderProps) {
  const t = useTranslations();

  const gameMap = useGameMap();

  const heightmapOpacity = useDataStore((s) => s.heightmapOpacity);
  const setHeightmapOpacity = useDataStore((s) => s.setHeightmapOpacity);

  return (
    <DataContainer
      className="datacontainer datacontainer-grid"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <Typography level="title-md">
        {t('typography.heightmapOpacity')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <Slider
          color="danger"
          disabled={!gameMap.heightmap}
          max={1}
          min={0}
          step={0.1}
          value={heightmapOpacity}
          onChange={(_, value) => setHeightmapOpacity(value as number)}
          {...props}
        />
      </Box>
    </DataContainer>
  );
}
