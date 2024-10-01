import api from "../../Tools/BaseUrl";

export const postUser = async (user) => {
  const response = await api.post("/user/post", user);
  return response.data;
};
