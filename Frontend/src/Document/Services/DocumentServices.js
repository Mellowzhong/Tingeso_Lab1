import api from "../../Utils/BaseUrl";

export const postFile = async (file, typeCredit, creditId) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("typeCredit", typeCredit);

    const response = await api.post(
      `/api/documents/post/${creditId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error posting file", error);
  }
};

export const downloadDocument = async (documentId, fileName) => {
  try {
    const response = await api.get(`/api/documents/${documentId}`, {
      responseType: "blob",
    });

    const url = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    return response.data;
  } catch (error) {
    console.error("Error downloading document", error);
  }
};

export const deleteDocument = async (documentId) => {
  try {
    const response = await api.delete(`/api/documents/delete/${documentId}`);
    return { data: response.data };
  } catch (error) {
    console.error("Error downloading document", error);
  }
};
