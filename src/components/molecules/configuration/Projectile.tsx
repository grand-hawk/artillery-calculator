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

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement | null>(null);

  const projectileData = useDataStore((s) => s.projectile);

  const [selectionOpen, setSelectionOpen] = React.useState<boolean>(false);
  const [selectionTab, setSelectionTab] = React.useState<number>(
    Object.keys(guns).findIndex((key) => key === projectileData.gunKey),
  );

  const selectionOpenChange = React.useCallback(
    (open: boolean) => setSelectionOpen(open),
    [],
  );

  useOnClickOutside(
    tooltipRef,
    (event) => {
      // dont do anything if element that was pressed was the button
      if (event.target === buttonRef.current) return;

      if (selectionOpen) selectionOpenChange(false);
    },
    'mouseup',
  );

  return (
    <DataContainer>
      <Typography level="title-md">{t('typography.projectile')}</Typography>

      <Tooltip
        keepMounted
        placement="top-end"
        size="lg"
        slotProps={{
          root: {
            ref: tooltipRef,
            open: selectionOpen,
          },
        }}
        sx={{
          padding: 0,
          overflow: 'hidden',
        }}
        title={
          <Tabs
            color="neutral"
            orientation="vertical"
            size="sm"
            sx={{
              maxHeight: 200,
            }}
            value={selectionTab}
            variant="soft"
            onChange={(event, newTab) => setSelectionTab(newTab as number)}
          >
            {Object.keys(guns).map((gunKey, index) => {
              const gun = guns[gunKey];

              return (
                <TabPanel key={index} sx={{ padding: 0 }} value={index}>
                  <ScrollBox dependency={selectionOpen}>
                    <Stack direction="column">
                      {gun.projectiles.map(
                        (projectile, thisProjectileIndex) => (
                          <ProjectileButton
                            key={thisProjectileIndex}
                            gunKey={gunKey}
                            projectile={projectile}
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
                    color="neutral"
                    indicatorPlacement="left"
                    sx={{
                      width: '100%',
                    }}
                    variant="soft"
                  >
                    {gun.name}
                  </Tab>
                ))}
              </ScrollBox>
            </TabList>
          </Tabs>
        }
        variant="plain"
      >
        <Button
          ref={buttonRef}
          color="neutral"
          endDecorator={
            <UnfoldMore
              style={{
                color: 'var(--joy-palette-text-icon)',
              }}
            />
          }
          sx={{
            paddingInline: '0.75rem',
            fontSize: 16,
            fontWeight: 400,
          }}
          variant="soft"
          onClick={() => selectionOpenChange(!selectionOpen)}
        >
          {guns[projectileData.gunKey].projectiles[projectileData.index].name}
        </Button>
      </Tooltip>
    </DataContainer>
  );
}
