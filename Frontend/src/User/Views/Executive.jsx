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
    const [balance, setBalance] = useState(0);

    // Evaluation Data
    const [feeToIncomeRatio, setFeeToIncomeRatio] = useState(false);
    const [creditHistory, setCreditHistory] = useState(false);
    const [employmentHistory, setEmploymentHistory] = useState(false);
    const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(false);
    const [financeMaxAmount, setFinanceMaxAmount] = useState(false);
    const [applicantAge, setApplicantAge] = useState(false);
    const [savingCapacity, setSavingCapacity] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(false);

    // Fetch credits on component mount
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

    // Handle form submission for financial evaluation
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
    };

    // Handle document request submission
    const documentHandleSubmit = async (e, documentId, fileName) => {
        e.preventDefault();
        console.log("Requesting document:", documentId, fileName);
        const response = await downloadDocument(documentId, fileName);
        console.log("Response:", response);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Vista de ejecutivo</h1>

            <ul className="w-full flex flex-col items-center">
                {documents.map((credit) => (
                    <div className="border-2 border-gray-300 rounded-lg p-6 my-4 w-full max-w-full" key={credit.id}>
                        <h2 className="text-xl font-semibold mb-4">Crédito ID: {credit.id}</h2>
                        <p className="mb-2">Resultado de evaluación financiera: {credit.financialEvaluation.evaluationResult ? "Aprobado" : "Pendiente"}</p>
                        <p className="mb-2">ID de evaluación financiera: {credit.financialEvaluation.id}</p>
                        <p className="mb-4">Tipo de crédito: {credit.creditType}</p>

                        {/* Contenedor principal con grid para organizar la información del usuario y los documentos */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                            {/* Información del usuario - ocupa 1/3 */}
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">Información del Usuario</h3>
                                <p>Nombre: {credit.user.firstName}</p>
                                <p>Apellido: {credit.user.lastName}</p>
                                <p>RUT: {credit.user.rut}</p>

                                {/* Formulario de cálculo de datos movido aquí */}
                                <section className="mt-6 ">
                                    <CalculateDataForm
                                        setCreditAmount={setCreditAmount}
                                        creditType={credit.creditType}
                                        setSimulatedInterestRate={setSimulatedInterestRate}
                                        setNumberOfPays={setNumberOfPays}
                                        setTotalPriceHome={setTotalPriceHome}
                                        setMonthlyClientIncome={setMonthlyClientIncome}
                                        setBalance={setBalance}
                                    />
                                </section>
                            </div>

                            {/* Sección para solicitar documentos - ocupa 2/3 */}
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Solicitar Documentos</h3>
                                <div className="flex flex-wrap">
                                    {credit.documents.map((document) => (
                                        <form
                                            key={document.id}
                                            onSubmit={(e) => documentHandleSubmit(e, document.id, document.documentName)}
                                            className="mb-4"
                                        >
                                            <p>ID del documento: {document.id}</p>
                                            <p>Nombre del documento: {document.documentName}</p>
                                            <p>Tipo de documento: {document.documentType}</p>
                                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-2">
                                                Solicitar Documento
                                            </button>
                                        </form>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Formulario de evaluación financiera */}
                        <form className="grid gap-4 mt-6" onSubmit={(e) => formHandleSubmit(e, credit.id, credit.financialEvaluation.id)}>
                            <FeeToIncomeRatio
                                feeToIncomeRatio={feeToIncomeRatio}
                                setFeeToIncomeRatio={setFeeToIncomeRatio}
                                creditAmount={creditAmount}
                                simulatedInterestRate={simulatedInterestRate}
                                numberOfPays={numberOfPays}
                                totalPriceHome={totalPriceHome}
                                monthlyClientIncome={monthlyClientIncome}
                            />
                            <CreditHistoryForm
                                creditHistory={creditHistory}
                                setCreditHistory={setCreditHistory}
                            />
                            <EmpoymentHistoryForm
                                employmentHistory={employmentHistory}
                                setEmploymentHistory={setEmploymentHistory}
                            />
                            <DebtToIncomeForm
                                debtToIncomeRatio={debtToIncomeRatio}
                                setDebtToIncomeRatio={setDebtToIncomeRatio}
                                creditAmount={creditAmount}
                                simulatedInterestRate={simulatedInterestRate}
                                numberOfPays={numberOfPays}
                                totalPriceHome={totalPriceHome}
                                monthlyClientIncome={monthlyClientIncome}
                            />
                            <FinanceMaxAmountFrom
                                financeMaxAmount={financeMaxAmount}
                                setFinanceMaxAmount={setFinanceMaxAmount}
                            />
                            <ApplicantAgeForm
                                applicantAge={applicantAge}
                                setApplicantAge={setApplicantAge}
                            />
                            <SavingCapacityForm
                                balance={balance}
                                creditAmount={creditAmount}
                                monthlyClientIncome={monthlyClientIncome}
                                setSavingCapacity={setSavingCapacity}
                            />
                            <TotalCostForm
                                creditAmount={creditAmount}
                                simulatedInterestRate={simulatedInterestRate}
                                numberOfPays={numberOfPays}
                                totalPriceHome={totalPriceHome}
                            />
                            <EvaluationResultForm
                                evaluationResult={evaluationResult}
                                setEvaluationResult={setEvaluationResult}
                            />

                            {/* Botón para enviar evaluación */}
                            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                                Enviar Evaluación
                            </button>
                        </form>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Executive;