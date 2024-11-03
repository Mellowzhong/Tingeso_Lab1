import PropTypes from 'prop-types';
import { useState } from 'react';
import CalculateSavingCapacityForm from '../../Components/CalculateSavingCapacityForm';
import CalculateRecentWithdrawalsForm from '../../Components/CalculateRecentWithdrawalsForm';

function SavingCapacityForm({ balance, monthlyClientIncome, creditAmount, setSavingCapacity }) {
    const [isMinAmountValid, setIsMinAmountValid] = useState(false);
    const [savingHistory, setSavingHistory] = useState(false);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [periodicDeposits, setPeriodicDeposits] = useState(false);
    const [years, setYears] = useState(0);
    const [savingCapacityBalanceYears, setSavingCapacityBalanceYears] = useState(false);
    const [savingCapacityRecentWithdrawals, setSavingCapacityRecentWithdrawals] = useState(false);

    const [evaluationResult, setEvaluationResult] = useState('No válida');

    // Función para validar la capacidad de ahorro
    const validateSavingCapacity = () => {
        console.log('Validando capacidad de ahorro');
        const rules = [
            isMinAmountValid,
            savingHistory,
            periodicDeposits,
            savingCapacityBalanceYears,
            savingCapacityRecentWithdrawals
        ];

        const rulesCount = rules.filter(rule => rule).length;

        if (rulesCount === 5) {
            setSavingCapacity(true);
            setEvaluationResult('Sólida');
        } else if (rulesCount >= 3) {
            setSavingCapacity(true);
            setEvaluationResult('Moderada (requiere revisión adicional)');
        } else {
            setSavingCapacity(false);
            setEvaluationResult('No válida');
        }
    };

    // Función para manejar la validación del saldo mínimo
    const handleMinAmount = () => {
        const creditAmountAux = creditAmount * 0.1; // Calcula el 10% del monto de crédito
        if (balance < creditAmountAux) {
            setIsMinAmountValid(false);
        } else {
            setIsMinAmountValid(true);
        }
    };

    // Función para validar relación saldo / años de antigüedad
    const handleValidateBalanceYears = () => {
        const creditAmountThreshold = years < 2 ? creditAmount * 0.2 : creditAmount * 0.1;
        if (balance >= creditAmountThreshold) {
            setSavingCapacityBalanceYears(true);
        } else {
            setSavingCapacityBalanceYears(false);
        }
    };

    // Función para validar depósitos periódicos
    const handleValidatePeriodicDeposits = () => {
        const newMonthlyClientIncome = monthlyClientIncome * 0.05;
        if (totalIncomes >= newMonthlyClientIncome) {
            setPeriodicDeposits(true);
        } else {
            setPeriodicDeposits(false);
        }
    };

    // Función para manejar el cambio de ingreso
    const handleIncomeChange = (income) => {
        setTotalIncomes(prevTotalIncome => prevTotalIncome + income);
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            {/* Saldo mínimo requerido */}
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Saldo Mínimo Requerido</h2>
                <p className={isMinAmountValid ? 'text-green-500' : 'text-red-500'}>
                    {isMinAmountValid ? 'Válido' : 'No válido'}
                </p>
                <button
                    type="button"
                    onClick={handleMinAmount}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Comprobar Saldo
                </button>
            </section>

            {/* Historial de ahorro */}
            <section className="border-2 border-gray-300 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Historial de Ahorro</h2>
                <p className={savingHistory ? 'text-green-500' : 'text-red-500'}>
                    {savingHistory ? 'Válido' : 'No válido'}
                </p>

                {/* Depósitos periódicos */}
                <div className="mt-4">
                    <h3 className="font-semibold">Depósitos Periódicos: {totalIncomes}</h3>
                    <p className={periodicDeposits ? 'text-green-500' : 'text-red-500'}>
                        {periodicDeposits ? 'Válido' : 'No válido'}
                    </p>
                    <button
                        type="button"
                        onClick={handleValidatePeriodicDeposits}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-2"
                    >
                        Validar Depósitos Periódicos
                    </button>
                </div>

                {/* Formulario dinámico para calcular capacidad de ahorro */}
                <div className="flex flex-wrap justify-center mt-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="mx-1">
                            <CalculateSavingCapacityForm
                                setSavingHistory={setSavingHistory}
                                handleIncomeChange={handleIncomeChange}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Relación saldo/años */}
            <section className="border-2 border-gray-300 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Relación Saldo/Años</h2>
                <p className={savingCapacityBalanceYears ? 'text-green-500' : 'text-red-500'}>
                    {savingCapacityBalanceYears ? 'Válido' : 'No válido'}
                </p>
                <label htmlFor="years" className="block mb-2">
                    Años:
                    <input
                        type="number"
                        name="years"
                        id="years"
                        onChange={(e) => setYears(parseInt(e.target.value))}
                        className="border border-gray-300 rounded-md p-2 w-full mt-1"
                    />
                </label>
                <button
                    type="button"
                    onClick={handleValidateBalanceYears}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Validar Relación Saldo/Años
                </button>
            </section>

            {/* Retiros recientes */}
            <section className="border-2 border-gray-300 rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Retiros Recientes</h2>
                <p className={savingCapacityRecentWithdrawals ? 'text-green-500' : 'text-red-500'}>
                    {savingCapacityRecentWithdrawals ? 'Válido' : 'No válido'}
                </p>
                <div className="flex flex-wrap justify-center mt-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="mx-1">
                            <CalculateRecentWithdrawalsForm
                                setSavingCapacityRecentWithdrawals={setSavingCapacityRecentWithdrawals}
                                balance={balance}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Resultado de evaluación */}
            <h2 className="text-lg font-semibold mb-2">Resultado de Evaluación</h2>
            <p>{evaluationResult}</p>

            {/* Botón para validar capacidad de ahorro */}
            <button
                type="button"
                onClick={validateSavingCapacity}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mt-4"
            >
                Validar Capacidad de Ahorro
            </button>
        </div>
    );
}

SavingCapacityForm.propTypes = {
    balance: PropTypes.number.isRequired,
    monthlyClientIncome: PropTypes.number.isRequired,
    creditAmount: PropTypes.number.isRequired,
    setSavingCapacity: PropTypes.func.isRequired,
};

export default SavingCapacityForm;