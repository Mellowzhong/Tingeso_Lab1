import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation } from '../../Simulation/Services/SimulationServices';

function FinanceMaxAmountFrom({
    financeMaxAmount,
    setFinanceMaxAmount,
    creditAmount,
    simulatedInterestRate,
    numberOfPays,
    totalPriceHome,
    creditType
}) {
    const [quote, setQuote] = useState(0);
    const [message, setMessage] = useState("message");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            creditType
        };
        try {
            const response = await getSimulation(simulationData);
            setQuote(response.quote);
            setMessage(response.message);
        }
        catch {
            alert("Error al simular");
        }

    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            {/* Información del crédito */}
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Crédito</h2>
                <p>{`Monto del crédito: ${creditAmount}`}</p>
                <p>{`Tasa de interés simulada: ${simulatedInterestRate}`}</p>
                <p>{`Número de pagos: ${numberOfPays}`}</p>
                <p>{`Precio total de la vivienda: ${totalPriceHome}`}</p>
            </section>

            {/* Botón para simular */}
            <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mb-4"
            >
                Simular
            </button>

            {/* Resultados de la simulación */}
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Respuesta</h2>
                <p>{`Cuota: ${quote}`}</p>
                <p className={message.includes('No') ? 'text-red-500' : 'text-green-500'}>{message}</p>
            </section>

            {/* Monto máximo */}
            <label htmlFor="financeMaxAmount" className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold">Monto Máximo</h2>
                <input
                    type="checkbox"
                    name="financeMaxAmount"
                    id="financeMaxAmount"
                    checked={financeMaxAmount}
                    onChange={() => setFinanceMaxAmount(!financeMaxAmount)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
            </label>
        </div>
    );
}

FinanceMaxAmountFrom.propTypes = {
    financeMaxAmount: PropTypes.bool.isRequired,
    setFinanceMaxAmount: PropTypes.func.isRequired,
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    creditType: PropTypes.string.isRequired
};

export default FinanceMaxAmountFrom;