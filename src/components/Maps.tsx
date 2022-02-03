import * as React from "react";
import { useState } from "react";
import StateInfo from "./StateInfo";
import Spectrum from "../assets/Spectrum.png";

export interface MapsProps {
  svg?: any;
  colors?: any;
  statesData?: {
    [key: string]: StateData;
  };
}

const Maps: React.FC<MapsProps> = ({ statesData, svg }) => {
  const [selected, setSelected] = useState<StateData>();

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
          marginRight: "2%",
        }}
      >
        <Map
          svg={svg}
          statesData={statesData}
          onSelect={(state) => setSelected(statesData[state])}
          title="Heatmap of African Americans by State"
          calculatePercent={(data) =>
            ((0.5 - data?.blackPeople / data.population) / 0.8) * 70
          }
          lower="Less African Americans"
          upper="More African Americans"
        />

        <Map
          svg={svg}
          statesData={statesData}
          onSelect={(state) => setSelected(statesData[state])}
          title="Heatmap of Household Income by State"
          calculatePercent={(data) =>
            ((Number.parseInt(data.medianHouseholdIncome + "") - 67340 / 2) /
              91957) *
            100
          }
          lower="Greater Income"
          upper="Less Income"
        />
        <Map
          svg={svg}
          statesData={statesData}
          onSelect={(state) => setSelected(statesData[state])}
          title="Heatmap of Uninsured People by State"
          calculatePercent={(data) => (0.5 - data?.uninsured) * 70}
          lower="Less Uninsured"
          upper="More Uninsured"
        />
      </div>
      {selected && <StateInfo stateData={selected} />}
    </div>
  );
};

interface MapProps {
  statesData: {
    [key: string]: StateData;
  };
  calculatePercent: (data: StateData) => number;
  lower: string;
  upper: string;
  onSelect: (state: string) => any;
  svg: any;
  title: string;
}

const Map = ({
  statesData,
  calculatePercent,
  lower,
  upper,
  svg,
  onSelect,
  title,
}: MapProps) => {
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
  return (
    <div className="card">
      <h3>{title}</h3>
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
                  fill: perc2color(calculatePercent(statesData[path.id])),
                }}
                key={index}
                stroke="#fff"
                strokeWidth="6px"
                d={path.shape}
                onMouseOver={(event: any) => {
                  event.target.style.fill = "blue";
                  onSelect(path.id);
                }}
                onMouseOut={(event: any) => {
                  event.target.style.fill = perc2color(
                    calculatePercent(statesData[path.id])
                  );
                }}
              ></path>
            );
          }
        )}
      </svg>
      <Legend low={lower} high={upper} />
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

export default Maps;
