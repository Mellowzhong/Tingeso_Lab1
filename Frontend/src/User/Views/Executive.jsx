import { getAllCredits } from "../../Credit/Services/CreditService";
import { updatefinanceEvaluation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';
import { downloadDocument } from "../../Document/Services/DocumentServices";

import { useEffect, useState } from "react";

import FinanceEvaluationForm from "../../FinanceEvaluation/Components/FinanceEvaluationForm";

// Falta agregar mas parametros de la confirmacion del credito y la logica de que si se aprueba o no
function Executive() {
    const [documents, setDocuments] = useState([]);

    const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(false);
    const [creditHistory, setCreditHistory] = useState(false);
    const [employmentHistory, setEmploymentHistory] = useState(false);
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
        const FinanceEvaluationData = { debtToIncomeRatio, creditHistory, employmentHistory, savingCapacity, evaluationResult };
        const response = await updatefinanceEvaluation(creditId, financialEvaluationId, FinanceEvaluationData);
        console.log("Response:", response);
    }

    const documentHandleSubmit = async (e, documentId, fileName) => {
        e.preventDefault();
        console.log("ola", documentId, fileName);
        const response = await downloadDocument(documentId, fileName);
        console.log("Response:", response);
    };

    return (
        <div className="flex flex-col items-center">
            <h1>Executive</h1>
            <FinanceEvaluationForm documents={documents}
                formHandleSubmit={formHandleSubmit}
                documentHandleSubmit={documentHandleSubmit}
                setDebtToIncomeRatio={setDebtToIncomeRatio}
                setCreditHistory={setCreditHistory}
                setEmploymentHistory={setEmploymentHistory}
                setSavingCapacity={setSavingCapacity}
                setEvaluationResult={setEvaluationResult}
                debtToIncomeRatio={debtToIncomeRatio}
                creditHistory={creditHistory}
                employmentHistory={employmentHistory}
                savingCapacity={savingCapacity}
                evaluationResult={evaluationResult}
            />
        </div>
    );
}

export default Executive;