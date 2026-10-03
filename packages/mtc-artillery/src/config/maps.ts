import { calculateMapSize } from '@/utils/math';

export interface Heightmap {
  0: number;
  255: number;
}

export interface GameMap {
  heightmap?: Heightmap;
  inRotation?: boolean;
  key: string;
  name: string;
  size: number;
}

/* eslint sort-keys-fix/sort-keys-fix: "error" */
export const gameMaps: Record<string, GameMap> = {
  arctic_airbase: {
    heightmap: {
      0: 0,
      255: 566.8941650390625,
    },
    inRotation: true,
    key: 'Airbase',
    name: 'Arctic Airbase',
    size: 449 * 9,
  },

  chernobyl_v2: {
    heightmap: {
      0: 0,
      255: 408.0989990234375,
    },
    key: 'Chernobyl',
    name: 'Chernobyl',
    size: calculateMapSize(165),
  },

  cloudy_valley: {
    heightmap: {
      0: 0,
      255: 318.92401123046875,
    },
    key: 'Cloudy Valley',
    name: 'Cloudy Valley',
    size: calculateMapSize(116),
  },

  dustbowl: {
    heightmap: {
      0: 0,
      255: 362.07421875,
    },
    inRotation: true,
    key: 'Dustbowl',
    name: 'Dustbowl',
    size: 3442,
  },

  dustbowl_ii: {
    heightmap: {
      0: -55.95123291015625,
      255: 506,
    },
    key: 'Dustbowl2',
    name: 'Dustbowl II (old)',
    size: 6263,
  },

  dustbowl_ii_rework: {
    heightmap: {
      0: 25.84375,
      255: 232.2118682861328,
    },
    inRotation: true,
    key: 'Dustbowl2re',
    name: 'Dustbowl II',
    size: 6263,
  },

  fulvia_gap: {
    heightmap: {
      0: 0,
      255: 168.87933349609375,
    },
    inRotation: true,
    key: 'Fulvia Gap',
    name: 'Fulvia Gap',
    size: 888 * 9,
  },

  gensokyo: {
    key: 'JapanMap',
    name: 'Gensokyo',
    size: calculateMapSize(122),
  },

  japan: {
    key: 'OldJapanMap',
    name: 'Japan',
    size: calculateMapSize(122),
  },

  muddy_fields: {
    heightmap: {
      0: 5.9947967529296875,
      255: 104.14280700683594,
    },
    inRotation: true,
    key: 'Muddy Fields',
    name: 'Muddy Fields',
    size: 5999,
  },

  no_mans_land: {
    heightmap: {
      0: 27.66015625,
      255: 149.8065490722656,
    },
    key: "No Man's Land",
    name: "No Man's Land",
    size: 3179,
  },

  normandy: {
    heightmap: {
      0: 0,
      255: 116.07926940917969,
    },
    inRotation: true,
    key: 'Normandy Bocage',
    name: 'Normandy Bocage',
    size: 664 * 9,
  },

  powerplant: {
    heightmap: {
      0: 110.25238037109375,
      255: 579.076416015625,
    },
    key: 'PowerPlant',
    name: 'Powerplant',
    size: 3995,
  },

  radar_station: {
    heightmap: {
      0: 0,
      255: 311.19268798828125,
    },
    key: 'Radar',
    name: 'Radar Station',
    size: 708 * 9,
  },

  reactor: {
    key: 'OldReactor',
    name: 'Reactor (old)',
    size: calculateMapSize(207),
  },

  rohkshort: {
    heightmap: {
      0: 0,
      255: 387.8159484863281,
    },
    inRotation: true,
    key: 'Rohkshort',
    name: 'Rohkshort',
    size: 9217,
  },

  rohkstov: {
    heightmap: {
      0: 0.406219482421875,
      255: 488.1702880859375,
    },
    inRotation: true,
    key: 'Rohkstov',
    name: 'Rohkstov',
    size: 14996,
  },

  roinburg: {
    heightmap: {
      0: 6.165008544921875,
      255: 227.7537384033203,
    },
    inRotation: true,
    key: 'Roinburg',
    name: 'Roinburg',
    size: 3543,
  },

  // sandy_place: {
  //   heightmap: {
  //     0: 0,
  //     255: 119.748046875,
  //   },
  //   key: 'Sandy Place',
  //   name: 'Sandy Place',
  //   size: calculateMapSize(361),
  // },
  snow_tundra: {
    key: 'Snowy Tundra',
    name: 'Snow Tundra',
    size: calculateMapSize(160),
  },

  snowy_fields: {
    heightmap: {
      0: 6.6523284912109375,
      255: 228.3592529296875,
    },
    inRotation: true,
    key: 'Snowy Fields',
    name: 'Snowy Fields',
    size: 5999,
  },

  sokolovka: {
    heightmap: {
      0: 0,
      255: 96.25390625,
    },
    inRotation: true,
    key: 'Sokolovka',
    name: 'Sokolovka',
    size: 556 * 9,
  },

  the_map: {
    heightmap: {
      0: -147.68359375,
      255: 159.07421875,
    },
    key: 'The Map',
    name: 'The Map',
    size: 22943,
  },

  villers_sommeil: {
    heightmap: {
      0: 19.85155487060547,
      255: 123.07566833496094,
    },
    inRotation: true,
    key: 'Villers-Sommeil',
    name: 'Villers-Sommeil',
    size: 2997,
  },

  waterloo: {
    heightmap: {
      0: 0,
      255: 250.58702087402344,
    },
    key: 'Waterloo',
    name: 'Waterloo',
    size: 8734,
  },

  zone_11: {
    heightmap: {
      0: 0,
      255: 347.7691345214844,
    },
    inRotation: true,
    key: 'Fields',
    name: 'Zone 11',
    size: 8107,
  },
} satisfies Record<string, GameMap>;

export type MapId = keyof typeof gameMaps;

export const defaultMapId: MapId = 'normandy';

