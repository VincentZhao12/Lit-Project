/// <reference types="react-scripts" />
declare module "*.svg" {
  const content: any;
  export default content;
}
declare interface StateData {
  blackPeople: number;
  peopleInPoverty: number;
  medianHouseholdIncome: number;
  population: number;
  stateName: string;
}
