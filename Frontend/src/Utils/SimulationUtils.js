import {
  fisrtHomeInterestRate,
  secondHomeInterestRate,
  commercialPropertyInterestRate,
  remodelingInterestRate,
} from "./Constants";

export const comprobeSimulatedInterestRate = (
  creditType,
  simulatedInterestRate
) => {
  if (creditType == "firstHome") {
    if (
      fisrtHomeInterestRate[0] <= simulatedInterestRate &&
      simulatedInterestRate <= fisrtHomeInterestRate[1]
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (creditType == "secondHome") {
    if (
      secondHomeInterestRate[0] <= simulatedInterestRate &&
      simulatedInterestRate <= secondHomeInterestRate[1]
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (creditType == "commercialProperty") {
    if (
      commercialPropertyInterestRate[0] <= simulatedInterestRate &&
      simulatedInterestRate <= commercialPropertyInterestRate[1]
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (creditType == "remodeling") {
    if (
      remodelingInterestRate[0] <= simulatedInterestRate &&
      simulatedInterestRate <= remodelingInterestRate[1]
    ) {
      return true;
    } else {
      return false;
    }
  }
};
