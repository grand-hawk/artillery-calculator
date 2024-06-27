import { calculateMapSize } from '@/utils/math';

export interface Heightmap {
  0: number;
  255: number;
  width: number;
  height: number;
}

export interface Map {
  image: string;
  name: string;
  size: number;
  heightmap?: Heightmap;
}

export const maps: Map[] = [
  {
    image: 'arctic_airbase',
    name: 'Arctic Airbase',
    size: 449 * 9,
  },
  {
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
  {
    image: 'normandy',
    name: 'Normandy Bocage',
    size: 664 * 9,
  },
  {
    image: 'powerplant',
    name: 'Powerplant',
    size: 444 * 9,
  },
  {
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
  {
    image: 'roinburg',
    name: 'Roinburg',
    size: 394 * 9,
  },
  {
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
  {
    image: 'villers_sommeil',
    name: 'Villers-Sommeil',
    size: 333 * 9,
  },
  {
    image: 'cloudy_valley',
    name: 'Cloudy Valley',
    size: calculateMapSize(116),
  },
  {
    image: 'snow_tundra',
    name: 'Snow Tundra',
    size: calculateMapSize(160),
  },
  {
    image: 'zone_11',
    name: 'Zone 11',
    size: calculateMapSize(324),
  },
  {
    image: 'gensokyo',
    name: 'Gensokyo',
    size: calculateMapSize(122),
  },
  {
    image: 'reactor',
    name: 'Reactor (old)',
    size: calculateMapSize(207),
  },
  {
    image: 'muddy_fields',
    name: 'Muddy Fields',
    size: 667 * 9,
    heightmap: {
      0: 0,
      255: 43.9580078125,
      width: 6003,
      height: 6003,
    },
  },
  {
    image: 'japan',
    name: 'Japan',
    size: calculateMapSize(122),
  },
  {
    image: 'chernobyl',
    name: 'Chernobyl',
    size: calculateMapSize(165),
  },
  {
    image: 'dustbowl_ii',
    name: 'Dustbowl II',
    size: calculateMapSize(250),
    heightmap: {
      0: 0,
      255: 505.8818359375,
      width: 6250,
      height: 6250,
    },
  },
  {
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
  {
    image: 'testing',
    name: 'TESTING',
    size: 1113 * 9,
  },
  {
    image: 'powerplant_sv',
    name: 'Powerplant (SV)',
    size: calculateMapSize(160),
  },
] as const;
