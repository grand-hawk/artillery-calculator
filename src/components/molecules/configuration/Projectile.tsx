import UnfoldMore from '@mui/icons-material/UnfoldMore';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import DataContainer from '@/components/atoms/configuration/DataContainer';
import ProjectileButton from '@/components/atoms/configuration/projectile/Button';
import ScrollBox from '@/components/molecules/ScrollBox';
import { guns } from '@/config/projectiles';
import { useDataStore } from '@/stores/data';

export default function ProjectileSelection() {
  const t = useTranslations();

  const tooltip = React.useRef<HTMLDivElement>(null);
  const selectionChanged = React.useRef<number>(0);

  const projectileData = useDataStore((s) => s.projectile);

  const [selectionOpen, setSelectionOpen] = React.useState<boolean>(false);
  const [selectionTab, setSelectionTab] = React.useState<number>(
    Object.keys(guns).findIndex((key) => key === projectileData.gunKey),
  );

  function canChangeSelection() {
    const can = selectionChanged.current + 250 < performance.now();

    if (!can) return false;

    selectionChanged.current = performance.now();

    return true;
  }

  useOnClickOutside(
    tooltip,
    () => {
      if (selectionOpen && canChangeSelection()) setSelectionOpen(false);
    },
    'mouseup',
  );

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.projectile')}</Typography>

      <Tooltip
        slotProps={{
          root: {
            ref: tooltip,
            open: selectionOpen,
          },
        }}
        placement="top-end"
        size="lg"
        variant="plain"
        keepMounted
        sx={{
          padding: 0,
          overflow: 'hidden',
        }}
        title={
          <Tabs
            variant="soft"
            color="neutral"
            orientation="vertical"
            size="sm"
            sx={{
              maxHeight: 200,
            }}
            value={selectionTab}
            onChange={(event, newTab) => setSelectionTab(newTab as number)}
          >
            {Object.keys(guns).map((gunKey, index) => {
              const gun = guns[gunKey];

              return (
                <TabPanel value={index} key={index} sx={{ padding: 0 }}>
                  <ScrollBox dependency={selectionOpen}>
                    <Stack direction="column">
                      {gun.projectiles.map(
                        (projectile, thisProjectileIndex) => (
                          <ProjectileButton
                            gunKey={gunKey}
                            projectile={projectile}
                            key={thisProjectileIndex}
                            thisProjectileIndex={thisProjectileIndex}
                          />
                        ),
                      )}
                    </Stack>
                  </ScrollBox>
                </TabPanel>
              );
            })}

            <TabList underlinePlacement="left">
              <ScrollBox dependency={selectionOpen}>
                {Object.values(guns).map((gun, index) => (
                  <Tab
                    key={index}
                    variant="soft"
                    color="neutral"
                    indicatorPlacement="left"
                    sx={{
                      width: '100%',
                    }}
                  >
                    {gun.name}
                  </Tab>
                ))}
              </ScrollBox>
            </TabList>
          </Tabs>
        }
      >
        <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            if (!selectionOpen && canChangeSelection()) setSelectionOpen(true);
          }}
          sx={{
            paddingInline: '0.75rem',
            fontSize: 16,
            fontWeight: 400,
          }}
          endDecorator={
            <UnfoldMore
              style={{
                color: 'var(--joy-palette-text-icon)',
              }}
            />
          }
        >
          {guns[projectileData.gunKey].projectiles[projectileData.index].name}
        </Button>
      </Tooltip>
    </DataContainer>
  );
}
