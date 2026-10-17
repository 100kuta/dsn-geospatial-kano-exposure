// ================================
// KANO LAND SURFACE TEMPERATURE
// Corrected for Date and Availability
// ================================

var kano = ee.FeatureCollection('FAO/GAUL/2025/level1')
  .filter(ee.Filter.eq('GAUL1_NAME', 'Kano'));

Map.centerObject(kano, 8);

// Load MODIS Terra Daily LST
// NOTE: August 2026 is in the future relative to today (May 2024).
// This collection will be empty (size 0).
var terra = ee.ImageCollection('MODIS/061/MOD11A1')
  .filterDate('2026-08-01', '2026-09-01')
  .filterBounds(kano);

// Load MODIS Aqua Daily LST (Afternoon pass)
var aqua = ee.ImageCollection('MODIS/061/MYD11A1')
  .filterDate('2026-08-01', '2026-09-01')
  .filterBounds(kano);

// Merge both collections to fill cloud gaps
var lstCol = terra.merge(aqua);

// PROOF: Check the console. If this is 0, the map will be "plain".
print('Number of images found (Terra + Aqua):', lstCol.size());

var lst = lstCol
  .map(function(image) {

    // Keep LST if produced (accepts 0: "good" and 1: "check other flags")
    var qa = image.select('QC_Day')
      .bitwiseAnd(3)
      .lte(1); 

    // Scale Kelvin -> Celsius
    var temp = image.select('LST_Day_1km')
      .multiply(0.02)
      .subtract(273.15);

    return temp.updateMask(qa);
  })
  .mean() 
  .clip(kano);

Map.addLayer(
  lst,
  {min: 25, max: 45, palette: ['blue', 'cyan', 'green', 'yellow', 'orange', 'red']},
  'August 2026 LST °C (Terra+Aqua)'
);

// Export
Export.image.toDrive({
  image: lst,
  description: 'Kano_LST_August_2026',
  folder: 'DSN_Kano',
  region: kano.geometry(),
  scale: 1000,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e13
});