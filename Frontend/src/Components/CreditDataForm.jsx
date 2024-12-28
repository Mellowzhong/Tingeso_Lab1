import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CreditDataForm({ setRequestedAmount, setTotalPriceHome, setMonthlyClientIncome }) {
    const [isRequestedAmountValid, setIsRequestedAmountValid] = useState(true);
    const [isTotalPriceHomeValid, setIsTotalPriceHomeValid] = useState(true);
    const [isMonthlyClientIncomeValid, setIsMonthlyClientIncomeValid] = useState(true);

    const validateInteger = (value) => /^\d+$/.test(value);

    const handleBlur = (e, setter, setIsValid) => {
        const value = e.target.value;
        if (validateInteger(value)) {
            setter(parseInt(value, 10));
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return (
        <div className="grid gap-4 bg-white p-6 border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-center">Datos del Crédito</h3>

            {/* Cantidad solicitada */}
            <label htmlFor="creditAmount" className="block font-medium text-gray-700">
                Cantidad solicitada:
                <input
                    type="text"
                    id="creditAmount"
                    name="creditAmount"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${!isRequestedAmountValid ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="10000000"
                    onBlur={(e) => handleBlur(e, setRequestedAmount, setIsRequestedAmountValid)}
                />
                {!isRequestedAmountValid && (
                    <span id='creditCreditAmountErrorMessage' className="text-red-500 text-sm flex justify-center">Ingrese un número entero válido</span>
                )}
            </label>

            {/* Precio total de la casa */}
            <label htmlFor="totalPriceHome" className="block font-medium text-gray-700">
                Precio total de la casa:
                <input
                    type="text"
                    id="totalPriceHome"
                    name="totalPriceHome"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${!isTotalPriceHomeValid ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="100000000"
                    onBlur={(e) => handleBlur(e, setTotalPriceHome, setIsTotalPriceHomeValid)}
                />
                {!isTotalPriceHomeValid && (
                    <span id='creditTotalPriceHomeErrorMessage' className="text-red-500 text-sm flex justify-center">Ingrese un número entero válido</span>
                )}
            </label>

            {/* Ingreso mensual del cliente */}
            <label htmlFor="monthlyClientIncome" className="block font-medium text-gray-700">
                Ingreso mensual del cliente:
                <input
                    type="text"
                    id="monthlyClientIncome"
                    name="monthlyClientIncome"
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${!isMonthlyClientIncomeValid ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="1000000"
                    onBlur={(e) => handleBlur(e, setMonthlyClientIncome, setIsMonthlyClientIncomeValid)}
                />
                {!isMonthlyClientIncomeValid && (
                    <span id='creditMonthlyClientIncomeErrorMessage' className="text-red-500 text-sm flex justify-center">Ingrese un número entero válido</span>
                )}
            </label>
        </div>
    );
}

CreditDataForm.propTypes = {
    setRequestedAmount: PropTypes.func.isRequired,
    setTotalPriceHome: PropTypes.func.isRequired,
    setMonthlyClientIncome: PropTypes.func.isRequired,
};