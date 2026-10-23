// Shared look for every chart
const config = {
  background: null,
  font: "Source Sans 3",
  view: { stroke: null },
  axis: {
    labelFontSize: 12, titleFontSize: 12, titleFontWeight: 600,
    labelColor: "#5d6458", titleColor: "#1d2b22",
    gridColor: "#ece6d6", domainColor: "#cfc8b5", tickColor: "#cfc8b5"
  },
  legend: { labelFontSize: 12, titleFontSize: 12, titleColor: "#1d2b22", labelColor: "#5d6458" }
};
const opts = { actions: false, config, renderer: "svg" };

const specs = [
  "01_waffle", "02_choropleth", "03_age", "04_gender_dumbbell", "05_parks_map", "06_np_share_scatter",
  "07_nsw_visits", "08_climate_heatmap", "09_trail_map", "10_trail_scatter", "11_climb_ranking",
  "12_slope_2024_2025", "13_rain_radial", "14_difficulty_share"
];

Promise.all(specs.map((name, i) => vegaEmbed(`#vis${i + 1}`, `specs/${name}.vg.json`, opts))).then(results => {
  // Clicking a trail in the ranking (vis11) highlights its climb class in the scatterplot (vis10)
  const scatter = results[9].view;
  const ranking = results[10].view;
  ranking.addSignalListener("pick", (_, value) => {
    const c = value && value.climb_class ? value.climb_class[0] : null;
    scatter.signal("selClass", c).runAsync();
  });
  // Clicking a segment of the difficulty bar (vis14) does the same
  results[13].view.addSignalListener("pickShare", (_, value) => {
    const c = value && value.climb_class ? value.climb_class[0] : null;
    scatter.signal("selClass", c).runAsync();
  });
});
