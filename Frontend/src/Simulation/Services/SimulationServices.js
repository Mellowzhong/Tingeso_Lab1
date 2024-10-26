import api from "../../Tools/BaseUrl";

export const getSimulation = async (simulation) => {
  const response = await api.post("/calculate/simulation", simulation, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
