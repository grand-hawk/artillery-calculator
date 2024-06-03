const locale = {
  units: {
    meter: '{value, plural, =1 {{value} meter} other {{value} meters}}',
    second: '{value, plural, =1 {{value} second} other {{value} seconds}}',
  },
  typography: {
    instructions: `Left click to set the gun position. Right click to set the target
    position. Hold middle click to move the map around, and scroll
    wheel to zoom.`,
    newVersion:
      'A new version has been published, refresh the page to apply it.',
    elevation: 'Elevation',
    notApplicable: 'N/A',
    or: 'or',
    map: 'Map',
    switchSelectionTo: 'Switch selection to {value}',
    gun: 'gun',
    target: 'target',
    projectile: 'Projectile',
    timeOfFlight: 'Time of flight',
    metersPerSecond: '{value} m/s',
    azimuth: 'Azimuth',
    distance: 'Distance',
    blastRange: 'This projectile has blast range data',
  },
};

export default locale;
