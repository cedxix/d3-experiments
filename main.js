import "./style.css";
import * as d3 from "d3";
import { renderSkyScrappersChart } from "./src/skyscrapper";

const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);
// draw a circle on the screen.
// const circle = canvas
//   .append("circle")
//   .attr("cx", 200)
//   .attr("cy", 200)
//   .attr("r", 50)
//   .attr("fill", "red");
//
//

function renderHome() {
  document.querySelector("#app").innerHTML = `
    <div class="w-xl m-auto p-4">
      <h1 class="font-semibold text-xl leading-9">Charts List</h1>
      <div>
        <ul class="px-4">
          <li class="text-blue-500 hover:text-blue-400"><a href="/?page=skyscrapers">The tallest building in the world</li></li>
          <li class="text-blue-500 hover:text-blue-400"><a href="/?page=population">The world population</a></li>
        </ul>
      </div>
    </div>
  `;
}

const url = new URL(window.location.href);
const pageParam = url.searchParams.get("page");
const render =
  {
    skyscrapers: () => renderSkyScrappersChart(app),
  }[pageParam] ?? renderHome;

render();
