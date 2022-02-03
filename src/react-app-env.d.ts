/// <reference types="react-scripts" />
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "@deck.gl/core";
declare module "@deck.gl/layers";
declare module "@deck.gl/react";
declare interface StateData {
  blackPeople: number;
  peopleInPoverty: number;
  medianHouseholdIncome: number;
  population: number;
  stateName: string;
  uninsured: number;
}
