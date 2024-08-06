import { axiosInstance } from "../util/axios";

export const loginUser = async (body) => {
  const { data } = await axiosInstance.post("/user/login", body);
  return data.data;
};

export const signupUser = async (body) => {
  const { data } = await axiosInstance.post("/user/signup", body);
  return data.data;
};
