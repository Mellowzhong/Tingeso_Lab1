import PropTypes from 'prop-types';
import { useState } from 'react';
import { getDebtToIncomeRatioCalculation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';

function FeeToIncomeRatio({ feeToIncomeRatio, setFeeToIncomeRatio,
    creditAmount, simulatedInterestRate, numberOfPays, totalPriceHome, monthlyClientIncome }) {
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
        <div className='grid border-2 m-4'>
            <span>
                <h2> Informacion</h2 >
                {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {totalPriceHome} - {monthlyClientIncome}
            </span>
            <button onClick={handleSimulationSubmit}>Simular</button>
            <span>
                <h2>Respuesta</h2>
                {quote} - {message}
            </span>
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
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    monthlyClientIncome: PropTypes.number.isRequired,
};

export default FeeToIncomeRatio;