import { axiosInstance } from "../util/axios";

export const getCart = async (id) => {
  const { data } = await axiosInstance.get(`/cart/items/${id}`);
  return data.data;
};

export const updateCart = async (id, items, itemId, type) => {
  const { data } = await axiosInstance.post(`/cart/update/${id}`, {
    items,
    itemId,
    type,
  });
  return data.data;
};
