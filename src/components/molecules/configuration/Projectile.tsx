import todec from '2dec';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import DataContainer from '../../atoms/configuration/DataContainer';
import ScrollBox from '../ScrollBox';
import BlastRadiusSupport from '@/components/atoms/configuration/projectile/BlastRadiusSupport';
import { guns } from '@/config/projectiles';
import { useDataStore } from '@/stores/data';

export default function ProjectileSelection() {
  const tooltip = React.useRef<HTMLDivElement | null>(null);
  const selectionChanged = React.useRef<number>(0);
  const [projectileData, setProjectile] = useDataStore((s) => [
    s.projectile,
    s.setProjectile,
  ]);
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
      <Typography level="title-md">Projectile</Typography>

      <Tooltip
        slotProps={{ root: { ref: tooltip, open: selectionOpen } }}
        placement="top-end"
        size="lg"
        variant="outlined"
        keepMounted
        sx={(theme) => ({
          backgroundColor: theme.palette.background.body,
          paddingLeft: 0,
          paddingRight: 0,
        })}
        title={
          <Tabs
            orientation="vertical"
            size="sm"
            sx={{ backgroundColor: 'unset', maxHeight: 200 }}
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
                          <Button
                            key={thisProjectileIndex}
                            color="neutral"
                            variant="plain"
                            sx={(theme) => ({
                              borderRadius: 0,
                              fontWeight: 400,

                              ...(thisProjectileIndex ===
                                projectileData.index &&
                                gunKey === projectileData.gunKey && {
                                  backgroundColor:
                                    theme.palette.neutral.plainActiveBg,
                                }),
                            })}
                            size="sm"
                            onClick={() =>
                              setProjectile(gunKey, thisProjectileIndex)
                            }
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
                              <Typography>
                                {projectile.name}
                                {projectile.explosiveMass && (
                                  <BlastRadiusSupport />
                                )}
                              </Typography>

                              <Typography level="body-sm">
                                {todec(projectile.velocity)} m/s
                              </Typography>
                            </Stack>
                          </Button>
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
                    variant="plain"
                    color="neutral"
                    key={index}
                    indicatorPlacement="left"
                    sx={{ width: '100%' }}
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
          variant="outlined"
          color="neutral"
          onClick={() => {
            if (!selectionOpen && canChangeSelection()) setSelectionOpen(true);
          }}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.surface,
            paddingInline: '0.75rem',
            fontSize: 16,
            fontWeight: 400,
          })}
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
