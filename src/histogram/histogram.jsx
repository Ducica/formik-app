import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { arrayData } from "./data.js";
import PropTypes from "prop-types";
import { Xaxis } from "./Xaxis.jsx";
import "./slider.css";
import { Popup } from "semantic-ui-react";

export const Histogram = ({
  histogramData,
  svgWidth,
  svgHeight,
  svgMargins,
  rectangleWidth,
  rectangleSpacing,
  rectangleClassName,
  handleRectangleClick,
}) => {
  const svgContainerRef = useRef();

  useEffect(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.scrollLeft =
        svgContainerRef.current.scrollWidth -
        svgContainerRef.current.clientWidth;
    }
  }, []);

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

  const bars = histogramData.map((d, i) => {
    return (
      <Popup
        offset={[0, 10]}
        position="top center"
        key={d.year}
        content={`${d.year}: ${d.count}`}
        trigger={
          <rect
            className={rectangleClassName}
            x={x(d.year) - rectangleWidth / 2}
            width={rectangleWidth}
            y={y(d.count)}
            height={y(0) - y(d.count)}
            fill="steelblue"
            onClick={() => handleRectangleClick(d)}
          />
        }
      />
    );
  });

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

Histogram.propTypes = {
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
  rectangleClassName: PropTypes.string,
  handleRectangleClick: PropTypes.func,
};

Histogram.defaultProps = {
  rectangleWidth: 12,
  rectangleSpacing: 2,
  rectangleClassName: "histogram-rectangle",
  handleRectangleClick: () => {},
};
