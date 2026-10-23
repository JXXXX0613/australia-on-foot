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

// The rainfall small multiples use fixed sizes, so pick 2 or 4 columns to fit the screen
async function load(name, el) {
  const spec = await (await fetch(`specs/${name}.vg.json`)).json();
  if (name === "13_rain_radial") {
    const w = document.querySelector(el).clientWidth;
    const narrow = w < 820;
    spec.columns = narrow ? 2 : 4;
    const size = narrow ? Math.min(180, Math.floor((w - 56) / 2)) : 180;
    if (narrow) spec.spacing = 12;
    const k = size / 180;
    spec.spec.width = size;
    spec.spec.height = size + 20;
    const [arcs, labels] = spec.spec.layer;
    const c = size / 2, r = narrow ? c - 8 : 94 * k, mid = (size + 20) / 2;
    arcs.mark.innerRadius = 14 * k;
    arcs.encoding.radius.scale.range = [14 * k, narrow ? c - 20 : 84 * k];
    labels.transform[1].calculate = `{1:${c},4:${c + r},7:${c},10:${c - r}}[datum.month]`;
    labels.transform[2].calculate = `{1:${mid - r},4:${mid},7:${mid + r},10:${mid}}[datum.month]`;
  }
  return vegaEmbed(el, spec, opts);
}

Promise.all(specs.map((name, i) => load(name, `#vis${i + 1}`))).then(results => {
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
