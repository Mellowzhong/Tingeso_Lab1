import PropTypes from 'prop-types';
import { comprobeSimulatedInterestRate } from '../../Utils/SimulationUtils'

function SimulationForm({ creditType, setCreditAmount, setSimulatedInterestRate, setNumberOfPays, setTotalPriceHome }) {

    return (
        <div className='grid'>
            <label htmlFor="Credit_Amount">
                Cantidad solicitada:
                <input
                    type="number"
                    id="incomeCertificate"
                    name="incomeCertificate"
                    onBlur={(e) => setCreditAmount(e.target.value)}
                />
            </label>
            <label htmlFor="simulatedInterestRate">
                Tasa de interes anual:
                <input
                    type="number"
                    id="simulatedInterestRate"
                    name="simulatedInterestRate"
                    step="0.000000001"
                    onBlur={(e) => {
                        const value = e.target.value;
                        comprobeSimulatedInterestRate(creditType, value);
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
                    onBlur={(e) => {
                        const value = e.target.value
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
                    onBlur={(e) => setTotalPriceHome(e.target.value)}
                />
            </label>
        </div>
    );
}

SimulationForm.propTypes = {
    creditType: PropTypes.string.isRequired,
    setCreditAmount: PropTypes.func.isRequired,
    setSimulatedInterestRate: PropTypes.func.isRequired,
    setNumberOfPays: PropTypes.func.isRequired,
    setTotalPriceHome: PropTypes.func.isRequired
}

export default SimulationForm;