import api from "../../Utils/BaseUrl";

export const postCredit = async (creditRequest, userId) => {
  const response = await api.post(`/credit/add/${userId}`, creditRequest);
  return response.data;
};

export const getAllCredits = async () => {
  try {
    const response = await api.get("/credit/getAll");
    return response.data;
  } catch (error) {
    console.error("Error posting credit request:", error);
  }
};
