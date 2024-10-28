import PropTypes from 'prop-types';

function SimulationForm({ setCreditAmount, setSimulatedInterestRate, setNumberOfPays, setTotalPriceHome }) {

    return (
        <div className='grid'>
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
                Plazo:
                <input
                    type="number"
                    id="numberOfPays"
                    name="numberOfPays"
                    onChange={(e) => {
                        const value = e.target.value;
                        const newValue = value * 12
                        setNumberOfPays(newValue)
                    }}
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
        </div>
    );
}

SimulationForm.propTypes = {
    setCreditAmount: PropTypes.func.isRequired,
    setSimulatedInterestRate: PropTypes.func.isRequired,
    setNumberOfPays: PropTypes.func.isRequired,
    setTotalPriceHome: PropTypes.func.isRequired
}

export default SimulationForm;