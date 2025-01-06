import PropTypes from 'prop-types';
import { comprobeSimulatedInterestRate } from '../Utils/SimulationUtils';
import { useState } from 'react';
import {
    fisrtHomeInterestRate,
    secondHomeInterestRate,
    commercialPropertyInterestRate,
    remodelingInterestRate,
} from '../Utils/Constants';

function CalculateDataForm({
    creditType,
    setSimulatedInterestRate,
    setNumberOfPays,
    setBalance,
}) {
    const [message, setMessage] = useState('No validado');
    const [numberOfPaysMessage, setNumberOfPaysMessage] = useState('');
    const [balanceMessage, setBalanceMessage] = useState('');

    const interestRates = {
        firstHome: fisrtHomeInterestRate,
        secondHome: secondHomeInterestRate,
        commercialProperty: commercialPropertyInterestRate,
        remodeling: remodelingInterestRate,
    };

    const placeholderContent = interestRates[creditType]
        ? `${interestRates[creditType][0]} - ${interestRates[creditType][1]}`
        : 'Select a credit type';

    // Función para validar si un número es entero
    const handleIntegerInput = (e, setter, setMessage) => {
        const value = e.target.value;
        if (/^\d+$/.test(value)) {
            setter(parseInt(value, 10));
            setMessage('');
        } else {
            setMessage('Ingrese un número entero válido');
        }
    };

    return (
        <div className="grid gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-center">Datos del Crédito</h3>

            {/* Tasa de interés anual */}
            <label htmlFor="simulatedInterestRate" className="block text-sm font-medium text-gray-700">
                Tasa de interés anual:
                <input
                    type="number"
                    id="simulatedInterestRate"
                    name="simulatedInterestRate"
                    step="0.000000001"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={placeholderContent}
                    onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        const response = comprobeSimulatedInterestRate(creditType, value);
                        if (response) {
                            setMessage('Tasa de interés válida');
                        } else {
                            setMessage('Tasa de interés inválida');
                        }
                        const newValue = (value / 12) / 100;
                        setSimulatedInterestRate(newValue);
                    }}
                />
            </label>
            <p className='text-center'>{message}</p>

            {/* Plazo */}
            <label htmlFor="numberOfPays" className="block text-sm font-medium text-gray-700">
                Plazo (en años):
                <input
                    type="number"
                    id="numberOfPays"
                    name="numberOfPays"
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${numberOfPaysMessage ? 'border-red-500' : ''
                        }`}
                    placeholder='20'
                    onBlur={(e) =>
                        handleIntegerInput(e, (value) => setNumberOfPays(value * 12), setNumberOfPaysMessage)
                    }
                />
                {numberOfPaysMessage && (
                    <span id='numberOfPaysErrorMessage' className="text-red-500 text-sm">{numberOfPaysMessage}</span>
                )}
            </label>

            {/* Saldo */}
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                Saldo:
                <input
                    type="number"
                    id="balance"
                    name="balance"
                    placeholder='1000000'
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${balanceMessage ? 'border-red-500' : ''
                        }`}
                    onBlur={(e) =>
                        handleIntegerInput(e, setBalance, setBalanceMessage)
                    }
                />
                {balanceMessage && (
                    <span id='balanceErrorMessage' className="text-red-500 text-sm">{balanceMessage}</span>
                )}
            </label>
        </div>
    );
}

CalculateDataForm.propTypes = {
    creditType: PropTypes.string.isRequired,
    setSimulatedInterestRate: PropTypes.func.isRequired,
    setNumberOfPays: PropTypes.func.isRequired,
    setBalance: PropTypes.func.isRequired,
};

export default CalculateDataForm;
