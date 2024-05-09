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
    size: 4041,
  },
  {
    image: '/images/dustbowl.png',
    name: 'Dustbowl',
    size: 3438,
  },
  {
    image: '/images/normandy.png',
    name: 'Normandy Bocage',
    size: 5976,
  },
  {
    image: '/images/powerplant.png',
    name: 'Powerplant',
    size: 3996,
  },
  {
    image: '/images/radar_station.png',
    name: 'Radar Station',
    size: 6372,
  },
  {
    image: '/images/roinburg.png',
    name: 'Roinburg',
    size: 3546,
  },
  {
    image: '/images/sokolokva.png',
    name: 'Sokolokva',
    size: 5004,
  },
  {
    image: '/images/villers_sommeil.png',
    name: 'Villers-Sommeil',
    size: 2997,
  },
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
    // "Fields"
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
    size: calculateMapSize(240),
  },
  {
    image: '/images/japan.png',
    // "Japan Map"
    name: 'Japan',
    size: calculateMapSize(122),
  },
  {
    image: '/images/chernobyl.png',
    name: 'Chernobyl',
    size: calculateMapSize(165),
  },
];
