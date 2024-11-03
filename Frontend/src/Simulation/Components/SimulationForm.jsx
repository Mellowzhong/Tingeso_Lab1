import PropTypes from 'prop-types';
import { comprobeSimulatedInterestRate } from '../../Utils/SimulationUtils';

function SimulationForm({ creditType, setCreditAmount, setSimulatedInterestRate, setNumberOfPays, setTotalPriceHome }) {
    return (
        <section className='border-2 p-4 w-full rounded-lg'>
            <form className='grid gap-4'>
                <label className='grid' htmlFor="Credit_Amount">
                    Cantidad solicitada:
                    <input
                        type="number"
                        id="Credit_Amount"
                        name="Credit_Amount"
                        onBlur={(e) => setCreditAmount(e.target.value)}
                        className='border p-2'
                    />
                </label>
                <label className='grid' htmlFor="simulatedInterestRate">
                    Tasa de interes anual:
                    <input
                        type="number"
                        id="simulatedInterestRate"
                        name="simulatedInterestRate"
                        step="0.000000001"
                        onBlur={(e) => {
                            const value = e.target.value;
                            comprobeSimulatedInterestRate(creditType, value);
                            const newValue = (value / 12) / 100;
                            setSimulatedInterestRate(newValue);
                        }}
                        className='border p-2'
                    />
                </label>
                <label className='grid' htmlFor="numberOfPays">
                    Plazo:
                    <input
                        type="number"
                        id="numberOfPays"
                        name="numberOfPays"
                        onBlur={(e) => {
                            const value = e.target.value;
                            const newValue = value * 12;
                            setNumberOfPays(newValue);
                        }}
                        className='border p-2'
                    />
                </label>
                <label className='grid' htmlFor="totalPriceHome">
                    Precio total de la casa:
                    <input
                        type="number"
                        id="totalPriceHome"
                        name="totalPriceHome"
                        onBlur={(e) => setTotalPriceHome(e.target.value)}
                        className='border p-2'
                    />
                </label>
            </form>
        </section>
    );
}

SimulationForm.propTypes = {
    creditType: PropTypes.string.isRequired,
    setCreditAmount: PropTypes.func.isRequired,
    setSimulatedInterestRate: PropTypes.func.isRequired,
    setNumberOfPays: PropTypes.func.isRequired,
    setTotalPriceHome: PropTypes.func.isRequired,
};

export default SimulationForm;