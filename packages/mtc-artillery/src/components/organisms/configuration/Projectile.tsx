import UnfoldMore from '@mui/icons-material/UnfoldMore';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import ProjectileButton from '@/components/atoms/configuration/projectile/Button';
import DataContainer from '@/components/atoms/DataContainer';
import SearchProvider from '@/components/atoms/SearchProvider';
import ScrollBox from '@/components/molecules/ScrollBox';
import { guns } from '@/config/guns';
import { useDataStore } from '@/stores/data';

export default function ProjectileSelection() {
  const t = useTranslations();

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement | null>(null);

  const projectileData = useDataStore((s) => s.projectile);

  const [selectionOpen, setSelectionOpen] = React.useState<boolean>(false);
  const [selectionTabGunKey, setSelectionTabGunKey] = React.useState<string>(
    () => projectileData.gunKey || Object.keys(guns)[0],
  );

  const handleOpenToggle = () => setSelectionOpen((prev) => !prev);

  useOnClickOutside<HTMLDivElement>(
    tooltipRef as React.RefObject<HTMLDivElement>,
    (event) => {
      if (event.target === buttonRef.current) return;
      if (selectionOpen) setSelectionOpen(false);
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
        sx={{ padding: 0, overflow: 'hidden' }}
        title={
          <SearchProvider
            key={String(selectionOpen)}
            placeholder={t('typography.projectileSearchPlaceholder')}
            autoFocus
          >
            {(searchQuery) => {
              const filteredGunKeys = Object.keys(guns).filter((gunKey) => {
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase();
                const gun = guns[gunKey];
                return (
                  gun.name.toLowerCase().includes(q) ||
                  gun.projectiles.some((p) =>
                    p.name.toLowerCase().includes(q),
                  )
                );
              });

              const showNoResults =
                filteredGunKeys.length === 0 && searchQuery.trim() !== '';

              const activeGunKey =
                filteredGunKeys.length > 0
                  ? filteredGunKeys.includes(selectionTabGunKey)
                    ? selectionTabGunKey
                    : filteredGunKeys[0]
                  : '';

              const activeTabIndex = Math.max(
                filteredGunKeys.indexOf(activeGunKey),
                0,
              );

              return (
                <Tabs
                  color="neutral"
                  orientation="vertical"
                  size="sm"
                  sx={{ maxHeight: 200 }}
                  value={activeTabIndex}
                  variant="soft"
                  onChange={(_event, newTab) => {
                    const newGunKey = filteredGunKeys[newTab as number];
                    if (newGunKey) setSelectionTabGunKey(newGunKey);
                  }}
                >
                  {showNoResults ? (
                    <TabPanel sx={{ padding: 0 }} value={0}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          py: 1,
                          px: 2,
                          minWidth: 150,
                        }}
                      >
                        <Typography
                          level="body-sm"
                          sx={{ color: 'var(--joy-palette-text-icon)' }}
                        >
                          {t('typography.projectileNoResults')}
                        </Typography>
                      </Box>
                    </TabPanel>
                  ) : (
                    filteredGunKeys.map((gunKey, index) => {
                      const gun = guns[gunKey];
                      return (
                        <TabPanel
                          key={gunKey}
                          sx={{ padding: 0 }}
                          value={index}
                        >
                          <ScrollBox
                            dependency={selectionOpen}
                            sx={{ maxHeight: 200 }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              {gun.projectiles.map((projectile, thisProjectileIndex) => (
                                <ProjectileButton
                                  key={`${gunKey}-${thisProjectileIndex}`}
                                  gunKey={gunKey}
                                  projectile={projectile}
                                  thisProjectileIndex={thisProjectileIndex}
                                />
                              ))}
                              </Box>
                          </ScrollBox>
                        </TabPanel>
                      );
                    })
                  )}

                  {filteredGunKeys.length > 0 && (
                    <TabList underlinePlacement="left">
                      <ScrollBox dependency={selectionOpen}>
                        {filteredGunKeys.map((gunKey) => (
                          <Tab
                            key={gunKey}
                            color="neutral"
                            indicatorPlacement="left"
                            sx={{ width: '100%' }}
                            variant="soft"
                          >
                            {guns[gunKey].name}
                          </Tab>
                        ))}
                      </ScrollBox>
                    </TabList>
                  )}
                </Tabs>
              );
            }}
          </SearchProvider>
        }
        variant="plain"
      >
        <Button
          ref={buttonRef}
          color="neutral"
          endDecorator={
            <UnfoldMore style={{ color: 'var(--joy-palette-text-icon)' }} />
          }
          sx={{ paddingInline: '0.75rem', fontSize: 16, fontWeight: 400 }}
          variant="soft"
          onClick={handleOpenToggle}
        >
          {guns[projectileData.gunKey]?.projectiles[projectileData.index]
            ?.name || t('typography.projectileSelect')}
        </Button>
      </Tooltip>
    </DataContainer>
  );
}
