import { Switch } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { useTranslations } from 'next-intl';

import ColumnContainer from '../atoms/ColumnContainer';
import DataContainer from '../atoms/DataContainer';
import { useSettingsStore } from '@/stores/settings';
import { useSettingsStateStore } from '@/stores/settings/state';
import capitalizeFirstCharacter from '@/utils/capitalizeFirstCharacter';

import type { KeyOfSettingsStore } from '@/stores/settings';

export default function Settings() {
  const t = useTranslations();

  const open = useSettingsStateStore((s) => s.open);
  const setOpen = useSettingsStateStore((s) => s.setOpen);

  const settingsStore = useSettingsStore();

  return (
    <Modal keepMounted open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />

        <ColumnContainer
          sx={{
            gap: 1,
            marginTop: 4,
          }}
        >
          {Object.keys(settingsStore).map((key, index) => {
            const value = settingsStore[key as KeyOfSettingsStore];
            if (typeof value === 'function') return null;

            let valueComponent: JSX.Element | null = null;

            switch (typeof value) {
              case 'boolean':
                valueComponent = (
                  <Switch
                    checked={value}
                    onChange={(event) =>
                      (
                        settingsStore[
                          `set${capitalizeFirstCharacter(key)}` as KeyOfSettingsStore
                        ] as (newValue: boolean) => void
                      )(event.target.checked)
                    }
                  />
                );
                break;
            }

            return (
              <DataContainer key={index} sx={{ gap: 2 }}>
                <Typography>{t(`typography.settings.${key}`)}</Typography>

                {valueComponent}
              </DataContainer>
            );
          })}
        </ColumnContainer>
      </ModalDialog>
    </Modal>
  );
}
