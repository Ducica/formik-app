import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { arrayData } from "./data.js";
import PropTypes from "prop-types";
import { Xaxis } from "./Xaxis.jsx";

// function to return maximum value of count from dataArray below

// console.log(d3.bin().value((d) => d.count)(histogramData));
// console.log("bla");
// const ChartComponent = () => {
//   const chartRef = useRef();
//   console.log("chart component");
//   useEffect(() => {
//     const width = 1500;
//     const height = 500;
//     const marginTop = 20;
//     const marginRight = 20;
//     const marginBottom = 30;
//     const marginLeft = 40;

//     // Bin the data.

//     // Declare the x (horizontal position) scale.
//     const x = d3
//       .scaleLinear()
//       .domain([histogramData[0].year, histogramData[histogramData.length - 1]])
//       .range([marginLeft, width - marginRight]);

//     // Declare the y (vertical position) scale.
//     const y = d3
//       .scaleLinear()
//       .domain([0, 60000])
//       .range([height - marginBottom, marginTop]);

//     // Create the SVG container.
//     const svg = d3
//       .create("svg")
//       .attr("height", height)
//       .attr("viewBox", [0, 0, width, height])
//       .attr("style", "height: auto;");
//     // .attr("overflow", "scroll");

//     // Add a rect for each bin.
//     svg
//       .append("g")
//       .attr("fill", "steelblue")
//       .selectAll()
//       .data(histogramData)
//       .join("rect")
//       .attr("x", (d, i) => marginLeft + i * 14)
//       .attr("width", 12)
//       .attr("y", (d) => y(d.count))
//       .attr("height", (d) => y(0) - y(d.count));

//     svg
//       .selectAll(".overlay")
//       .data(histogramData)
//       .join("rect")
//       .attr("class", "overlay")
//       .attr("x", (d, i) => marginLeft + i * 14)
//       .attr("width", 12)
//       .attr("y", 0)
//       .attr("height", height)
//       .attr("fill", "none")
//       .style("pointer-events", "all")
//       .on("mouseover", handleMouseOver)
//       .on("mouseout", handleMouseOut);

//     function handleMouseOver(e, d) {
//       // Highlight the corresponding rectangle on hover
//       // Show dynamic tooltip with pointer
//       const tooltip = d3
//         .select(".svg-container")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("position", "absolute")
//         .style("top", "0")
//         .style("pointer-events", "none")
//         .html(`${d.year}: ${d.count}`);

//       // Get mouse coordinates from the event object
//       const [mouseX, mouseY] = d3.pointer(e);

//       // Position tooltip near the mouse cursor
//       const tooltipWidth = 100; // Adjust the width of the tooltip as needed
//       const tooltipHeight = 40; // Adjust the height of the tooltip as needed

//       tooltip
//         .style("left", mouseX - tooltipWidth / 2 + "px")
//         .style("top", mouseY - tooltipHeight - 10 + "px");

//       // Add a triangle pointer to the tooltip
//       tooltip
//         .append("div")
//         .attr("class", "tooltip-pointer")
//         .style("border-width", "10px")
//         .style("border-style", "solid")
//         .style("border-color", "transparent transparent white transparent")
//         .style("position", "absolute")
//         .style("left", tooltipWidth / 2 - 10 + "px")
//         .style("top", tooltipHeight - 1 + "px");
//     }

//     function handleMouseOut(d, i) {
//       // Revert the color on mouseout

//       // Remove the tooltip on mouseout
//       d3.select(".tooltip").remove();
//     }

