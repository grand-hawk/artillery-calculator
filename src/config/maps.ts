import { calculateMapSize } from '@/utils/math';

export interface Map {
  image: string;
  name: string;
  size: number;
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
    size: 382 * 9,
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
  },
  {
    image: 'villers_sommeil',
    name: 'Villers-Sommeil',
    size: 333 * 9,
  },
  /*
    The maps below used meters at the time, the calculateMapSize converts this correctly
  */
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
  },
  {
    image: 'sandy_place',
    name: 'Sandy Place',
    size: calculateMapSize(240),
  },
  {
    image: 'testing',
    name: 'TESTING',
    size: calculateMapSize(401),
  },
];
