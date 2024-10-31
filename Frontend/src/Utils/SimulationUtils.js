export const comprobeSimulatedInterestRate = (
  creditType,
  simulatedInterestRate
) => {
  if (creditType == "firstHome") {
    if (3.5 <= simulatedInterestRate && simulatedInterestRate <= 5.0) {
      console.log("si", simulatedInterestRate);
    } else {
      console.log("no", simulatedInterestRate);
    }
    console.log("firstHome");
  }
  if (creditType == "secondHome") {
    if (4.0 <= simulatedInterestRate && simulatedInterestRate <= 6.0) {
      console.log("si", simulatedInterestRate);
    } else {
      console.log("no", simulatedInterestRate);
    }
    console.log("secondHome");
  }
  if (creditType == "commercialProperty") {
    if (5.0 <= simulatedInterestRate && simulatedInterestRate <= 7.0) {
      console.log("si", simulatedInterestRate);
    } else {
      console.log("no", simulatedInterestRate);
    }
    console.log("commercialProperty");
  }
  if (creditType == "remodeling") {
    if (4.5 <= simulatedInterestRate && simulatedInterestRate <= 6.0) {
      console.log("si", simulatedInterestRate);
    } else {
      console.log("no", simulatedInterestRate);
    }
    console.log("remodeling");
  }
};
