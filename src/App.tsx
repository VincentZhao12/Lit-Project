import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import "./App.css";

const App = () => {
  const [svg, setSvg] = useState();
  const [stateData, setStateData] = useState<{
    [key: string]: StateData;
  }>();

  // This should only run once due to the [] arg for the dependencies.
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://willhaley.com/assets/united-states-map-react/states.json"
      );
      const svg = await res.json();
      // Set the svg with the data received from fetch().
      setSvg(svg);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const povRes = await fetch(
        "https://api.census.gov/data/timeseries/poverty/saipe?get=SAEPOVALL_PT,SAEMHI_PT,NAME,STATE&for=state:*&time=2020"
      );
      const popRes = await fetch(
        "https://api.census.gov/data/2020/dec/pl?get=NAME,P1_001N,P1_004N&for=state:*"
      );

      let popTable = await popRes.json();
      let povertyTable = await povRes.json();

      povertyTable = povertyTable.slice(1);
      popTable = popTable.slice(1);
      popTable.pop();

      let povertyData: {
        peopleInPoverty: any;
        medianHouseholdIncome: any;
        state: any;
      }[] = [];
      povertyTable.forEach((row: any[]) => {
        povertyData.push({
          peopleInPoverty: row[0],
          medianHouseholdIncome: row[1],
          state: FIPS_CODES[row[3]],
        });
      });

      let popData: {
        blackPeople: any;
        population: any;
        state: any;
      }[] = [];
      popTable.forEach((row: any[]) => {
        popData.push({
          blackPeople: row[2],
          population: row[1],
          state: FIPS_CODES[row[3]],
        });
      });
      let stateData: {
        [key: string]: StateData;
      } = {};
      let maxIncome = 0;
      povertyData.forEach((row: any, index) => {
        maxIncome = Math.max(maxIncome, row.medianHouseholdIncome);
        stateData[row.state] = {
          blackPeople: popData[index].blackPeople,
          peopleInPoverty: row.peopleInPoverty,
          medianHouseholdIncome: row.medianHouseholdIncome,
          population: popData[index].population,
          stateName: `${row.state}`,
        };
      });

      setStateData(stateData);
    })();
  }, []);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1>
        <i>Raisin in the Sun</i> Menu Project
      </h1>
      <Map svg={svg} statesData={stateData} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <p style={{ width: "40%", lineHeight: "30px", fontSize: "18px" }}>
          This is a heatmap of African Americans and poverty by state. The
          darker the color, of the heatmap, the more people are in African
          Americans in the first chart and the lower median household income in
          that state. It can be seen through the 2 charts that states with
          greater African American populations tend to have greater rates of
          poverty. This depicts how due to systemic racism, African Americans
          tend to still continue to live in poorer areas much like is seen in{" "}
          <i>Raisin in the Sun</i> written by Lorraine Hansberry which stars an
          African American family who begin the story living in a poor run down
          appartament with 4 people, 3 generations, and a child on the way.
          Additionally Walter and Ruth must work jobs for little pay working for
          upper class white people depicting how African Americans have very
          little ability for social mobility as they are stuck in poverty and
          are unable to escape due to a lack of resources. The family in the
          play is only able to escape their poor neighborhood due to a life
          insurance check which depicts the amount of chance and hardship that
          must go into escaping that level of poverty for African Americans.
          Addtionally it can be seen through the first map that most African
          Americans still live in Southern states depicting the long lasting
          effects going as far back as slavery and the beginning of segregation.
          This is seen in <i>Raisin in the Sun</i> when Mama says "In my time we
          was worried about not being lynched and getting to the North if we
          could and how to stay alive and still have a pinch of dignity too"
          (Hansberry 59 (online version)). Mama explains her difficulty getting
          to the North, having to live in the constant fear of being lynched
          (extra-legal killings) through such a racist era. Furthermore, Mama
          talks about the fact that she continued to have to live in fear of
          being killed even after escaping the Southern lynching depicting how
          even though escaping to the North was good for African Americans, they
          still had to live in fear of what white people might do to them.{" "}
          <i>Raisin in the Sun</i> and these maps depict the extent to which
          African Americans have been left in poverty with very little chance
          for social mobility.
        </p>
      </div>
    </div>
  );
};

const FIPS_CODES: any = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  "10": "DE",
  "11": "DC",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
  "56": "WY",
};

export default App;
