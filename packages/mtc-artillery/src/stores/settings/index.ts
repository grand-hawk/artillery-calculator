import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface SettingsStore {
  legacyBlastRadius: boolean;
  setLegacyBlastRadius: (newValue: boolean) => void;
}

export const useSettingsStore = create(
  persist(
    immer<SettingsStore>((set) => ({
      legacyBlastRadius: false,
      setLegacyBlastRadius(newValue) {
        set((s) => {
          s.legacyBlastRadius = newValue;
        });
      },
    })),
    {
      name: 'settings',
      version: 0,
    },
  ),
);

export type KeyOfSettingsStore = keyof ReturnType<typeof useSettingsStore>;
