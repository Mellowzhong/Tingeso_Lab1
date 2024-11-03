import PropTypes from 'prop-types';
import { useState } from 'react';
import { getDebtToIncomeRatioCalculation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';

function FeeToIncomeRatio({
    feeToIncomeRatio,
    setFeeToIncomeRatio,
    creditAmount,
    simulatedInterestRate,
    numberOfPays,
    totalPriceHome,
    monthlyClientIncome
}) {
    const [quote, setQuote] = useState(0);
    const [message, setMessage] = useState("message");

    const handleSimulationSubmit = async (e) => {
        e.preventDefault();
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            monthlyClientIncome
        };
        const response = await getDebtToIncomeRatioCalculation(simulationData);
        setQuote(response.quote);
        setMessage(response.message);
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
                <p>{`Ingreso mensual del cliente: ${monthlyClientIncome}`}</p>
            </section>

            {/* Botón para simular */}
            <button
                onClick={handleSimulationSubmit}
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

            {/* Relación cuota/ingreso */}
            <label htmlFor="feeToIncomeRatio" className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold">Relación Cuota/Ingreso</h2>
                <input
                    type="checkbox"
                    name="feeToIncomeRatio"
                    id="feeToIncomeRatio"
                    checked={feeToIncomeRatio}
                    onChange={() => setFeeToIncomeRatio(!feeToIncomeRatio)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
            </label>
        </div>
    );
}

FeeToIncomeRatio.propTypes = {
    feeToIncomeRatio: PropTypes.bool.isRequired,
    setFeeToIncomeRatio: PropTypes.func.isRequired,
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    monthlyClientIncome: PropTypes.number.isRequired,
};

export default FeeToIncomeRatio;