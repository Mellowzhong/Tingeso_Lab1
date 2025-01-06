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
    const [errorMessageYears, setErrorMessageYears] = useState('');

    // Función para validar si un valor es un número entero positivo
    const validateIntegerInput = (value) => /^\d+$/.test(value);

    // Manejo del cambio en el campo de años con validación
    const handleYearsChange = (e) => {
        const value = e.target.value;

        if (validateIntegerInput(value)) {
            setYears(parseInt(value, 10));
            setErrorMessageYears(''); // Limpiar mensaje de error si el valor es válido
        } else {
            setYears(0); // Restablecer el valor si no es válido
            setErrorMessageYears('Ingrese un número entero válido');
        }
    };

    // Función para validar la capacidad de ahorro
    const validateSavingCapacity = () => {
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
            <h2 className="text-4xl font-semibold text-center">Capacidad de Ahorro</h2>
            {/* Saldo mínimo requerido */}
            <section className="mb-4 text-center">
                <h2 className="text-lg font-semibold mb-2">Saldo Mínimo Requerido</h2>
                <p className={isMinAmountValid ? 'text-green-600' : 'text-red-600'}>
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

                {/* Formulario dinámico para calcular capacidad de ahorro */}
                <div className="flex flex-wrap justify-center mt-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="m-2">
                            <CalculateSavingCapacityForm
                                setSavingHistory={setSavingHistory}
                                handleIncomeChange={handleIncomeChange}
                                balance={balance}
                            />
                        </div>
                    ))}
                </div>
            </section>
            <div className='text-center m-4'>
                <div className='text-center border-2 p-4 rounded-lg'>
                    <div className='border-2 w-1/4 mx-auto rounded-lg bg-white p-4 my-2'>
                        <h2 className="text-lg font-semibold mb-2">Historial de Ahorro</h2>
                        <p className={savingHistory ? 'text-green-600' : 'text-red-700'}>
                            {savingHistory ? 'Válido' : 'No válido'}
                        </p>
                    </div>
                    <div className='border-2 w-1/4 mx-auto rounded-lg bg-white p-4 my-2'>
                        <h3 className="font-semibold">Depósitos Periódicos: {totalIncomes}</h3>
                        <p className={periodicDeposits ? 'text-green-600' : 'text-red-700'}>
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
                </div>
            </div>

            {/* Relación saldo/años */}
            <section className="grid border-2 border-gray-300 rounded-lg p-4 mb-4 text-center">
                <h2 className="text-lg font-semibold mb-2">Relación Saldo/Años</h2>
                <p className={savingCapacityBalanceYears ? 'text-green-600' : 'text-red-700'}>
                    {savingCapacityBalanceYears ? 'Válido' : 'No válido'}
                </p>
                <label htmlFor="years" className="block mb-2">
                    <h3>Años:</h3>
                    <input
                        type="number"
                        name="years"
                        id="years"
                        placeholder="2"
                        onChange={handleYearsChange}
                        className={`border border-gray-300 rounded-md p-2 w-1/4 mt-1 ${errorMessageYears ? 'border-red-500' : ''
                            }`}
                    />
                </label>
                {errorMessageYears && (
                    <span id='yearsErrorMessage' className="text-red-500 text-sm">{errorMessageYears}</span>
                )}
                <button
                    type="button"
                    onClick={handleValidateBalanceYears}
                    className={`bg-indigo-600 text-white mx-auto py-2 px-4 w-1/4 rounded-md hover:bg-indigo-700 ${errorMessageYears ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={!!errorMessageYears} // Deshabilitar si hay un error
                >
                    Validar Relación Saldo/Años
                </button>
            </section>


            {/* Retiros recientes */}
            <section className="border-2 border-gray-300 rounded-lg p-4 mb-4 text-center">
                <h2 className="text-lg font-semibold mb-2">Retiros Recientes</h2>
                <p className={savingCapacityRecentWithdrawals ? 'text-green-600' : 'text-red-700'}>
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
            <div className='text-center'>
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