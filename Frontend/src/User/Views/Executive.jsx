import { getAllCredits } from "../../Credit/Services/CreditService";
import { updatefinanceEvaluation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';
import { downloadDocument } from "../../Document/Services/DocumentServices";

import { useEffect, useState } from "react";
import FinanceEvaluationForm from "../../FinanceEvaluation/Components/FinanceEvaluationForm";

function Executive() {
    const [documents, setDocuments] = useState([]);

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
                setDocuments(response);
            } catch (error) {
                console.error("Error fetching credits:", error);
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
        console.log("Submitting Data:", FinanceEvaluationData); // Debugging line
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
            <FinanceEvaluationForm
                documents={documents}
                formHandleSubmit={formHandleSubmit}
                documentHandleSubmit={documentHandleSubmit}
                setFeeToIncomeRatio={setFeeToIncomeRatio}
                setCreditHistory={setCreditHistory}
                setEmploymentHistory={setEmploymentHistory}
                setDebtToIncomeRatio={setDebtToIncomeRatio}
                setFinanceMaxAmount={setFinanceMaxAmount}
                setApplicantAge={setApplicantAge}
                setSavingCapacity={setSavingCapacity}
                setEvaluationResult={setEvaluationResult}
                feeToIncomeRatio={feeToIncomeRatio}
                creditHistory={creditHistory}
                employmentHistory={employmentHistory}
                debtToIncomeRatio={debtToIncomeRatio}
                financeMaxAmount={financeMaxAmount}
                applicantAge={applicantAge}
                savingCapacity={savingCapacity}
                evaluationResult={evaluationResult}
            />
        </div>
    );
}

export default Executive;