import PropTypes from 'prop-types';
import { useState } from 'react';
import { getDebtToIncomeRatioCalculation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';

function FeeToIncomeRatio({ feeToIncomeRatio, setFeeToIncomeRatio }) {
    const [creditAmount, setCreditAmount] = useState(0);
    const [simulatedInterestRate, setSimulatedInterestRate] = useState(0);
    const [numberOfPays, setNumberOfPays] = useState(0);
    const [totalPriceHome, setTotalPriceHome] = useState(0);
    const [monthlyClientIncome, setMonthlyClientIncome] = useState(0);
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
        <div className='border-2 m-4'>
            <div className='grid '>
                <label htmlFor="Credit_Amount">
                    Cantidad solicitada:
                    <input
                        type="number"
                        id="incomeCertificate"
                        name="incomeCertificate"
                        onChange={(e) => setCreditAmount(e.target.value)}
                    />
                </label>
                <label htmlFor="simulatedInterestRate">
                    Tasa de interes anual:
                    <input
                        type="number"
                        id="simulatedInterestRate"
                        name="simulatedInterestRate"
                        step="0.000000001"
                        onChange={(e) => {
                            const value = e.target.value;
                            const newValue = (value / 12) / 100;
                            setSimulatedInterestRate(newValue);
                        }}
                    />
                </label>
                <label htmlFor="numberOfPays">
                    Numero de pagos:
                    <input
                        type="number"
                        id="numberOfPays"
                        name="numberOfPays"
                        onChange={(e) => setNumberOfPays(e.target.value)}
                    />
                </label>
                <label htmlFor="totalPriceHome">
                    Precio total de la casa
                    <input
                        type="number"
                        id="totalPriceHome"
                        name="totalPriceHome"
                        onChange={(e) => setTotalPriceHome(e.target.value)}
                    />
                </label>
                <label htmlFor="monthlyClientIncome">
                    Ingreso mensual del cliente
                    <input
                        type="number"
                        id="monthlyClientIncome"
                        name="monthlyClientIncome"
                        onChange={(e) => setMonthlyClientIncome(e.target.value)}
                    />
                </label>
                <button onClick={handleSimulationSubmit}>Simular</button>
            </div >
            <h2> Informacion</h2 >
            {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {quote} - {message}
            <label htmlFor="feeToIncomeRatio">
                <h2>Relacion cuota/ingreso.</h2>
                <input type="checkbox"
                    name="feeToIncomeRatio"
                    id="feeToIncomeRatio"
                    checked={feeToIncomeRatio}
                    onChange={() => setFeeToIncomeRatio(!feeToIncomeRatio)}
                />
            </label>
        </div>
    )
}

FeeToIncomeRatio.propTypes = {
    feeToIncomeRatio: PropTypes.bool.isRequired,
    setFeeToIncomeRatio: PropTypes.func.isRequired,
};

export default FeeToIncomeRatio;