import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation } from '../../Simulation/Services/SimulationServices';

function FinanceMaxAmountFrom({ financeMaxAmount, setFinanceMaxAmount,
    creditAmount, simulatedInterestRate, numberOfPays, totalPriceHome, creditType
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
        }
        const response = await getSimulation(simulationData);
        setQuote(response.quote);
        setMessage(response.message);
    }

    return (
        <div className='grid border-2 m-4'>
            <span>
                <h2>Informacion</h2>
                {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {totalPriceHome}
            </span>
            <button onClick={handleSubmit}>Simular</button>
            <span>
                <h2>Respuesta</h2>
                {quote} - {message}
            </span>
            <label htmlFor="financeMaxAmount">
                <h2>Monto máximo</h2>
                <input type="checkbox"
                    name="financeMaxAmount"
                    id="financeMaxAmount"
                    checked={financeMaxAmount}
                    onChange={() => setFinanceMaxAmount(!financeMaxAmount)}
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