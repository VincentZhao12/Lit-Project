import React, { FC } from "react";

interface StateInfoProps {
  stateData: StateData;
}

const StateInfo: FC<StateInfoProps> = ({ stateData }) => {
  return (
    <div style={{ width: "20%" }} className="card">
      <h3>{stateData.stateName}</h3>
      <p>Black Population: {stateData.blackPeople}</p>
      <p>
        Percent of African Americans:{" "}
        {Math.round((stateData.blackPeople / stateData.population) * 100)} %
      </p>
      <p>Median Househoold Income: {"$" + stateData.medianHouseholdIncome}</p>
      <p>People in Poverty: {stateData.peopleInPoverty}</p>
      <p>
        Percent in Poverty:{" "}
        {Math.round((stateData.peopleInPoverty / stateData.population) * 100)} %
      </p>
    </div>
  );
};

export default StateInfo;
