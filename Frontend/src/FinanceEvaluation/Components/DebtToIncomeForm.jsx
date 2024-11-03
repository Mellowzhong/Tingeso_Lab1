import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation } from '../../Simulation/Services/SimulationServices';
import DebtForm from "../../Components/DebtForm";

function DebtToIncomeForm({
    debtToIncomeRatio,
    setDebtToIncomeRatio,
    creditAmount,
    simulatedInterestRate,
    numberOfPays,
    totalPriceHome,
    monthlyClientIncome,
    creditType
}) {
    const [debts, setDebts] = useState(1);
    const [totalDebts, setTotalDebts] = useState(0);
    const [message, setMessage] = useState('');

    const add = () => setDebts(debts + 1);

    const discount = () => {
        if (debts > 1) {
            setDebts(debts - 1);
        }
    };

    const handleGradeChange = (debt) => {
        console.log('Nueva deuda:', debt);
        setTotalDebts((prevTotalGrade) => prevTotalGrade + parseFloat(debt));
    };

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
        } else {
            setMessage('Es posible el crédito');
        }
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-4">Deudas</h2>

                {/* Formulario dinámico para las deudas */}
                <div className="flex flex-wrap justify-center mb-4">
                    {Array.from({ length: debts }).map((_, index) => (
                        <div key={index} className="mx-2">
                            <DebtForm handleGradeChange={handleGradeChange} />
                        </div>
                    ))}
                </div>
                {/* Botones para agregar o quitar deudas */}
                <div className="flex justify-center mb-4">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-4"
                        type="button"
                        onClick={discount}
                    >
                        Descontar
                    </button>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        type="button"
                        onClick={add}
                    >
                        Agregar
                    </button>
                </div>
                {/* Mostrar total en deudas */}
                <h3 className="text-lg font-semibold mb-2">Total en deudas: {totalDebts}</h3>
                <p className={`mb-4 ${message.includes('No') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>

                {/* Botón para calcular */}
                <button
                    type="button"
                    onClick={handleCalculate}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Calcular
                </button>
            </section>

            {/* Relación deuda-ingresos */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Relación Deuda-Ingresos</h2>
                <label htmlFor="debtToIncomeRatio" className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        name="debtToIncomeRatio"
                        id="debtToIncomeRatio"
                        checked={debtToIncomeRatio}
                        onChange={() => setDebtToIncomeRatio(!debtToIncomeRatio)}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span>Confirmar relación deuda-ingresos</span>
                </label>
            </section>
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
    creditType: PropTypes.string.isRequired
};

export default DebtToIncomeForm;