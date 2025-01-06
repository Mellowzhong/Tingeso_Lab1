import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CalculateSavingCapacityForm({ handleIncomeChange, setSavingHistory, balance }) {
    const [withdrawal, setWithdrawal] = useState(0);
    const [message, setMessage] = useState('No válido');
    const [confirm, setConfirm] = useState(false);
    const [errors, setErrors] = useState({
        balance: '',
        withdrawal: '',
        monthlyIncome: '',
    });

    // Función para validar si un valor es un número entero
    const validateIntegerInput = (value) => {
        return /^\d+$/.test(value); // Verifica que el valor sea un número entero positivo
    };

    // Manejo de cambios en los inputs con validación
    const handleInputChange = (e, setter, fieldName) => {
        const value = e.target.value;

        if (validateIntegerInput(value)) {
            setter(parseInt(value, 10));
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' })); // Limpiar errores
        } else {
            setter(0); // Restablecer el valor si no es válido
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: 'Ingrese un número entero válido',
            }));
        }
    };

    const handleGradeChange = (balance, withdrawal) => {
        const newBalance = balance * 0.5;
        setConfirm(true);

        if (newBalance >= withdrawal) {
            setSavingHistory(true);
            setMessage('Válido');
        } else {
            setSavingHistory(false);
            setMessage('No válido');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Validar Capacidad de Ahorro</h3>

            {/* Campo de saldo */}
            <div className='grid text-center'>
                Saldo:
                <span>
                    {balance}
                </span>
            </div>

            {/* Campo de retiro */}
            <label htmlFor="withdrawal" className="block text-sm font-medium text-gray-700 mb-2">
                Retiro:
                <input
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.withdrawal ? 'border-red-500' : ''
                        }`}
                    type="number"
                    name="withdrawal"
                    id="withdrawal"
                    placeholder='300000'
                    onBlur={(e) => handleInputChange(e, setWithdrawal, 'withdrawal')}
                />
                {errors.withdrawal && <span id='withdrawalErrorMessage' className="text-red-500 text-sm">{errors.withdrawal}</span>}
            </label>

            {/* Campo de depósito mensual */}
            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
                Depósito mensual:
                <input
                    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.monthlyIncome ? 'border-red-500' : ''
                        }`}
                    type="number"
                    name="monthlyIncome"
                    id="monthlyIncome"
                    placeholder='500000'
                    onBlur={(e) => handleInputChange(e, handleIncomeChange, 'monthlyIncome')}
                />
                {errors.monthlyIncome && (
                    <span id='monthlyIncomeErrorMessage' className="text-red-500 text-sm">{errors.monthlyIncome}</span>
                )}
            </label>

            {/* Botón para confirmar */}
            <button
                onClick={() => handleGradeChange(balance, withdrawal)}
                type="button"
                className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full mt-4 ${Object.values(errors).some((error) => error) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                disabled={Object.values(errors).some((error) => error)} // Deshabilitar si hay errores
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

CalculateSavingCapacityForm.propTypes = {
    handleIncomeChange: PropTypes.func.isRequired,
    setSavingHistory: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
};