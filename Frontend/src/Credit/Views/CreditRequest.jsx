import FirstHomeForm from "../Components/FirstHomeForm";
import SecondHomeForm from "../Components/SecondHomeForm";
import ComercialPropertyForm from "../Components/ComercialPropertyForm";
import RemoldingForm from "../Components/RemoldingForm";
import RequestUserForm from "../../User/Components/RequestUserForm";
import CreditDataForm from "../../Components/CreditDataForm";

import { postFinanceEvaluation } from "../../FinanceEvaluation/Services/FinanceEvaluationService";
import { useState } from "react";
import { postCredit } from "../Services/CreditService";
import { getUser } from "../../User/Services/UserServices";

function CreditRequest() {
    // User data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [userId, setUserId] = useState("");

    // Credit data
    const [creditId, setCreditId] = useState("");
    const [creditType, setCreditType] = useState("");
    const [requestedAmount, setRequestedAmount] = useState(0);
    const [totalPriceHome, setTotalPriceHome] = useState(0);
    const [monthlyClientIncome, setMonthlyClientIncome] = useState(0);

    const [showCreditDocuments, setShowCreditDocuments] = useState(false);
    const [errorUserNotFound, setErrorUserNotFound] = useState(false);
    const [checkClient, setCheckClient] = useState(false);

    const [creditRequestError, setCreditRequestError] = useState("");

    // Datos de evaluación financiera
    const financeEvaluationData = {
        feeToIncomeRatio: false,
        creditHistory: false,
        employmentHistory: false,
        debtToIncomeRatio: false,
        financeMaxAmount: false,
        applicantAge: false,
        savingCapacity: false,
        evaluationResult: false
    };

    const isFormValid = !errorUserNotFound &&
        creditType !== "" &&
        Number(requestedAmount) > 0 &&
        Number(totalPriceHome) > 0 &&
        Number(monthlyClientIncome) > 0;

    const userRequestData = { firstName, lastName, rut };

    const handleSelectChange = (e) => {
        setCreditType(e.target.value);
    };

    const handleCheckClient = async () => {
        try {
            // Limpiar el estado de error antes de la verificación
            setErrorUserNotFound(false);

            const user = await getUser(userRequestData);

            // Agregar un pequeño retraso para asegurar que el DOM se actualice
            setTimeout(() => {
                if (user && user.id) {
                    setCheckClient(true);
                    setUserId(user.id);
                } else {
                    setErrorUserNotFound(true);
                }
            }, 100);
        } catch {
            setErrorUserNotFound(true);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (creditType === "") {
            alert("Seleccione un tipo de crédito");
        } else {
            try {

                const creditRequestData = {
                    creditType,
                    status: "En revisión",
                    applicationDate: new Date(),
                    requestedAmount,
                    totalPriceHome,
                    monthlyClientIncome
                };
                const response = await postCredit(creditRequestData, userId);
                setShowCreditDocuments(true);
                setCreditId(response);
                await postFinanceEvaluation(response, financeEvaluationData);
            } catch {
                setCreditRequestError("Error al solicitar el crédito");
            }
        }
    };


    return (
        <div className='grid items-center justify-center'>
            <h1 className='text-4xl font-bold text-center'>Solicitud de Crédito</h1>
            <div className="flex ">
                <section className='w-full max-w-lg bg-white shadow-md rounded-lg p-6 m-8'>

                    {/* Formulario de solicitud de usuario */}
                    <div>
                        <RequestUserForm
                            setFirstName={setFirstName}
                            setLastName={setLastName}
                            setRut={setRut}
                        />

                        <div className="flex justify-center">
                            <button
                                id="checkClientButton"
                                data-testid="check-client"
                                type="button"
                                className='w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4'
                                onClick={handleCheckClient}
                            >
                                Comprobar cliente
                            </button>
                        </div>


                    </div>
                    {userId && (
                        <span
                            id="clientFoundMessage"
                            data-testid="client-found"
                            className="flex justify-center mt-2"
                        >
                            Cliente se encuentra registrado
                        </span>
                    )}

                    <span
                        id="clientNotFoundMessage"
                        data-testid="client-not-found"
                        className={`flex justify-center ${errorUserNotFound ? 'text-red-500' : 'hidden'}`}
                    >
                        Cliente no encontrado
                    </span>
                    {!checkClient ? "" :
                        <div>
                            <CreditDataForm setRequestedAmount={setRequestedAmount}
                                setTotalPriceHome={setTotalPriceHome}
                                setMonthlyClientIncome={setMonthlyClientIncome}
                            />
                            <span className="text-sm flex justify-center font-bold">
                                Ingrese el monto según se muestra, sin el punto decimal.
                            </span>
                        </div>
                    }
                    {/* Formulario para seleccionar el tipo de crédito */}
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        {!checkClient ? "" :
                            <label htmlFor="creditType" className='text-sm font-medium text-gray-700 text-center my-6'>
                                Selecciona el tipo de crédito:

                                <select
                                    name="creditType"
                                    id="creditType"
                                    value={creditType}
                                    onChange={handleSelectChange}
                                    className='border-2 mt-1 block w-full pl-3 pr-10 py-2 text-base border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="firstHome">Primera casa</option>
                                    <option value="secondHome">Segunda casa</option>
                                    <option value="commercialProperty">Propiedad comercial</option>
                                    <option value="remodeling">Remodelación</option>
                                </select>
                            </label>
                        }
                        {/* Botón para continuar */}
                        <div id="creditRequestError" className="flex justify-center">{creditRequestError}</div>
                        {creditId ? "" :
                            <button type="submit" className={`w-full py-2 px-4 rounded-md ${isFormValid
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "bg-gray-400 text-black cursor-not-allowed"
                                }`}
                                disabled={!isFormValid}
                            >
                                Siguiente
                            </button>
                        }

                    </form>
                </section>

                {/* Parte de los documentos */}
                {
                    showCreditDocuments && (
                        <section id="documentsBody">
                            <h2 id="documentsBodyTittle" className='text-xl font-semibold mb-4 text-center'>Documentos del Crédito</h2>
                            {creditId && (
                                <>
                                    {/* Mostrar formularios específicos basados en el tipo de crédito seleccionado */}
                                    {creditType === "firstHome" && <FirstHomeForm creditId={creditId} />}
                                    {creditType === "secondHome" && <SecondHomeForm creditId={creditId} />}
                                    {creditType === "commercialProperty" && <ComercialPropertyForm creditId={creditId} />}
                                    {creditType === "remodeling" && <RemoldingForm creditId={creditId} />}
                                </>
                            )}
                        </section>
                    )
                }
            </div>
        </div >
    );
}

export default CreditRequest;