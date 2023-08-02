import * as d3 from "d3";

async function getData() {
  let result = [];

  try {
    const rawData = await d3.csv("/skyscrapers.csv");
    result = rawData.map((data) => {
      return {
        id: data.id,
        city: `${data["location.city"]}, (${data["location.country"]})`,
        name: data.name,
        height: data["statistics.height"],
      };
    });
  } catch (ex) {
    console.error(ex);
  }

  console.log("skyscrapers", result);
  return result;
}

async function buildChart(app) {
  const data = await getData();

  app.innerHTML = `
    <div class="mx-auto p-2">
      <a href="/">Go back home</a>
      <div id="chart" class="px-2 py-1 mx-auto w-[810px] my-4 border border-black">
      </div>
    </div>
  `;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", 800)
    .attr("height", 350);

  const dataPoints = data.slice(0, 100);
  const dataPointsCount = dataPoints.length;
  const barWidth = 800 / (dataPointsCount * 2);
  const rect = svg.selectAll("rect").data(dataPoints);
  // render charts
  rect
    .enter()
    .append("rect")
    .attr("x", (_, pos) => pos * 10)
    .attr("y", 0)
    .attr("width", barWidth)
    .attr("height", ({ height }) => (height / 350) * 100)
    .attr("fill", "black");
}

export { buildChart as renderSkyScrappersChart };
