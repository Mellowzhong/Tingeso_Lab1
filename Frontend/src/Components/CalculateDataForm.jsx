import PropTypes from 'prop-types';
import { comprobeSimulatedInterestRate } from '../Utils/SimulationUtils';

function CalculateDataForm({
    creditType,
    setCreditAmount,
    setSimulatedInterestRate,
    setNumberOfPays,
    setTotalPriceHome,
    setMonthlyClientIncome,
    setBalance
}) {
    return (
        <div className="grid gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Datos del Crédito</h3>

            {/* Cantidad solicitada */}
            <label htmlFor="creditAmount" className="block text-sm font-medium text-gray-700">
                Cantidad solicitada:
                <input
                    type="number"
                    id="creditAmount"
                    name="creditAmount"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => setCreditAmount(parseFloat(e.target.value))}
                />
            </label>

            {/* Tasa de interés anual */}
            <label htmlFor="simulatedInterestRate" className="block text-sm font-medium text-gray-700">
                Tasa de interés anual:
                <input
                    type="number"
                    id="simulatedInterestRate"
                    name="simulatedInterestRate"
                    step="0.000000001"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        comprobeSimulatedInterestRate(creditType, value);
                        const newValue = (value / 12) / 100;
                        setSimulatedInterestRate(newValue);
                    }}
                />
            </label>

            {/* Plazo */}
            <label htmlFor="numberOfPays" className="block text-sm font-medium text-gray-700">
                Plazo (en años):
                <input
                    type="number"
                    id="numberOfPays"
                    name="numberOfPays"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => {
                        const value = parseInt(e.target.value, 10);
                        const newValue = value * 12;
                        setNumberOfPays(newValue);
                    }}
                />
            </label>

            {/* Precio total de la casa */}
            <label htmlFor="totalPriceHome" className="block text-sm font-medium text-gray-700">
                Precio total de la casa:
                <input
                    type="number"
                    id="totalPriceHome"
                    name="totalPriceHome"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => setTotalPriceHome(parseFloat(e.target.value))}
                />
            </label>

            {/* Ingreso mensual del cliente */}
            <label htmlFor="monthlyClientIncome" className="block text-sm font-medium text-gray-700">
                Ingreso mensual del cliente:
                <input
                    type="number"
                    id="monthlyClientIncome"
                    name="monthlyClientIncome"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => setMonthlyClientIncome(parseFloat(e.target.value))}
                />
            </label>

            {/* Saldo */}
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                Saldo:
                <input
                    type="number"
                    id="balance"
                    name="balance"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => setBalance(parseInt(e.target.value))}
                />
            </label>
        </div>
    );
}

CalculateDataForm.propTypes = {
    creditType: PropTypes.string.isRequired,
    setCreditAmount: PropTypes.func.isRequired,
    setSimulatedInterestRate: PropTypes.func.isRequired,
    setNumberOfPays: PropTypes.func.isRequired,
    setTotalPriceHome: PropTypes.func.isRequired,
    setMonthlyClientIncome: PropTypes.func.isRequired,
    setBalance: PropTypes.func.isRequired,
};

export default CalculateDataForm;