import ReactSlider from "react-slider";
import PropTypes from "prop-types";
import "./slider.css";
import React from "react";

export const DoubleSlider = ({
  sliderValue,
  handleChange,
  handleAfterChange,
  min,
  max,
  className,
  thumbClassName,
  trackClassName,
}) => {
  return (
    <React.Fragment>
      <ReactSlider
        value={sliderValue}
        className={className}
        thumbClassName={thumbClassName}
        trackClassName={trackClassName}
        onChange={handleChange}
        onAfterChange={handleAfterChange}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        min={min}
        max={max}
      />
      <div className="slider-values">
        <div className="slider-handle-value">{sliderValue[0]}</div>
        <div className="slider-handle-value">{sliderValue[1]}</div>
      </div>
    </React.Fragment>
  );
};

DoubleSlider.propTypes = {
  sliderValue: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAfterChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  className: PropTypes.string,
  thumbClassName: PropTypes.string,
  trackClassName: PropTypes.string,
};

DoubleSlider.defaultProps = {
  className: "horizontal-slider",
  thumbClassName: "thumb",
  trackClassName: "track",
};
