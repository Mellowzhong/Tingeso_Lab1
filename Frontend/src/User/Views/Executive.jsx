import { getAllCredits } from "../../Credit/Services/CreditService";
import { updatefinanceEvaluation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';
import { downloadDocument } from "../../Document/Services/DocumentServices";

import { useEffect, useState } from "react";

import FeeToIncomeRatio from "../../FinanceEvaluation/Components/FeeToIncomeratioForm";
import CreditHistoryForm from "../../FinanceEvaluation/Components/CreditHistoryForm";
import EmpoymentHistoryForm from "../../FinanceEvaluation/Components/EmploymentHistoryForm";
import DebtToIncomeForm from "../../FinanceEvaluation/Components/DebtToIncomeForm";
import FinanceMaxAmountFrom from "../../FinanceEvaluation/Components/FinanceMaxAmountFrom";
import ApplicantAgeForm from "../../FinanceEvaluation/Components/ApplicantAgeForm";
import SavingCapacityForm from "../../FinanceEvaluation/Components/SavingCapacityForm";
import EvaluationResultForm from "../../FinanceEvaluation/Components/EvaluationResultForm";
import TotalCostForm from "../../FinanceEvaluation/Components/TotalCostForm";
import CalculateDataForm from "../../Components/CalculateDataForm";

function Executive() {
    const [documents, setDocuments] = useState([]);

    // Calculate Data
    const [creditAmount, setCreditAmount] = useState(0);
    const [simulatedInterestRate, setSimulatedInterestRate] = useState(0);
    const [numberOfPays, setNumberOfPays] = useState(0);
    const [totalPriceHome, setTotalPriceHome] = useState(0);
    const [monthlyClientIncome, setMonthlyClientIncome] = useState(0);

    // Evaluation Data
    const [feeToIncomeRatio, setFeeToIncomeRatio] = useState(false);
    const [creditHistory, setCreditHistory] = useState(false);
    const [employmentHistory, setEmploymentHistory] = useState(false);
    const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(false);
    const [financeMaxAmount, setFinanceMaxAmount] = useState(false);
    const [applicantAge, setApplicantAge] = useState(false);
    const [savingCapacity, setSavingCapacity] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(false);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await getAllCredits();
                console.log("Fetched credits:");
                setDocuments(response || []);
            } catch (error) {
                console.error("Error fetching credits:", error);
                setDocuments([]);
            }
        };

        fetchCredits();
    }, []);

    const formHandleSubmit = async (e, creditId, financialEvaluationId) => {
        e.preventDefault();
        const FinanceEvaluationData = {
            feeToIncomeRatio,
            creditHistory,
            employmentHistory,
            debtToIncomeRatio,
            financeMaxAmount,
            applicantAge,
            savingCapacity,
            evaluationResult
        };
        const response = await updatefinanceEvaluation(creditId, financialEvaluationId, FinanceEvaluationData);
        console.log("Response:", response);
    }

    const documentHandleSubmit = async (e, documentId, fileName) => {
        e.preventDefault();
        console.log("Requesting document:", documentId, fileName);
        const response = await downloadDocument(documentId, fileName);
        console.log("Response:", response);
    };

    return (
        <div className="flex flex-col items-center">
            <h1>Executive</h1>


            <ul className="w-full flex flex-col items-center">
                {documents.map((credit) => (
                    <div className="border-2 my-4 w-1/2 text-center" key={credit.id}>
                        <p>Credit ID: {credit.id}</p>
                        {credit.financialEvaluation.evaluationResult ? <p>true</p> : <p>false</p>}
                        <p>financial evaluation ID: {credit.financialEvaluation.id}</p>
                        <p>Tipo de credito: {credit.creditType}</p>
                        <span>User info</span>
                        <p>First Name: {credit.user.firstName}</p>
                        <p>Last Name: {credit.user.lastName}</p>
                        <p>Rut: {credit.user.rut}</p>
                        <section>
                            <section>
                                <CalculateDataForm setCreditAmount={setCreditAmount}
                                    setSimulatedInterestRate={setSimulatedInterestRate}
                                    setNumberOfPays={setNumberOfPays}
                                    setTotalPriceHome={setTotalPriceHome}
                                    setMonthlyClientIncome={setMonthlyClientIncome}
                                />
                            </section>
                            <form className="grid my-4" onSubmit={(e) => formHandleSubmit(e, credit.id, credit.financialEvaluation.id)}>
                                <FeeToIncomeRatio feeToIncomeRatio={feeToIncomeRatio}
                                    setFeeToIncomeRatio={setFeeToIncomeRatio}
                                    creditAmount={creditAmount}
                                    simulatedInterestRate={simulatedInterestRate}
                                    numberOfPays={numberOfPays}
                                    totalPriceHome={totalPriceHome}
                                    monthlyClientIncome={monthlyClientIncome}
                                />
                                <CreditHistoryForm className="border-2 my-4"
                                    creditHistory={creditHistory}
                                    setCreditHistory={setCreditHistory}
                                />
                                <EmpoymentHistoryForm className="border-2 my-4"
                                    employmentHistory={employmentHistory}
                                    setEmploymentHistory={setEmploymentHistory}
                                />
                                <DebtToIncomeForm className="border-2 my-4"
                                    debtToIncomeRatio={debtToIncomeRatio}
                                    setDebtToIncomeRatio={setDebtToIncomeRatio}
                                    creditAmount={creditAmount}
                                    simulatedInterestRate={simulatedInterestRate}
                                    numberOfPays={numberOfPays}
                                    totalPriceHome={totalPriceHome}
                                    monthlyClientIncome={monthlyClientIncome}
                                    creditType={credit.creditType}
                                />
                                <FinanceMaxAmountFrom className="border-2 my-4"
                                    financeMaxAmount={financeMaxAmount}
                                    setFinanceMaxAmount={setFinanceMaxAmount}
                                    creditAmount={creditAmount}
                                    simulatedInterestRate={simulatedInterestRate}
                                    numberOfPays={numberOfPays}
                                    totalPriceHome={totalPriceHome}
                                    creditType={credit.creditType}
                                    setCreditAmount={setCreditAmount}
                                    setSimulatedInterestRate={setSimulatedInterestRate}
                                    setNumberOfPays={setNumberOfPays}
                                    setTotalPriceHome={setTotalPriceHome}
                                />
                                <ApplicantAgeForm className="border-2 my-4"
                                    applicantAge={applicantAge}
                                    setApplicantAge={setApplicantAge}
                                />
                                <SavingCapacityForm className="border-2 my-4"
                                    savingCapacity={savingCapacity}
                                    setSavingCapacity={setSavingCapacity}
                                />
                                <TotalCostForm className="border-2 my-4"
                                    creditAmount={creditAmount}
                                    simulatedInterestRate={simulatedInterestRate}
                                    numberOfPays={numberOfPays}
                                    totalPriceHome={totalPriceHome}
                                    creditType={credit.creditType}
                                />
                                <EvaluationResultForm className="border-2 my-4"
                                    evaluationResult={evaluationResult}
                                    setEvaluationResult={setEvaluationResult}
                                />

                                <button type="submit">Mandar</button>
                            </form>
                            <div className="border-2 m-4">
                                <h2 className='mt-10'>Solicitar los documentos</h2>
                                {credit.documents.map((document) => (
                                    <form
                                        className="my-4"
                                        onSubmit={(e) => documentHandleSubmit(e, document.id, document.documentName)}
                                        key={document.id}
                                    >
                                        <p>Document ID: {document.id}</p>
                                        <p>Document Name: {document.documentName}</p>
                                        <p>Document Type: {document.documentType}</p>
                                        <p>Document Credit Type: {document.typeCreditDocument}</p>
                                        <button type="submit">Solicitar documento</button>
                                    </form>
                                ))}
                            </div>
                        </section>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Executive;