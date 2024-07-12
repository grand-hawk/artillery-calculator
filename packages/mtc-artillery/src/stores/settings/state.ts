import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SettingsStateStore {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useSettingsStateStore = create(
  immer<SettingsStateStore>((set) => ({
    open: false,
    setOpen(value) {
      set((s) => {
        s.open = value;
      });
    },
  })),
);