//     // Add the x-axis and label.
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height - marginBottom})`)
//       .call(
//         d3
//           .axisBottom(x)
//           .ticks(width / 80)
//           .tickSizeOuter(0)
//       )
//       .call((g) =>
//         g
//           .append("text")
//           .attr("x", width)
//           .attr("y", marginBottom - 4)
//           .attr("fill", "currentColor")
//           .attr("text-anchor", "end")
//           .text("Unemployment rate (%) →")
//       );

//     // Add the y-axis and label, and remove the domain line.
//     svg
//       .append("g")
//       .attr("transform", `translate(${marginLeft},0)`)
//       .call(d3.axisLeft(y).ticks(height / 40))
//       .call((g) => g.select(".domain").remove())
//       .call((g) =>
//         g
//           .append("text")
//           .attr("x", -marginLeft)
//           .attr("y", 10)
//           .attr("fill", "currentColor")
//           .attr("text-anchor", "start")
//           .text("↑ Frequency (no. of counties)")
//       );

//     // Return the SVG element.
//     chartRef.current.append(svg.node());
//   }, []);

//   return (
//     <div
//       ref={chartRef}
//       className="svg-container"
//       style={{ overflow: "auto", position: "relative" }}
//     />
//   );
// };

export const ChartComponentA = ({
  histogramData,
  svgWidth,
  svgHeight,
  svgMargins,
  rectangleWidth,
  rectangleSpacing,
}) => {
  const svgContainerRef = useRef();

  useEffect(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.scrollLeft =
        svgContainerRef.current.scrollWidth -
        svgContainerRef.current.clientWidth;
    }
  }, []);
  const roundedMaxCount = useMemo(
    () =>
      Math.ceil(Math.max(...histogramData.map((item) => item.count)) / 1000) *
      1000,
    [histogramData]
  );

  const handleMouseOver = (e, d) => {
    // Handle mouse over logic
  };

  const handleMouseOut = () => {
    // Handle mouse out logic
  };
  const [marginTop, marginRight, marginBottom, marginLeft] = svgMargins ?? [
    20, 20, 30, 40,
  ];
  const width =
    svgWidth ??
    histogramData.length * (rectangleWidth + rectangleSpacing) +
      marginLeft +
      marginRight +
      50;
  const height = svgHeight ?? 500;

  const x = d3
    .scaleLinear()
    .domain([
      histogramData[0].year,
      histogramData[histogramData.length - 1].year,
    ])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(histogramData, (d) => d.count)])
    .range([height - marginBottom, marginTop]);

  const bars = histogramData.map((d, i) => (
    <rect
      key={d.year}
      x={x(d.year) - rectangleWidth / 2}
      width={rectangleWidth}
      y={y(d.count)}
      height={y(0) - y(d.count)}
      fill="steelblue"
    />
  ));

  const overlayBars = histogramData.map((d, i) => (
    <rect
      key={d.year}
      className="overlay"
      x={x(d.year) - rectangleWidth / 2}
      width={rectangleWidth}
      y={0}
      height={height}
      fill="none"
      style={{ pointerEvents: "all" }}
      onMouseOver={(e) => handleMouseOver(e, d)}
      onMouseOut={handleMouseOut}
    />
  ));

  // const XAxis = () => (
  //   <g transform={`translate(0,${height - marginBottom})`}>
  //     {d3
  //       .axisBottom(x)
  //       .ticks(width / 80)
  //       .tickSizeOuter(0)}
  //     <text x={width} y={marginBottom - 4} fill="currentColor" textAnchor="end">
  //       Unemployment rate (%) →
  //     </text>
  //   </g>
  // );

  // const YAxis = () => (
  //   <g transform={`translate(${marginLeft},0)`}>
  //     {d3.axisLeft(y).ticks(height / 40)}
  //     <text x={-marginLeft} y={10} fill="currentColor" textAnchor="start">
  //       ↑ Frequency (no. of counties)
  //     </text>
  //   </g>
  // );

  return (
    <div
      className="svg-container"
      style={{ overflow: "auto", position: "relative" }}
      ref={svgContainerRef}
    >
      <svg
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ height: "auto" }}
      >
        {bars}
        {overlayBars}
        <Xaxis
          xScale={x}
          height={height}
          marginBottom={marginBottom}
          width={width}
          marginLeft={marginLeft}
          histogramData={histogramData}
        />
      </svg>
    </div>
  );
};

ChartComponentA.propTypes = {
  histogramData: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  svgMargins: PropTypes.arrayOf(PropTypes.number.isRequired),
  rectangleWidth: PropTypes.number,
  rectangleSpacing: PropTypes.number,
};

ChartComponentA.defaultProps = {
  rectangleWidth: 12,
  rectangleSpacing: 2,
};
