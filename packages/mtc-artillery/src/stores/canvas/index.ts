import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface CanvasStore {
  width: number;
  setWidth: (pixels: number) => void;

  height: number;
  setHeight: (pixels: number) => void;

  zoom: number;
  setZoom: (zoom: number) => void;

  unoptimized: boolean;
  setUnoptimized: (unoptimized: boolean) => void;
}

export const useCanvasStore = create(
  immer<CanvasStore>((set) => ({
    width: 0,
    setWidth(pixels) {
      set((s) => {
        s.width = pixels;
      });
    },

    height: 0,
    setHeight(pixels) {
      set((s) => {
        s.height = pixels;
      });
    },

    zoom: 1,
    setZoom(zoom) {
      set((s) => {
        // minimum of 1 zoom, cant go lower
        s.zoom = Math.max(zoom, 1);
      });
    },

    unoptimized: false,
    setUnoptimized(unoptimized) {
      set((s) => {
        s.unoptimized = unoptimized;
      });
    },
  })),
);
