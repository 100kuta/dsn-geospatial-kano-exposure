// ================================
// KANO AIR QUALITY - NO2 & CO
// August 2026
// ================================

// 1. Kano boundary from FAO GAUL 2025
var kano = ee.FeatureCollection('FAO/GAUL/2025/level1')
  .filter(ee.Filter.eq('GAUL1_NAME', 'Kano'));

Map.centerObject(kano, 8);
Map.addLayer(kano, {}, 'Kano Boundary');

// ================================
// 2. SENTINEL-5P NO2 (Nitrogen Dioxide)
// ================================
var no2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .filterDate('2026-08-01', '2026-09-01')
  .filterBounds(kano)
  .select('tropospheric_NO2_column_number_density')
  .map(function(image) {
    // Mask out extreme negative retrieval noise
    return image.updateMask(image.gte(-0.001));
  })
  .mean()
  .clip(kano);

Map.addLayer(
  no2,
  {min: 0, max: 0.00015, palette: ['blue', 'cyan', 'yellow', 'orange', 'red']},
  'August 2026 - NO2'
);

// ================================
// 3. SENTINEL-5P CO (Carbon Monoxide)
// ================================
var co = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
  .filterDate('2026-08-01', '2026-09-01')
  .filterBounds(kano)
  .select('CO_column_number_density')
  .map(function(image) {
    return image.updateMask(image.gte(0)); // Filter out any baseline negatives
  })
  .mean()
  .clip(kano);

Map.addLayer(
  co,
  {min: 0.02, max: 0.05, palette: ['white', 'yellow', 'orange', 'red', 'purple']},
  'August 2026 - CO'
);

// ================================
// 4. EXPORT TASKS FOR QGIS
// ================================

// Export NO2 Layer
Export.image.toDrive({
  image: no2,
  description: 'Kano_NO2_August_2026',
  folder: 'DSN_Kano',
  region: kano.geometry(),
  scale: 1100,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e13
});

// Export CO Layer
Export.image.toDrive({
  image: co,
  description: 'Kano_CO_August_2026',
  folder: 'DSN_Kano',
  region: kano.geometry(),
  scale: 1100,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e13
});