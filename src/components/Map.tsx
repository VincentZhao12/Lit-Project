import * as React from "react";
import { useState } from "react";
import StateInfo from "./StateInfo";
import Spectrum from "../assets/Spectrum.png";

export interface MapProps {
  svg?: any;
  colors?: any;
  statesData?: {
    [key: string]: StateData;
  };
}

const Map: React.FC<MapProps> = ({ statesData, svg }) => {
  const [selected, setSelected] = useState<StateData>();
  function perc2color(perc: number) {
    var r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  }
  if (!svg || !statesData) return <div>Loading...</div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Heatmap of African Americans by State</h3>
        <svg style={{ width: 600 }} viewBox="0 0 960 600">
          {svg.map(
            (
              path: { shape: string; id: string },
              index: React.Key | null | undefined
            ) => {
              return (
                <path
                  style={{
                    cursor: "pointer",
                    fill: perc2color(
                      ((0.5 -
                        statesData[path.id]?.blackPeople /
                          statesData[path.id].population) /
                        0.8) *
                        70
                    ),
                  }}
                  key={index}
                  stroke="#fff"
                  strokeWidth="6px"
                  d={path.shape}
                  onMouseOver={(event: any) => {
                    event.target.style.fill = "red";
                    setSelected(statesData[path.id]);
                  }}
                  onMouseOut={(event: any) => {
                    event.target.style.fill = perc2color(
                      ((0.5 -
                        statesData[path.id]?.blackPeople /
                          statesData[path.id].population) /
                        0.8) *
                        70
                    );
                  }}
                ></path>
              );
            }
          )}
        </svg>
        <Legend low="Less African Americans" high="More African Americans" />
        <h3>Heatmap of Median Household Income by State</h3>
        <svg style={{ width: 600 }} viewBox="0 0 960 600">
          {svg.map(
            (
              path: { shape: string; id: string },
              index: React.Key | null | undefined
            ) => {
              return (
                <path
                  style={{
                    cursor: "pointer",
                    fill: perc2color(
                      ((Number.parseInt(
                        statesData[path.id]?.medianHouseholdIncome + ""
                      ) -
                        67340 / 2) /
                        91957) *
                        100
                    ),
                  }}
                  key={index}
                  stroke="#fff"
                  strokeWidth="6px"
                  d={path.shape}
                  onMouseOver={(event: any) => {
                    event.target.style.fill = "red";
                    setSelected(statesData[path.id]);
                  }}
                  onMouseOut={(event: any) => {
                    event.target.style.fill = perc2color(
                      ((Number.parseInt(
                        statesData[path.id]?.medianHouseholdIncome + ""
                      ) -
                        67340 / 2) /
                        91957) *
                        100
                    );
                  }}
                ></path>
              );
            }
          )}
        </svg>
        <Legend low="Greater household income" high="Lower household income" />
      </div>
      {selected && <StateInfo stateData={selected} />}
    </div>
  );
};

interface LegendProps {
  low: string;
  high: string;
}
const Legend: React.FC<LegendProps> = ({ low, high }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        width: "100%",
      }}
    >
      <img
        src={Spectrum}
        alt="Spectrum"
        width={300}
        style={{
          transform: "scaleX(-1)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "300px",
        }}
      >
        <p style={{ fontSize: "0.75em" }}>{low}</p>
        <p style={{ fontSize: "0.75em", textAlign: "right" }}>{high}</p>
      </div>
    </div>
  );
};

export default Map;
