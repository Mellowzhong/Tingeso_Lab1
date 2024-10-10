import { useState } from 'react';
import { getSimulation } from '../Services/SimulationServices';

function SimulationForm() {
    const [creditAmount, setCreditAmount] = useState(0);
    const [simulatedInterestRate, setSimulatedInterestRate] = useState(0);
    const [numberOfPays, setNumberOfPays] = useState(0);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays
        }
        const response = await getSimulation(simulationData);
        setResponse(response);
    }

    return (
        <div>
            <h1>Simulation Form</h1>
            <form className='grid' onSubmit={handleSubmit}>
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
                    Tasa de interes:
                    <input
                        type="number"
                        id="simulatedInterestRate"
                        name="simulatedInterestRate"
                        step="0.000000001"
                        onChange={(e) => setSimulatedInterestRate(e.target.value)}
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
                <button>Simular</button>
            </form>
            <h2>
                Informacion
            </h2>
            {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {response}
        </div>
    );
}

export default SimulationForm;