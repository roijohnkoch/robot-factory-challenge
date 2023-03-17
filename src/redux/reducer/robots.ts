import * as types from '../types';
import { IReduxState } from '../../components/types';

export const initialState: IReduxState= {
  robots: [],
  loading: false,
  error: null,
};

export default function robotsReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.GET_ROBOTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ROBOTS_SUCCESS:
      return {
        ...state,
        robots: action.payload,
        loading: false,
      };
    case types.GET_ROBOTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.POST_EXTINGUISH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.POST_EXTINGUISH_SUCCESS:
      return {
        ...state,
        loading: false,
        robots: action.payload,
      };
    case types.POST_EXTINGUISH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.POST_RECYCLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.POST_RECYCLE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.POST_RECYCLE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_READY_TO_SHIP:
      return {
        ...state,
        robots: action.payload,
        loading: false,
      };
    case types.PUT_SEND_SHIPMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PUT_SEND_SHIPMENT_SUCCESS:
      return {
        ...state,
        robots: action.payload,
        loading: false,
      };
    case types.PUT_SEND_SHIPMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}