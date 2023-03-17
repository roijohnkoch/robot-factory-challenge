import axios from "axios";

export const BASE_URL = 'https://6b170ef6-9cc6-4ce5-80df-8b85f40af0c1.mock.pstmn.io';

export const getRobotsApi = async () => {
  return await axios.get(`${BASE_URL}/robots`);
};

export const postExtinguishApi = async (robotId: number) => {
  return await axios.post(`${BASE_URL}/robots/${robotId}/extinguish`);
};

export const postRecycleApi = async (robotIds: number[]) => {
  return await axios.post(`${BASE_URL}/robots/recycle`, { recycleRobots: robotIds });
};

export const putSendShipmentApi = async (robotIds: number[]) => {
  return await axios.put(`${BASE_URL}/shipment/create`, robotIds);
};
