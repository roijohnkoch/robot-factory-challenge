import { IReducers } from "../../components/types";

export const robotsSelector = (state: IReducers) => {
  const { robotsReducer } = state;
  return robotsReducer.robots;
};