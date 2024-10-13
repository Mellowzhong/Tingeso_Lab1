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

export const getDocuments = async () => {
  const response = await api.get(
    `/api/documents/${"02292397-ea5e-4247-bf43-e10b85bfa18d"}`,
    { responseType: "blob" }
  );

  const url = URL.createObjectURL(response.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = "file.pdf";
  a.click();

  console.log(url);
  return response.data;
};
