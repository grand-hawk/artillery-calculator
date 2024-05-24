import { calculateMapSize } from '@/utils/math';

export interface Map {
  image: string;
  name: string;
  size: number;
}

export const maps: Map[] = [
  {
    image: '/images/arctic_airbase.png',
    name: 'Arctic Airbase',
    size: 449 * 9,
  },
  {
    image: '/images/dustbowl.png',
    name: 'Dustbowl',
    size: 382 * 9,
  },
  {
    image: '/images/normandy.png',
    name: 'Normandy Bocage',
    size: 664 * 9,
  },
  {
    image: '/images/powerplant.png',
    name: 'Powerplant',
    size: 444 * 9,
  },
  {
    image: '/images/radar_station.png',
    name: 'Radar Station',
    size: 708 * 9,
  },
  {
    image: '/images/roinburg.png',
    name: 'Roinburg',
    size: 394 * 9,
  },
  {
    image: '/images/sokolokva.png',
    name: 'Sokolokva',
    size: 556 * 9,
  },
  {
    image: '/images/villers_sommeil.png',
    name: 'Villers-Sommeil',
    size: 333 * 9,
  },
  /*
    The maps below used meters at the time, the calculateMapSize converts this correctly
  */
  {
    image: '/images/cloudy_valley.png',
    name: 'Cloudy Valley',
    size: calculateMapSize(116),
  },
  {
    image: '/images/snow_tundra.png',
    name: 'Snow Tundra',
    size: calculateMapSize(160),
  },
  {
    image: '/images/zone_11.png',
    name: 'Zone 11',
    size: calculateMapSize(324),
  },
  {
    image: '/images/gensokyo.png',
    name: 'Gensokyo',
    size: calculateMapSize(122),
  },
  {
    image: '/images/reactor.png',
    name: 'Reactor (old)',
    size: calculateMapSize(207),
  },
  {
    image: '/images/muddy_fields.png',
    name: 'Muddy Fields',
    size: 667 * 9,
  },
  {
    image: '/images/japan.png',
    name: 'Japan',
    size: calculateMapSize(122),
  },
  {
    image: '/images/chernobyl.png',
    name: 'Chernobyl',
    size: calculateMapSize(165),
  },
  {
    image: '/images/dustbowl_ii.png',
    name: 'Dustbowl II',
    size: calculateMapSize(250),
  },
];
