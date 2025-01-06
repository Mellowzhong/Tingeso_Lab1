import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CalculateRecentWithdrawalsForm({ balance, setSavingCapacityRecentWithdrawals }) {
    const [withdrawal, setWithdrawal] = useState(0);
    const [message, setMessage] = useState('No válido');
    const [confirm, setConfirm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Función para validar si un valor es un número entero positivo
    const validateIntegerInput = (value) => {
        return /^\d+$/.test(value); // Verifica que el valor sea un número entero positivo
    };

    // Manejo del cambio en el campo de retiro con validación
    const handleWithdrawalChange = (e) => {
        const value = e.target.value;

        if (validateIntegerInput(value)) {
            setWithdrawal(parseInt(value, 10));
            setErrorMessage(''); // Limpiar mensaje de error si el valor es válido
        } else {
            setWithdrawal(0); // Restablecer el valor si no es válido
            setErrorMessage('Ingrese un número entero válido');
        }
    };

    const handleGradeChange = (withdrawal) => {
        const newBalance = balance * 0.3;
        setConfirm(true);

        if (newBalance >= withdrawal) {
            setSavingCapacityRecentWithdrawals(true);
            setMessage('Válido');
        } else {
            setSavingCapacityRecentWithdrawals(false);
            setMessage('No válido');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Validar Retiros Recientes</h3>

            {/* Campo de retiro */}
            <label htmlFor="withdrawal" className="block text-sm font-medium text-gray-700 mb-2">
                Monto del retiro:
                <input
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errorMessage ? 'border-red-500' : ''
                        }`}
                    type="number"
                    name="withdrawal"
                    id="withdrawal"
                    placeholder="300000"
                    onBlur={handleWithdrawalChange}
                />
                {errorMessage && (
                    <span id='withdrawalErrorMessageInRecent' className="text-red-500 text-sm">{errorMessage}</span>
                )}
            </label>

            {/* Botón para confirmar */}
            <button
                onClick={() => handleGradeChange(withdrawal)}
                type="button"
                className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full mt-4 ${errorMessage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                disabled={!!errorMessage} // Deshabilitar el botón si hay un error
            >
                Confirmar
            </button>

            {confirm && (
                <p
                    className={`mt-4 font-semibold text-center ${message === 'Válido' ? 'text-green-500' : 'text-red-500'
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}

CalculateRecentWithdrawalsForm.propTypes = {
    balance: PropTypes.number.isRequired,
    setSavingCapacityRecentWithdrawals: PropTypes.func.isRequired,
};