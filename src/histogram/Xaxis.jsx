import React, { useMemo } from "react";

export const Xaxis = ({
  xScale,
  height,
  marginBottom,
  width,
  marginLeft,
  histogramData,
}) => {
  const ticks = useMemo(() => {
    return xScale.ticks(width / 80).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [histogramData]);

  return (
    <svg>
      <path
        d={`M ${0} ${height - marginBottom} H ${width}`}
        stroke="currentColor"
      />
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, ${height - marginBottom})`}
        >
          <line y2="6" stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  );
};
