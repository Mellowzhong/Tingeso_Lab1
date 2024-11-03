import api from "../../Utils/BaseUrl";

export const getSimulation = async (simulationData) => {
  try {
    const response = await api.post("/calculate/simulation", simulationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting simulation", error);
  }
};
