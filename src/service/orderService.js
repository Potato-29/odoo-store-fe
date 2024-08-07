import { axiosInstance } from "../util/axios";

export const placeOrder = async (body) => {
  const { data } = await axiosInstance.post("/order/place", body);
  return data.data;
};

export const trackOrder = async () => {
  const { data } = await axiosInstance.get(`/order/track`);
  return data.data;
};
