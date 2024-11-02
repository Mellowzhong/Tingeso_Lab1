import PropTypes from 'prop-types';
import { useState } from 'react';
import CalculateSavingCapacityForm from '../../Components/CalculateSavingCapacityForm';
import CalculateRecentWithdrawalsForm from '../../Components/CalculateRecentWithdrawalsForm';

function SavingCapacityForm({ balance, monthlyClientIncome, creditAmount, setSavingCapacity }) {
    // Por defecto, todas las validaciones comienzan como "No válidas"
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
        <div className='grid border-2 m-4'>
            <h2>Saldo mínimo requerido</h2>
            {isMinAmountValid ? <p>Válido</p> : <p>No válido</p>}
            <button type='button' onClick={handleMinAmount}>Comprobar Saldo</button>

            <section className='border-4 m-2'>
                <div className='border-2 m-2'>
                    <h2>Historial de ahorro</h2>
                    {savingHistory ? <p>Válido</p> : <p>No válido</p>}
                </div>

                <div className='border-2 m-2'>
                    <h2>Depositos periodicos: {totalIncomes}</h2>
                    {periodicDeposits ? <p>Válido</p> : <p>No válido</p>}
                    <button type='button' onClick={handleValidatePeriodicDeposits}>Validar Depósitos Periódicos</button>
                </div>

                {/* Renderizar 12 veces el componente CalculateSavingCapacityForm */}
                <div className='flex flex-wrap justify-center'>
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

            {/* Balance/Years form */}
            <div className='grid border-2 m-2'>
                <h2>Relacion saldo/Años de antiguedad</h2>
                {savingCapacityBalanceYears ? <p>Válido</p> : <p>No válido</p>}
                <label>
                    <h2>Años</h2>
                    <input
                        type="number"
                        name="years"
                        id="years"
                        onChange={(e) => setYears(parseInt(e.target.value))}
                    />
                </label>
                <button type='button' onClick={handleValidateBalanceYears}>Validar Relación Saldo/Años</button>
            </div>

            <div>
                <h2>Retiros recientes</h2>
                {savingCapacityRecentWithdrawals ? <p>Válido</p> : <p>No válido</p>}
                <div className='flex flex-wrap justify-center'>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="mx-1">
                            <CalculateRecentWithdrawalsForm
                                setSavingCapacityRecentWithdrawals={setSavingCapacityRecentWithdrawals}
                                balance={balance}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <h2>Resultado de evaluación</h2>
            <p>{evaluationResult}</p>
            <button type='button' onClick={validateSavingCapacity}>Validar</button>
        </div >
    );
}

SavingCapacityForm.propTypes = {
    balance: PropTypes.number.isRequired,
    monthlyClientIncome: PropTypes.number.isRequired,
    creditAmount: PropTypes.number.isRequired,
    setSavingCapacity: PropTypes.func.isRequired,
};

export default SavingCapacityForm;