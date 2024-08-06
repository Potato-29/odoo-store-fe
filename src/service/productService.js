import { axiosInstance } from "../util/axios";

export const getALL = async (page, limit, search = "") => {
  const { data } = await axiosInstance.get(
    `/products/get-products?page=${page}&limit=${limit}&search=${search}`
  );
  return data;
};

export const addToCart = async (item) => {
  const { data } = await axiosInstance.post("/cart/add", item);
  return data.data;
};

export const getSearchItems = async (query) => {
  const { data } = await axiosInstance.get(`/products/list?search=${query}`);
  return data.data;
};
