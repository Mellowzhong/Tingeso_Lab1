import api from "../../Tools/BaseUrl";

export const postUser = async (user) => {
  console.log("api", import.meta.env.VITE_APU_URL);
  const response = await api.post("/user/post", user);
  return response.data;
};

export const getUser = async (userData) => {
  const response = await api.post(`/user/get`, userData);
  return response.data;
};
