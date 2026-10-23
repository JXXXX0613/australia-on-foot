# Data sources

| File | Source | Notes |
|---|---|---|
| `ausplay_bushwalking_2025_state.csv`, `ausplay_bushwalking_2025_age.csv`, `ausplay_bushwalking_national_trend.csv` | AusPlay survey, Australian Sports Commission. National and state data tables, January–December 2025 (released 30 April 2026). https://www.ausport.gov.au/clearinghouse/research/ausplay/results/data-tables | "Bush walking" row of the "Participation by activity (adults)" tables (adults 15+). 2024 figure from the year-on-year table. |
| `national_parks_capad2024.csv`, `np_by_state.csv` | Collaborative Australian Protected Areas Database (CAPAD) 2024 – Terrestrial, Department of Climate Change, Energy, the Environment and Water. https://data.gov.au/data/dataset/6f980342-3a58-4a47-adb2-a178cd6748c2 | National parks only (state, Aboriginal and Commonwealth national parks). Polygons of the same park merged; location is the area-weighted centre. State land areas from Geoscience Australia. |
| `nsw_top10_visits_2024_25.csv` | NSW National Parks and Wildlife Service Park Visitation Survey 2024–25, via Destination NSW (13 July 2026). https://www.destinationnsw.com.au/newsroom/top-10-most-visited-national-parks-in-nsw | Park areas and locations from CAPAD 2024. |
| `park_climate_2025.csv` | Open-Meteo Historical Weather API (ERA5 reanalysis), CC BY 4.0. https://open-meteo.com/ | Daily maximum temperature and rainfall for 2025 at each park's centre, averaged/summed by month. |
| `trails.geojson`, `trails.csv` | OpenStreetMap contributors, ODbL. Hiking route relations (national/regional walking networks). https://www.openstreetmap.org/ | Length measured from route geometry. Elevation sampled every ~400 m using the Open-Meteo Elevation API (Copernicus DEM 90 m). |
| `aus_states.geojson` | Australian Bureau of Statistics ASGS state boundaries, via https://github.com/rowanhogan/australian-states | Simplified. |
