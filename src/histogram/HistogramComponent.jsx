import React, { useState } from "react";
import { Histogram } from "./histogram";
import { arrayData } from "./data";
import { DoubleSlider } from "./DoubleSlider";
import "./slider.css";

const renderThumb = (props, state) => {
  console.log(state);
  return (
    <div {...props}>
      <div></div>
    </div>
  );
};

export const HistogramComponent = ({ histogramData }) => {
  const [sliderValue, setSliderValue] = useState([
    arrayData[0].year,
    arrayData[arrayData.length - 1].year,
  ]);
  const [data, setData] = useState(histogramData);

  const handleAfterChange = (value) => {
    const newData = histogramData.filter(
      (d) => d.year >= value[0] && d.year <= value[1]
    );
    setData(newData);
  };

  const handleChange = (value) => {
    setSliderValue(value);
  };

  const handleRectangleClick = (value) => {
    setSliderValue([value.year, value.year]);
    setData([value]);
  };

  return (
    <React.Fragment>
      <Histogram
        histogramData={data}
        svgHeight={250}
        rectangleClassName={"histogram-rectangle"}
        handleRectangleClick={handleRectangleClick}
      />
      <DoubleSlider
        sliderValue={sliderValue}
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        handleChange={handleChange}
        handleAfterChange={handleAfterChange}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        min={arrayData[0].year}
        max={arrayData[arrayData.length - 1].year}
      />
    </React.Fragment>
  );
};
