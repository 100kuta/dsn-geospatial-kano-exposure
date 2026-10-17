# 🌍 Mapping Environmental Exposure Pathways in Kano State
### DSN AI Bootcamp 2026 — Geospatial Track Portfolio Project

[![Google Earth Engine](https://img.shields.io/badge/Google_Earth_Engine-34A853?style=flat&logo=google-earth&logoColor=white)](https://earthengine.google.com/)
[![QGIS](https://img.shields.io/badge/QGIS-589632?style=flat&logo=qgis&logoColor=white)](https://qgis.org/)
[![Status](https://img.shields.io/badge/Status-Completed-success)]()

---

## 📌 Project Overview
Urban centers and regional zones often experience compounding environmental stresses that affect human wellbeing. This project maps and analyzes the spatial distribution of **Land Surface Temperature (LST)**, **Carbon Monoxide (CO)**, and **Nitrogen Dioxide ($\text{NO}_2$)** across **Kano State, Nigeria** for August 2026. 

By combining satellite observations with high-resolution population data on a standardized 1-km grid, the project identifies localized hotspots where multiple environmental exposure indicators overlap.

* **Participant Name:** Abdulbasit Sulayman
* **Community ID:** `DSN/AIPlus/2025/45616`
* **Email:** abdulbasitolokuta@gmail.com
* **Track:** Geospatial Track

---

## 🎯 Problem Statement & Objective
* **Problem Statement:** Kano State experiences environmental conditions that can impact human wellbeing, including elevated land surface temperatures and exposure to atmospheric pollutants ($\text{CO}$ and $\text{NO}_2$). These stressors are unevenly distributed, requiring spatial analysis to uncover areas of compounding exposure.
* **Objective:** Map individual environmental indicators, determine their spatial overlap using a compound score, and provide data-driven insights to guide targeted environmental and health assessments.

---

## 🛠️ Methodology & Technical Workflow
The analytical pipeline was built using cloud-based geospatial computing and desktop GIS:

1. **Study Area Definition:** Utilized administrative boundaries for Kano State.
2. **Data Acquisition:** Pulled satellite imagery via Google Earth Engine (GEE) for August 2026:
   * *MODIS Terra & Aqua* (Daily Land Surface Temperature)
   * *Sentinel-5P / TROPOMI* ($\text{NO}_2$ and $\text{CO}$ tropospheric column density)
3. **Preprocessing (GEE):** Combined and averaged daily LST imagery, converted units, and generated spatial mean column density rasters.
4. **Grid & Percentile Analysis:** Exported rasters to **QGIS** onto a common 1-km grid analysis framework. Values at or above the 75th percentile of the Kano dataset were classified as binary elevated indicators.
5. **Compound Index:** Combined the binary layers to produce a Compound Environmental Exposure Score representing the number of elevated indicators per cell, overlaid with population data for contextual depth.

---

## 📊 Key Maps & Visualizations
*(High-resolution exports of the final cartographic layouts are stored in the `/maps` directory)*

* **Map 1: Land Surface Temperature (LST):** Highlights urban heat islands and high-temperature zones across Kano.
* **Map 2: Carbon Monoxide (CO) Column Density:** Spatial distribution of trace gases driven by combustion and regional activities.
* **Map 3: Nitrogen Dioxide ($\text{NO}_2$) Pollution:** Maps tropospheric $\text{NO}_2$ concentrations across urban and transport corridors.
* **Map 4: Compound Environmental Exposure Hotspots:** A composite raster displaying areas facing single vs. multiple simultaneous environmental stressors.
* **Map 5: Population Overlay:** Cross-references exposure grids with human settlement patterns to prioritize populated zones.

---

## 💡 Strategic Insights & Limitations
* **Key Finding:** Environmental stressors do not occur in isolation; urban and industrial corridors frequently display high compound scores where high LST overlaps with elevated trace gases.
* **Methodological Rigor & Technical Disclaimer:** 
  > *“These areas warrant attention for further environmental and health assessment because multiple environmental exposure indicators are elevated.”* 
  
  *Note:* This map highlights **environmental exposure pathways** based on satellite indices rather than direct medical risk or clinical health outcome data, which requires ground-level validation.

---

## 📂 Repository Structure
```text
├── data/               # Documentation of external data sources
├── maps/               # Exported map images (LST, CO, NO2, Compound Score, Population Overlay)
├── scripts/            # Google Earth Engine and QGIS processing workflows
├── presentation/       # Final DSN submission slide deck (.pptx / .pdf)
└── README.md           # Project documentation