// ================================
// STUDY AREA: KANO & NEIGHBORING STATES
// ================================

// 1. Load the FAO GAUL 2025 Level 1 collection
var adm1 = ee.FeatureCollection('FAO/GAUL/2025/level1');

// 2. Define Kano and its key neighboring states in Nigeria
var studyStates = adm1.filter(ee.Filter.eq('GAUL0_NAME', 'Nigeria'))
  .filter(ee.Filter.inList('GAUL1_NAME', [
    'Kano', 
    'Katsina', 
    'Jigawa', 
    'Bauchi', 
    'Kaduna', 
    'Zamfara'
  ]));

// 3. Center map and visualize
Map.centerObject(studyStates, 7);

// Add neighbors as a light gray background layer
Map.addLayer(studyStates.filter(ee.Filter.neq('GAUL1_NAME', 'Kano')), 
  {color: 'lightgray'}, 'Neighboring States');

// Highlight Kano specifically
Map.addLayer(studyStates.filter(ee.Filter.eq('GAUL1_NAME', 'Kano')), 
  {color: 'red'}, 'Kano Boundary', true, 0.5);

// ================================
// 4. EXPORT VECTORS FOR QGIS
// ================================
Export.table.toDrive({
  collection: studyStates,
  description: 'Kano_And_Neighbors_Vector',
  folder: 'DSN_Kano',
  fileFormat: 'GeoJSON' // Options: Shapefile, GeoJSON, CSV
});