import { all } from "redux-saga/effects";
import robotsSaga from "./robots";

export default function* rootSaga() {
  yield all([
    robotsSaga(),
  ])
}