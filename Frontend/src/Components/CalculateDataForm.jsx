import PropTYpes from 'prop-types';
import { comprobeSimulatedInterestRate } from '../Utils/SimulationUtils';

function CalculateDataForm({ creditType, setCreditAmount, setSimulatedInterestRate, setNumberOfPays, setTotalPriceHome, setMonthlyClientIncome, setBalance }) {

    return (
        <div className='grid '>
            <label htmlFor="creditAmount">
                Cantidad solicitada:
                <input
                    type="number"
                    id="incomeCertificate"
                    name="incomeCertificate"
                    onBlur={(e) => setCreditAmount(parseFloat(e.target.value))}
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
                        const value = parseFloat(e.target.value);
                        comprobeSimulatedInterestRate(creditType, value);
                        const newValue = (value / 12) / 100;
                        setSimulatedInterestRate(newValue);
                    }}
                />
            </label>
            <label htmlFor="numberOfPays">
                Plazo
                <input
                    type="number"
                    id="numberOfPays"
                    name="numberOfPays"
                    onBlur={(e) => {
                        const value = parseInt(e.target.value, 10);
                        const newValue = value * 12;
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
                    onBlur={(e) => setTotalPriceHome(parseFloat(e.target.value))}
                />
            </label>
            <label htmlFor="monthlyClientIncome">
                Ingreso mensual del cliente
                <input
                    type="number"
                    id="monthlyClientIncome"
                    name="monthlyClientIncome"
                    onBlur={(e) => setMonthlyClientIncome(parseFloat(e.target.value))}
                />
            </label>
            <label htmlFor="monthlyClientIncome">
                Saldo
                <input
                    type="number"
                    id="balance"
                    name="balance"
                    onBlur={(e) => setBalance(parseInt(e.target.value))}
                />
            </label>
        </div >
    );
}

CalculateDataForm.propTypes = {
    creditType: PropTYpes.string.isRequired,
    setCreditAmount: PropTYpes.func.isRequired,
    setSimulatedInterestRate: PropTYpes.func.isRequired,
    setNumberOfPays: PropTYpes.func.isRequired,
    setTotalPriceHome: PropTYpes.func.isRequired,
    setMonthlyClientIncome: PropTYpes.func.isRequired,
    setBalance: PropTYpes.func.isRequired,
};

export default CalculateDataForm;