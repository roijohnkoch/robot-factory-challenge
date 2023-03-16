import * as types from '../types';
import { IRobot } from '../../components/types';

export function getRobots() {
  return {
    type: types.GET_ROBOTS_REQUEST,
  }
}

export function postExtinguish(robotId: number) {
  return {
    type: types.POST_EXTINGUISH_REQUEST,
    payload: robotId,
  }
}

export function postRecycle(robotIds: number[]) {
  return {
    type: types.POST_RECYCLE_REQUEST,
    payload: robotIds,
  }
}

export function actionReadyToShip(robots: IRobot[]) {
  return {
    type: types.UPDATE_READY_TO_SHIP,
    payload: robots,
  }
}

export function putSendShipment(robotIds: number[]) {
  return {
    type: types.PUT_SEND_SHIPMENT_REQUEST,
    payload: robotIds,
  }
}
