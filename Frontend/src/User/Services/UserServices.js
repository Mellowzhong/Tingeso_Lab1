import api from "../../Utils/BaseUrl";

export const postUser = async (user) => {
  try {
    const response = await api.post("/user/post", user);
    return { status: response.status };
  } catch (error) {
    return { status: error.response.status };
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
