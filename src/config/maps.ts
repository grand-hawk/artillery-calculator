import { calculateMapSize } from '@/utils/math';

export interface Heightmap {
  0: number;
  255: number;
  width: number;
  height: number;
}

export interface GameMap {
  image: string;
  name: string;
  size: number;
  heightmap?: Heightmap;
}

export const gameMaps = {
  arctic_airbase: {
    image: 'arctic_airbase',
    name: 'Arctic Airbase',
    size: 449 * 9,
    heightmap: {
      0: 0,
      255: 566.8941650390625,
      width: 4044,
      height: 4044,
    },
  },

  dustbowl: {
    image: 'dustbowl',
    name: 'Dustbowl',
    size: 383 * 9,
    heightmap: {
      0: 0,
      255: 360.703125,
      width: 3454,
      height: 3454,
    },
  },

  normandy: {
    image: 'normandy_bocage',
    name: 'Normandy Bocage',
    size: 664 * 9,
    heightmap: {
      0: 0,
      255: 116.07926940917969,
      width: 5976,
      height: 5975,
    },
  },

  powerplant: {
    image: 'powerplant',
    name: 'Powerplant',
    size: calculateMapSize(160),
    heightmap: {
      0: 0,
      255: 476.80126953125,
      width: 3994,
      height: 3994,
    },
  },

  radar_station: {
    image: 'radar_station',
    name: 'Radar Station',
    size: 708 * 9,
    heightmap: {
      0: 0,
      255: 98,
      width: 6372,
      height: 6372,
    },
  },

  roinburg: {
    image: 'roinburg',
    name: 'Roinburg',
    size: calculateMapSize(142),
  },

  sokolokva: {
    image: 'sokolokva',
    name: 'Sokolokva',
    size: 556 * 9,
    heightmap: {
      0: 0,
      255: 96.25390625,
      width: 5004,
      height: 5004,
    },
  },

  villers_sommeil: {
    image: 'villers_sommeil',
    name: 'Villers-Sommeil',
    size: 333 * 9,
  },

  cloudy_valley: {
    image: 'cloudy_valley',
    name: 'Cloudy Valley',
    size: calculateMapSize(116),
  },

  snow_tundra: {
    image: 'snow_tundra',
    name: 'Snow Tundra',
    size: calculateMapSize(160),
  },

  zone_11: {
    image: 'zone_11',
    name: 'Zone 11',
    size: calculateMapSize(324),
    heightmap: {
      0: 0,
      // 1 digit removed due to possible precision loss (250.13919067382812)
      255: 250.1391906738281,
      width: 8106,
      height: 8106,
    },
  },

  gensokyo: {
    image: 'gensokyo',
    name: 'Gensokyo',
    size: calculateMapSize(122),
  },

  reactor: {
    image: 'reactor',
    name: 'Reactor (old)',
    size: calculateMapSize(207),
  },

  muddy_fields: {
    image: 'muddy_fields',
    name: 'Muddy Fields',
    size: calculateMapSize(240),
    heightmap: {
      0: 0,
      255: 226.43841552734375,
      width: 5998,
      height: 5998,
    },
  },

  japan: {
    image: 'japan',
    name: 'Japan',
    size: calculateMapSize(122),
  },

  chernobyl: {
    image: 'chernobyl',
    name: 'Chernobyl',
    size: calculateMapSize(165),
    heightmap: {
      0: 0,
      255: 408.0989990234375,
      width: 4128,
      height: 4128,
    },
  },

  dustbowl_ii: {
    image: 'dustbowl_ii',
    name: 'Dustbowl II',
    size: calculateMapSize(250),
    heightmap: {
      0: 0,
      255: 505.26953125,
      width: 6262,
      height: 6262,
    },
  },

  sandy_place: {
    image: 'sandy_place',
    name: 'Sandy Place',
    size: calculateMapSize(361),
    heightmap: {
      0: 0,
      255: 119.748046875,
      width: 9025,
      height: 9025,
    },
  },

  testing: {
    image: 'testing',
    name: 'TESTING',
    size: 1113 * 9,
  },
} satisfies Record<string, GameMap>;

export type MapId = keyof typeof gameMaps;
