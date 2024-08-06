import { axiosInstance } from "../util/axios";

export const getCart = async () => {
  const { data } = await axiosInstance.get("/cart/items");
  return data.data;
};

export const updateCart = async (id, type) => {
  const { data } = await axiosInstance.post(`/cart/update/${id}`, { type });
  return data.data;
};
