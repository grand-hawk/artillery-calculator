/* eslint-disable no-underscore-dangle */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { guns } from '@/config/projectiles';

import type { MobileModes } from '@/components/molecules/configuration/MobileMode';
import type { Vector } from '@/components/templates/Canvas';

interface ProjectileData {
  gunKey: string;
  index: number;
}

interface StringVector {
  x: string;
  y: string;
}

export interface DataStore {
  mapIndex: number;
  setMapIndex: (mapIndex: number) => void;

  projectile: ProjectileData;
  setProjectile: (gun: string, index: number) => void;

  target: StringVector;
  getTarget: () => Vector;
  setTarget: (x: number, y: number) => void;

  gun: StringVector;
  getGun: () => Vector;
  setGun: (x: number, y: number) => void;

  mobileMode: MobileModes;
  setMobileMode: (mode: MobileModes) => void;
}

export const useDataStore = create(
  persist(
    immer<DataStore>((set) => ({
      // radar station as default map as it has the smallest size
      mapIndex: 4,
      setMapIndex(mapIndex) {
        set((s) => {
          s.mapIndex = mapIndex;
        });
      },

      // First gun and its projectile as default
      projectile: {
        gunKey: Object.keys(guns)[0],
        index: 0,
      },
      setProjectile(gun, index) {
        set((s) => {
          s.projectile = {
            gunKey: gun,
            index,
          };
        });
      },

      target: { x: '0.75', y: '0.5' },
      getTarget() {
        return {
          x: Number(this.target.x),
          y: Number(this.target.y),
        };
      },
      setTarget(x, y) {
        set((s) => {
          s.target = {
            x: String(x),
            y: String(y),
          };
        });
      },

      gun: { x: '0.25', y: '0.5' },
      getGun() {
        return {
          x: Number(this.gun.x),
          y: Number(this.gun.y),
        };
      },
      setGun(x, y) {
        set((s) => {
          s.gun = {
            x: String(x),
            y: String(y),
          };
        });
      },

      mobileMode: 'gun',
      setMobileMode(mode) {
        set((s) => {
          s.mobileMode = mode;
        });
      },
    })),
    {
      name: 'data',
    },
  ),
);
