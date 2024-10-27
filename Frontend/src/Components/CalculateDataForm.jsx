import PropTYpes from 'prop-types';

function CalculateDataForm({ setCreditAmount, setSimulatedInterestRate, setNumberOfPays, setTotalPriceHome, setMonthlyClientIncome }) {

    return (
        <div className='grid '>
            <label htmlFor="creditAmount">
                Cantidad solicitada:
                <input
                    type="number"
                    id="incomeCertificate"
                    name="incomeCertificate"
                    onChange={(e) => setCreditAmount(parseFloat(e.target.value))}
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
                        const value = parseFloat(e.target.value);
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
                    onChange={(e) => {
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
                    onChange={(e) => setTotalPriceHome(parseFloat(e.target.value))}
                />
            </label>
            <label htmlFor="monthlyClientIncome">
                Ingreso mensual del cliente
                <input
                    type="number"
                    id="monthlyClientIncome"
                    name="monthlyClientIncome"
                    onChange={(e) => setMonthlyClientIncome(parseFloat(e.target.value))}
                />
            </label>
        </div >
    );
}

CalculateDataForm.propTypes = {
    setCreditAmount: PropTYpes.func.isRequired,
    setSimulatedInterestRate: PropTYpes.func.isRequired,
    setNumberOfPays: PropTYpes.func.isRequired,
    setTotalPriceHome: PropTYpes.func.isRequired,
    setMonthlyClientIncome: PropTYpes.func.isRequired,
};

export default CalculateDataForm;