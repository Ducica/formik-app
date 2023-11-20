import React, { useState } from "react";
import { ChartComponentA } from "./histogram";
import { Form } from "semantic-ui-react";
import { arrayData } from "./data";
import ReactSlider from "react-slider";
import "./slider.css";

export const HistogramComponent = ({ histogramData }) => {
  const [sliderValue, setSliderValue] = useState([
    arrayData[0].year,
    arrayData[arrayData.length - 1].year,
  ]);
  const [data, setData] = useState(histogramData);

  //   const modifiedHistData = histogramData.filter(
  //     (d) => d.year >= sliderValue[0] && d.year <= sliderValue[1]
  //   );
  const handleSliderRelease = (value) => {
    const newData = histogramData.filter(
      (d) => d.year >= value[0] && d.year <= value[1]
    );
    setData(newData);
  };
  let modifiedHistData = histogramData;
  console.log(sliderValue);
  return (
    <React.Fragment>
      <ChartComponentA histogramData={data} />
      <div style={{ marginTop: "100px" }}>
        <ReactSlider
          value={sliderValue}
          className={`horizontal-slider`}
          thumbClassName="thumb"
          trackClassName="track"
          onChange={(value, index) => {
            console.log(index);
            setSliderValue(value);
          }}
          onAfterChange={handleSliderRelease}
          // defaultValue={[0, 100]}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          min={arrayData[0].year}
          max={arrayData[arrayData.length - 1].year}
        />
      </div>
    </React.Fragment>
  );
};
