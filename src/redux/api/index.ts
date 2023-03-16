import axios from "axios";

export const BASE_URL = 'https://924f8b6f-f47d-4634-9096-38c8a851178e.mock.pstmn.io';

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
  return await axios.put(`${BASE_URL}/shipment/create`, { robotIds });
};
