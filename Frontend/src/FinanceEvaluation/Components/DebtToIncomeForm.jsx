import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation } from '../../Simulation/Services/SimulationServices';

import DebtForm from "../../Components/DebtForm";

function DebtToIncomeForm({ debtToIncomeRatio, setDebtToIncomeRatio, creditAmount, simulatedInterestRate, numberOfPays, totalPriceHome, monthlyClientIncome, creditType }) {
    const [debts, setDebts] = useState(1);
    const [totalDebts, setTotalDebts] = useState(0);
    const [message, setMessage] = useState('');

    const add = () => setDebts(debts + 1)

    const discount = () => {
        if (debts > 1) {
            setDebts(debts - 1)
        }
    }

    const handleGradeChange = (debt) => {
        console.log('Nueva deuda:', debt);
        setTotalDebts(prevTotalGrade => prevTotalGrade + parseFloat(debt));
    }

    const handleCalculate = async () => {
        const fivePercentMonthlyClientIncome = monthlyClientIncome * 0.5;
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            monthlyClientIncome,
            creditType

        };
        const response = await getSimulation(simulationData);
        setTotalDebts(response.quote + totalDebts);
        console.log('Ingreso mensual:', fivePercentMonthlyClientIncome);
        console.log('Total deudas:', totalDebts);
        console.log('Respuesta:', response.quote);
        if (totalDebts > fivePercentMonthlyClientIncome) {
            setMessage('No es posible el crédito');
        }
        else {
            setMessage('Es posible el crédito');
        }
    }

    return (
        <div className='grid border-2 m-4'>
            <label htmlFor="debtToIncomeRatio">
                <section>
                    <h2>Deudas</h2>
                    <div className='flex justify-center'>
                        <button className='ml-4' type='button' onClick={() => discount()}>descontar</button>
                        <button className='ml-4' type='button' onClick={() => add()}>agregar</button>
                    </div>

                    <div className='flex flex-wrap'>
                        {
                            Array.from({ length: debts }).map(
                                (_, index) => (
                                    <div key={index} className="mx-1">
                                        <DebtForm handleGradeChange={handleGradeChange} />
                                    </div>
                                )
                            )
                        }
                    </div>
                    <h2>
                        Total en deudas: {totalDebts}
                        <p>{message}</p>
                    </h2>
                    <button type='button' onClick={handleCalculate}>Calcular</button>
                </section>
                <h2>Relación deuda-ingresos</h2>
                <input
                    type="checkbox"
                    name="debtToIncomeRatio"
                    id="debtToIncomeRatio"
                    checked={debtToIncomeRatio}
                    onChange={() => setDebtToIncomeRatio(!debtToIncomeRatio)}
                />
            </label>
        </div>
    );
}

DebtToIncomeForm.propTypes = {
    debtToIncomeRatio: PropTypes.bool.isRequired,
    setDebtToIncomeRatio: PropTypes.func.isRequired,
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    monthlyClientIncome: PropTypes.number.isRequired,
};

export default DebtToIncomeForm;