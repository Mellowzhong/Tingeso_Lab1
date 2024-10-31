import api from "../../Utils/BaseUrl";

export const getSimulation = async (simulationData) => {
  const response = await api.post("/calculate/simulation", simulationData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
