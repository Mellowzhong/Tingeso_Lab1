import api from "../../Tools/BaseUrl";

export const postFile = async (file, typeCredit, creditId) => {
  console.log("creditiD", creditId);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("typeCredit", typeCredit);

  const response = await api.post(`/api/documents/post/${creditId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const downloadDocument = async (documentId, fileName) => {
  const response = await api.get(`/api/documents/${documentId}`, {
    responseType: "blob",
  });

  const url = URL.createObjectURL(response.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  console.log(url);
  return response.data;
};
