import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation } from '../../Simulation/Services/SimulationServices';

function TotalCostForm({ creditAmount, simulatedInterestRate, numberOfPays, totalPriceHome, creditType }) {
    const [totalCost, setTotalCost] = useState(0);
    const [response, setResponse] = useState(false);

    const handleSimulationSubmit = async (e) => {
        e.preventDefault();
        const creditLifeInsurance = Math.round(creditAmount * 0.0003);
        const administrationFee = creditAmount * 0.01;
        setResponse(true);
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            creditType
        };

        // Simulación
        try {
            const response = await getSimulation(simulationData);
            const aux = response.quote + creditLifeInsurance + 20000;

            // Cálculo del costo total
            setTotalCost(aux * numberOfPays + administrationFee);
        }
        catch {
            alert("Error al simular");
        }
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-1/2 text-center mr-2">
            {/* Información del crédito */}
            <h2 className="text-4xl font-semibold mb-2 text-center">Costo Total</h2>

            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Crédito</h2>
                <p>{`Monto del crédito: ${creditAmount}`}</p>
                <p>{`Tasa de interés simulada: ${simulatedInterestRate}`}</p>
                <p>{`Número de pagos: ${numberOfPays}`}</p>
                <p>{`Precio total de la vivienda: ${totalPriceHome}`}</p>
            </section>

            {/* Botón para simular */}
            <button
                onClick={handleSimulationSubmit}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mb-4"
            >
                Calcular
            </button>

            {response ? <section className="mb-4">
                <p className="text-black">{`Costo Total Simulado: ${totalCost}`}</p>
            </section>
                : ""
            }

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