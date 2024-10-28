import SimulationForm from "../Components/SimulationForm";
import { useState } from 'react';
import { getSimulation } from '../Services/SimulationServices';

function Simulation() {
    const [creditAmount, setCreditAmount] = useState(0);
    const [simulatedInterestRate, setSimulatedInterestRate] = useState(0);
    const [numberOfPays, setNumberOfPays] = useState(0);
    const [totalPriceHome, setTotalPriceHome] = useState(0);
    const [creditType, setCreditType] = useState('');
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

    // Manejador de cambio para el select
    const handleCreditTypeChange = (e) => {
        setCreditType(e.target.value);
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
                <section>
                    <h2>Tipo de credito</h2>
                    <select name="creditType" id="creditType" value={creditType} onChange={handleCreditTypeChange}>
                        <option value=""></option>
                        <option value="firstHome">Primera casa</option>
                        <option value="secondHome">Segunda casa</option>
                        <option value="commercialProperty">Propiedad comercial</option>
                        <option value="remodeling">Remodelacion</option>
                    </select>
                </section>
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