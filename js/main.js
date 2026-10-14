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
  ["#vis1", "specs/01_choropleth.vg.json"],
  ["#vis2", "specs/02_age_gender.vg.json"],
  ["#vis3", "specs/03_park_symbols.vg.json"],
  ["#vis4", "specs/04_park_ranking.vg.json"],
  ["#vis5", "specs/05_seasonality.vg.json"],
  ["#vis6", "specs/06_trail_map.vg.json"],
  ["#vis7", "specs/07_distance_elevation.vg.json"],
  ["#vis8", "specs/08_difficulty_share.vg.json"]
];

Promise.all(specs.map(([el, url]) => vegaEmbed(el, url, opts))).then(results => {
  // Link the difficulty bar (vis8) to the scatterplot (vis7)
  const scatter = results[6].view;
  const share = results[7].view;
  share.addSignalListener("pick", (_, value) => {
    const d = value && value.difficulty ? value.difficulty[0] : null;
    scatter.signal("selDiff", d).runAsync();
  });
});
