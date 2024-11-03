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
                setDocuments(response || []);
            } catch {
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
        try {
            await updatefinanceEvaluation(creditId, financialEvaluationId, FinanceEvaluationData);
            alert("Evaluación enviada correctamente");
        }
        catch {
            alert("Error al enviar evaluación");
        }
    };

    // Handle document request submission
    const documentHandleSubmit = async (e, documentId, fileName) => {
        e.preventDefault();
        try {
            await downloadDocument(documentId, fileName);
            alert("Documento solicitado correctamente");
        }
        catch {
            alert("Error al solicitar documento");
        }
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
                                <h3 className="font-semibold text-lg mb-2 text-center">Información del Usuario</h3>
                                <div className="text-center">
                                    <p>Nombre: {credit.user.firstName}</p>
                                    <p>Apellido: {credit.user.lastName}</p>
                                    <p>Rut: {credit.user.rut}</p>
                                    <p>Direccion: {credit.user.address}</p>
                                    <p>Edad: {credit.user.age}</p>
                                </div>
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

                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-center">Solicitar Documentos</h3>
                                <div className="flex flex-wrap justify-center">
                                    {credit.documents.map((document) => (
                                        <form
                                            key={document.id}
                                            onSubmit={(e) => documentHandleSubmit(e, document.id, document.documentName)}
                                            className="m-4 text-center"
                                        >
                                            <div className="my-2 border-2 p-2 rounded-xl">
                                                <span>
                                                    <strong> ID del documento</strong>
                                                    <p className="my-2">{document.id}</p>
                                                </span>
                                                <span>
                                                    <strong> Nombre del documento</strong>
                                                    <p className="my-2"> {document.documentName}</p>
                                                </span>
                                                <span>
                                                    <strong> Tipo de documento</strong>
                                                    <p className="my-2">{document.documentType}</p>
                                                </span>
                                            </div>
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
                                creditType={credit.creditType}
                            />
                            <FinanceMaxAmountFrom
                                financeMaxAmount={financeMaxAmount}
                                setFinanceMaxAmount={setFinanceMaxAmount}
                                creditAmount={creditAmount}
                                simulatedInterestRate={simulatedInterestRate}
                                numberOfPays={numberOfPays}
                                totalPriceHome={totalPriceHome}
                                creditType={credit.creditType}
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
                                creditType={credit.creditType}
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