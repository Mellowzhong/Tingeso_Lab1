import api from "../../Utils/BaseUrl";

export const postUser = async (user) => {
  try {
    const response = await api.post("/user/post", user);
    return response.data;
  } catch (error) {
    console.error("Error posting user", error);
  }
};

export const getUser = async (userData) => {
  try {
    const response = await api.post(`/user/get`, userData);
    return response.data;
  } catch (error) {
    console.error("Error getting user", error);
  }
};
