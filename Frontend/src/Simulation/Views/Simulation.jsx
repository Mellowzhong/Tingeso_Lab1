import SimulationForm from "../Components/SimulationForm";
import { useState } from 'react';
import { getSimulation } from '../Services/SimulationServices';

function Simulation() {
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
        <>
            <form onSubmit={handleSubmit}>
                <h1>Simulation Form</h1>
                <SimulationForm
                    setCreditAmount={setCreditAmount}
                    setSimulatedInterestRate={setSimulatedInterestRate}
                    setNumberOfPays={setNumberOfPays}
                    setTotalPriceHome={setTotalPriceHome}
                />
                <button type='submit'>Simular</button>
            </form>
            <h2>
                Informacion
            </h2>
            {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {quote} - {message}
        </>
    );
}

export default Simulation;