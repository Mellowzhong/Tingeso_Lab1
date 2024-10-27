import api from "../../Tools/BaseUrl";

export const postFinanceEvaluation = async (
  creditId,
  FinanceEvaluationData
) => {
  const response = await api.post(
    `/financialEvaluation/post/${creditId}`,
    FinanceEvaluationData
  );
  return response.data;
};

export const updatefinanceEvaluation = async (
  creditId,
  financialEvaluationId,
  financialEvaluationData
) => {
  const response = await api.put(
    `/financialEvaluation/update/${creditId}/${financialEvaluationId}`,
    financialEvaluationData
  );
  return response.data;
};

export const getDebtToIncomeRatioCalculation = async (debtToIncomeData) => {
  const response = await api.post(
    "/calculate/debtToIncomeRatio",
    debtToIncomeData
  );
  return response.data;
};
