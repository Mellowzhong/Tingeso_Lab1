import api from "../../Tools/BaseUrl";

export const postCredit = async (creditRequest, userId) => {
  try {
    const response = await api.post(`/credit/add/${userId}`, creditRequest);
    return response.data;
  } catch (error) {
    console.error("Error posting credit request:", error);
  }
};
