import PropTypes from 'prop-types';
import { useState } from 'react';

export default function DebtForm({ handleGradeChange }) {
    const [debt, setDebt] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // Función para validar si el valor ingresado es un número entero
    const handleIntegerInput = (e) => {
        const inputValue = e.target.value;

        if (/^\d+$/.test(inputValue)) {
            setDebt(parseInt(inputValue, 10));
            setErrorMessage(''); // Limpiar mensaje de error si el valor es válido
        } else {
            setErrorMessage('Ingrese un número entero válido');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 grid">
            <h3 className="text-lg font-semibold mb-4 text-center">Registrar Deuda</h3>

            {/* Campo de deuda */}
            <label htmlFor="debt" className="block text-sm font-medium text-gray-700 mb-2">
                Monto de la deuda:
                <input
                    className={`mt-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errorMessage ? 'border-red-500' : ''
                        }`}
                    placeholder='100000'
                    type="number"
                    name="debt"
                    id="debt"
                    onBlur={handleIntegerInput}
                />
            </label>
            {errorMessage && (
                <span id='debtErrorMessage' className="text-red-500 text-sm">{errorMessage}</span>
            )}

            {/* Botón para confirmar */}
            <button
                onClick={() => handleGradeChange(debt)}
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full mt-4"
                disabled={!!errorMessage} // Deshabilitar botón si hay un error
            >
                Confirmar
            </button>
        </div>
    );
}

DebtForm.propTypes = {
    handleGradeChange: PropTypes.func.isRequired,
};
