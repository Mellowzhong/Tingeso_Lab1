import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation } from '../../Simulation/Services/SimulationServices';

import SimulationForm from '../../Simulation/Components/SimulationForm';

function FinanceMaxAmountFrom({ financeMaxAmount, setFinanceMaxAmount }) {
    const [creditAmount, setCreditAmount] = useState(0);
    const [simulatedInterestRate, setSimulatedInterestRate] = useState(0);
    const [numberOfPays, setNumberOfPays] = useState(0);
    const [totalPriceHome, setTotalPriceHome] = useState(0);
    const [quote, setQuote] = useState(0);
    const [message, setMessage] = useState("message");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            creditType: 'firstHome'
        }
        const response = await getSimulation(simulationData);
        setQuote(response.quote);
        setMessage(response.message);
    }

    return (
        <div className='grid border-2 m-4'>
            <form onSubmit={handleSubmit}>
                <h1>Simulation Form</h1>
                <SimulationForm
                    setCreditAmount={setCreditAmount}
                    setSimulatedInterestRate={setSimulatedInterestRate}
                    setNumberOfPays={setNumberOfPays}
                    setTotalPriceHome={setTotalPriceHome}
                />
            </form>
            <h2>
                Informacion
            </h2>
            {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {quote} - {message}
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
};

export default FinanceMaxAmountFrom;