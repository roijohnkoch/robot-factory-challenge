import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getRobotsApi, postExtinguishApi, postRecycleApi, putSendShipmentApi } from '../api';
import * as constants from '../types';
import { robotsSelector } from '../selectors';

function* getRobots() {
  try {
    const response: ReturnType<typeof getRobotsApi> = yield call(getRobotsApi);
    const { data }: any = response;
    yield put({ type: constants.GET_ROBOTS_SUCCESS, payload: data })
  } catch (error) {
    yield put({ type: constants.GET_ROBOTS_FAILED, payload: error })
  }
}

function* postExtinguish(action: any) {
  try {
    const robots: ReturnType<typeof robotsSelector> = yield select(robotsSelector);
    const response: ReturnType<typeof postExtinguishApi> = yield call(postExtinguishApi, action.payload);
    const { data }: any = response;
    const robotList = robots.map((robot) => robot);
    const indexOfSelected = robotList.findIndex((robot) => robot.id === data.id);
    robotList[indexOfSelected] = { ...data };
    yield put({ type: constants.POST_EXTINGUISH_SUCCESS, payload: robotList });
  } catch (error) {
    yield put({ type: constants.POST_EXTINGUISH_FAILED, payload: error })
  }
}

function* postRecycle(action: any) {
  try {
    yield call(postRecycleApi, action.payload);
    yield put({ type: constants.POST_RECYCLE_SUCCESS })
  } catch (error) {
    yield put({ type: constants.POST_RECYCLE_FAILED, payload: error })
  }
}

function* putSendShipment(action: any) {
  try {
    const response: ReturnType<typeof putSendShipmentApi> = yield call(putSendShipmentApi, action.payload);
    const { data }: any = response;
    yield put({ type: constants.PUT_SEND_SHIPMENT_SUCCESS, payload: data })
  } catch (error) {
    yield put({ type: constants.PUT_SEND_SHIPMENT_FAILED, payload: error })
  }
}

export default function* robotsSaga() {
  yield takeEvery(constants.GET_ROBOTS_REQUEST, getRobots);
  yield takeEvery(constants.POST_EXTINGUISH_REQUEST, postExtinguish);
  yield takeEvery(constants.POST_RECYCLE_REQUEST, postRecycle);
  yield takeEvery(constants.PUT_SEND_SHIPMENT_REQUEST, putSendShipment);
}
