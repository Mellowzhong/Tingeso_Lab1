import { getAllCredits } from "../../Credit/Services/CreditService";
import { updatefinanceEvaluation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';
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
import DownloadDocument from "../../Components/DownloadDocument";

function Executive() {
    const [documents, setDocuments] = useState([]);
    const [submitMessage, setSubmitMessage] = useState('');
    const [response, setResponse] = useState(false);

    // Calculate Data
    const [simulatedInterestRate, setSimulatedInterestRate] = useState(0);
    const [numberOfPays, setNumberOfPays] = useState(0);
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
        setResponse(true);
        try {
            await updatefinanceEvaluation(creditId, financialEvaluationId, FinanceEvaluationData);
            setSubmitMessage("Evaluación enviada correctamente");
        }
        catch {
            setSubmitMessage("Error al enviar evaluación");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Vista de ejecutivo</h1>
            <div className="w-full flex flex-col items-center">
                {documents.map((credit) => (
                    <div className="border-2 border-gray-300 rounded-lg p-6 my-4 w-full max-w-full" key={credit.id}>

                        {/* Contenedor principal con grid para organizar la información del usuario y los documentos */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="bg-white rounded-lg p-2 my-2">
                                    <h2 className="font-semibold text-lg mb-2 text-center">Información del usuario</h2>
                                    <div className="text-center ">
                                        <p>Nombre: {credit.user.firstName}</p>
                                        <p>Apellido: {credit.user.lastName}</p>
                                        <p>Rut: {credit.user.rut}</p>
                                        <p>Direccion: {credit.user.address}</p>
                                        <p>Edad: {credit.user.age}</p>
                                        <p>Ingreso mensual: {credit.monthlyClientIncome}</p>
                                        <p>Precio total de la casa: {credit.totalPriceHome}</p>
                                        <p>Cantidad solicitada: {credit.requestedAmount}</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-2 my-2">
                                    <h3 className="font-semibold text-lg mb-2 text-center">Información del credito</h3>
                                    <div className="text-center">
                                        <p>Ingreso mensual: {credit.monthlyClientIncome}</p>
                                        <p>Precio total de la casa: {credit.totalPriceHome}</p>
                                        <p>Cantidad solicitada: {credit.requestedAmount}</p>
                                        <p className="mb-4">Tipo de crédito: {credit.creditType}</p>
                                        <p className="mb-2">Resultado de evaluación financiera: {credit.financialEvaluation.evaluationResult ? "Aprobado" : "Pendiente"}</p>
                                    </div>
                                </div>
                                {/* Formulario de cálculo de datos movido aquí */}
                                <section className="mt-6 ">
                                    <CalculateDataForm
                                        creditType={credit.creditType}
                                        setSimulatedInterestRate={setSimulatedInterestRate}
                                        setNumberOfPays={setNumberOfPays}
                                        setBalance={setBalance}
                                    />
                                </section>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-center">Solicitar Documentos</h3>
                                <div className="grid grid-cols-2 justify-center">
                                    {credit.documents.map((document) => (
                                        <DownloadDocument
                                            key={document.id}
                                            document={document}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Formulario de evaluación financiera */}
                        <form className="grid gap-4 mt-6" onSubmit={(e) => formHandleSubmit(e, credit.id, credit.financialEvaluation.id)}>
                            <section className="flex">
                                <FeeToIncomeRatio
                                    feeToIncomeRatio={feeToIncomeRatio}
                                    setFeeToIncomeRatio={setFeeToIncomeRatio}
                                    creditAmount={credit.requestedAmount}
                                    simulatedInterestRate={simulatedInterestRate}
                                    numberOfPays={numberOfPays}
                                    totalPriceHome={credit.totalPriceHome}
                                    monthlyClientIncome={credit.monthlyClientIncome}
                                />
                                <div className="mx-auto my-auto">
                                    <CreditHistoryForm
                                        creditHistory={creditHistory}
                                        setCreditHistory={setCreditHistory}
                                    />
                                    <EmpoymentHistoryForm
                                        employmentHistory={employmentHistory}
                                        setEmploymentHistory={setEmploymentHistory}
                                    />
                                </div>
                            </section>
                            <DebtToIncomeForm
                                debtToIncomeRatio={debtToIncomeRatio}
                                setDebtToIncomeRatio={setDebtToIncomeRatio}
                                creditAmount={credit.requestedAmount}
                                simulatedInterestRate={simulatedInterestRate}
                                numberOfPays={numberOfPays}
                                totalPriceHome={credit.totalPriceHome}
                                monthlyClientIncome={credit.monthlyClientIncome}
                                creditType={credit.creditType}
                            />
                            <section className="flex">
                                <FinanceMaxAmountFrom
                                    financeMaxAmount={financeMaxAmount}
                                    setFinanceMaxAmount={setFinanceMaxAmount}
                                    creditAmount={credit.requestedAmount}
                                    simulatedInterestRate={simulatedInterestRate}
                                    numberOfPays={numberOfPays}
                                    totalPriceHome={credit.totalPriceHome}
                                    creditType={credit.creditType}
                                />
                                <ApplicantAgeForm
                                    applicantAge={applicantAge}
                                    setApplicantAge={setApplicantAge}
                                />
                            </section>
                            <SavingCapacityForm
                                balance={balance}
                                creditAmount={credit.requestedAmount}
                                monthlyClientIncome={credit.monthlyClientIncome}
                                setSavingCapacity={setSavingCapacity}
                            />
                            <section className="flex">
                                <TotalCostForm
                                    creditAmount={credit.requestedAmount}
                                    simulatedInterestRate={simulatedInterestRate}
                                    numberOfPays={numberOfPays}
                                    totalPriceHome={credit.totalPriceHome}
                                    creditType={credit.creditType}
                                />
                                <EvaluationResultForm
                                    evaluationResult={evaluationResult}
                                    setEvaluationResult={setEvaluationResult}
                                />
                            </section>
                            {response ? (
                                <p className="text-center text-lg font-semibold">{submitMessage}</p>
                            ) : (
                                <p className="text-center text-lg font-semibold">Enviar evaluación</p>
                            )}
                            {/* Botón para enviar evaluación */}
                            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 w-1/2 mx-auto">
                                Enviar Evaluación
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Executive;