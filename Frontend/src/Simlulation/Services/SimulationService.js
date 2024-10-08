import api from "../../Tools/BaseUrl";

export const postSimulation = async (file, typeCredit) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("typeCredit", typeCredit);

  const response = await api.post("/api/documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
