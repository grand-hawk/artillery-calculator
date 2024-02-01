import todec from '2dec';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../DataContainer';
import { projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/constants';

export default function ProjectileSelection() {
  const [projectileIndex, setProjectileIndex] = useDataStore((s) => [
    s.projectileIndex,
    s.setProjectileIndex,
  ]);

  const projectileCategories: Record<string, Projectile[]> = {};

  for (const projectile of projectiles) {
    const gunName = projectile.gun?.name || 'no_name';
    if (!projectileCategories[gunName]) projectileCategories[gunName] = [];
    projectileCategories[gunName].push(projectile);
  }

  console.log(projectileCategories);

  return (
    <DataContainer>
      <Typography level="title-md">Projectile</Typography>
      <Select
        value={projectileIndex}
        onChange={(event, newValue) => setProjectileIndex(newValue as number)}
        placeholder="Select a projectile..."
        slotProps={{
          listbox: {
            placement: 'top-end',
          },
        }}
      >
        {Object.keys(projectileCategories).map((key, categoryIndex) => {
          const items = projectileCategories[key];

          return (
            <React.Fragment key={categoryIndex}>
              <Typography level="body-sm" mt={1} pl={1}>
                {key !== 'no_name' && key}
              </Typography>

              {items.map((projectile, index) => (
                <Option
                  key={index}
                  value={projectiles.indexOf(projectile)}
                  label={projectile.name}
                >
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      gap: 2,
                    }}
                  >
                    <Typography>{projectile.name}</Typography>
                    <Typography level="body-sm">
                      {todec(projectile.velocity)} m/s
                    </Typography>
                  </Stack>
                </Option>
              ))}
            </React.Fragment>
          );
        })}
      </Select>
    </DataContainer>
  );
}