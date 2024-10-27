import PropTypes from 'prop-types';

import { getSimulation } from '../../Simulation/Services/SimulationServices';

import { useState } from 'react';

function TotalCostForm({ creditAmount, simulatedInterestRate, numberOfPays, totalPriceHome, creditType }) {
    const [totalCost, setTotalCost] = useState(0);

    const handleSimulationSubmit = async (e) => {
        e.preventDefault();
        const creditLifeInsurance = Math.round(creditAmount * 0.0003);
        const administrationFee = creditAmount * 0.01;

        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            creditType
        }
        const response = await getSimulation(simulationData);

        const aux = response.quote + creditLifeInsurance + 20000

        setTotalCost(aux * numberOfPays + administrationFee);
    }

    return (
        <div className='grid border-2 m-4'>
            <h1>Costo total</h1>
            <span>
                <h2>Informacion</h2>
                {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {totalPriceHome}
            </span>
            <button onClick={handleSimulationSubmit}>Simular</button>
            <span>
                <h2>Respuesta</h2>
                {totalCost}
            </span>
        </div>
    );
}

TotalCostForm.propTypes = {
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    creditType: PropTypes.string.isRequired,
};

export default TotalCostForm;