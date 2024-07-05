import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Props {
  version: string | null;
  motd: string | null;
}

export interface PropStore extends Props {
  setVersion: (version: string | null) => void;
  setMotd: (motd: string | null) => void;
}

export const usePropStore = create(
  immer<PropStore>((set) => ({
    version: null,
    setVersion(version) {
      set((s) => {
        s.version = version;
      });
    },

    motd: null,
    setMotd(motd) {
      set((s) => {
        s.motd = motd;
      });
    },
  })),
);
