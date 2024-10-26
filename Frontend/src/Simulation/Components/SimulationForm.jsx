import { useState } from 'react';
import { getSimulation } from '../Services/SimulationServices';

function SimulationForm() {
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
                    Tasa de interes anual:
                    <input
                        type="number"
                        id="simulatedInterestRate"
                        name="simulatedInterestRate"
                        step="0.000000001"
                        onChange={(e) => {
                            const value = e.target.value;
                            const newValue = (value / 12) / 100
                            setSimulatedInterestRate(newValue)
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
                <button>Simular</button>
            </form>
            <h2>
                Informacion
            </h2>
            {creditAmount} - {simulatedInterestRate} - {numberOfPays} - {quote} - {message}
        </div>
    );
}

export default SimulationForm;