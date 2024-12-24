import SimulationForm from "../Components/SimulationForm";
import { useState } from 'react';
import { getSimulation } from '../Services/SimulationServices';
function Simulation() {
    const [creditAmount, setCreditAmount] = useState(""); // Cambiado a string para manejar campos vacíos
    const [simulatedInterestRate, setSimulatedInterestRate] = useState("");
    const [numberOfPays, setNumberOfPays] = useState("");
    const [totalPriceHome, setTotalPriceHome] = useState("");
    const [creditType, setCreditType] = useState("Select");
    const [quote, setQuote] = useState("");
    const [messageSimulatedInterestRate, setMessageSimulatedInterestRate] = useState("");
    const [message, setMessage] = useState("");
    const [maxTotalPriceHome, setMaxTotalPriceHome] = useState("");

    // Validaciones
    const [isCreditAmountValid, setIsCreditAmountValid] = useState(false);
    const [isTotalPriceHomeValid, setIsTotalPriceHomeValid] = useState(false);
    const [isNumberOfPaysValid, setIsNumberOfPaysValid] = useState(false);
    const [isSimulatedInterestRateValid, setIsSimulatedInterestRateValid] = useState(false);

    // Verificar si todas las validaciones son verdaderas y si los campos están completos
    const isFormValid =
        isCreditAmountValid &&
        isTotalPriceHomeValid &&
        isNumberOfPaysValid &&
        isSimulatedInterestRateValid &&
        creditType !== "Select" && // Tipo de crédito válido
        creditAmount !== "" && // Campo no vacío
        totalPriceHome !== "" &&
        numberOfPays !== "" &&
        simulatedInterestRate !== "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            creditType,
        };

        try {
            const response = await getSimulation(simulationData);
            setQuote(response.quote);
            setMessage(response.message);
            setMaxTotalPriceHome(response.totalPriceHome);
        } catch {
            alert("Error al simular");
        }
    };

    const handleCreditTypeChange = (e) => {
        setCreditType(e.target.value);
    };

    return (
        <div className="flex items-start justify-center space-x-8 p-8">
            {/* Sección del formulario */}
            <section className="w-1/3">
                <h1 className="text-4xl mb-4 text-center">Simulación</h1>

                <form onSubmit={handleSubmit} className="border-2 p-4 grid gap-4 rounded-lg bg-white">
                    {/* Sección del tipo de crédito */}
                    <section className="grid gap-2">
                        <h2 className="text-xl">Tipo de crédito</h2>
                        <select
                            name="creditType"
                            id="creditType"
                            value={creditType}
                            onChange={handleCreditTypeChange}
                            className="border border-black p-2 rounded"
                        >
                            <option value="Select">Seleccione una opción</option>
                            <option value="firstHome">Primera casa</option>
                            <option value="secondHome">Segunda casa</option>
                            <option value="commercialProperty">Propiedad comercial</option>
                            <option value="remodeling">Remodelación</option>
                        </select>
                    </section>

                    {/* Reutilizamos el componente SimulationForm */}
                    <SimulationForm
                        creditType={creditType}
                        messageSimulatedInterestRate={messageSimulatedInterestRate}
                        setMessageSimulatedInterestRate={setMessageSimulatedInterestRate}
                        simulatedInterestRate={simulatedInterestRate}
                        setSimulatedInterestRate={setSimulatedInterestRate}
                        setCreditAmount={setCreditAmount}
                        setTotalPriceHome={setTotalPriceHome}
                        setNumberOfPays={setNumberOfPays}
                        isCreditAmountValid={isCreditAmountValid}
                        setIsCreditAmountValid={setIsCreditAmountValid}
                        isTotalPriceHomeValid={isTotalPriceHomeValid}
                        setIsTotalPriceHomeValid={setIsTotalPriceHomeValid}
                        isNumberOfPaysValid={isNumberOfPaysValid}
                        setIsNumberOfPaysValid={setIsNumberOfPaysValid}
                        setIsSimulatedInterestRateValid={setIsSimulatedInterestRateValid}
                    />

                    {/* Botón para simular */}
                    <button
                        type="submit"
                        disabled={!isFormValid} // Deshabilitar si alguna validación es falsa o algún campo está vacío
                        className={`w-full py-2 px-4 rounded-md ${isFormValid
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                            }`}
                    >
                        Simular
                    </button>
                </form>
            </section>

            {/* Sección de información */}
            {quote && message && maxTotalPriceHome && (
                <section className="w-1/3 text-center my-auto">
                    <h2 className="text-4xl mb-4">Información</h2>
                    <div className="border-2 p-4 rounded-lg bg-white">
                        <h3 className="grid my-4">
                            <strong className="text-4xl mb-4">
                                Cantidad máxima de préstamo por valor de la casa
                            </strong>
                        </h3>
                        <p className="text-4xl">{maxTotalPriceHome}</p>
                        <h3 className="grid my-4">
                            <strong className="text-4xl mb-4">Cuota mensual</strong>
                        </h3>
                        <p className="text-4xl">{quote}</p>
                        <h3 className="grid my-4">
                            <strong className="text-4xl mb-4">Resultado</strong>
                        </h3>
                        <p className="text-4xl">{message}</p>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Simulation;