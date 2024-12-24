import PropTypes from 'prop-types';
import { comprobeSimulatedInterestRate } from '../../Utils/SimulationUtils';
import {
    fisrtHomeInterestRate,
    secondHomeInterestRate,
    commercialPropertyInterestRate,
    remodelingInterestRate,
} from '../../Utils/Constants';
import { useState } from 'react';

function SimulationForm({
    creditType,
    messageSimulatedInterestRate,
    setCreditAmount,
    setSimulatedInterestRate,
    setNumberOfPays,
    setTotalPriceHome,
    setMessageSimulatedInterestRate,
    isCreditAmountValid,
    setIsCreditAmountValid,
    isTotalPriceHomeValid,
    setIsTotalPriceHomeValid,
    isNumberOfPaysValid,
    setIsNumberOfPaysValid,
    setIsSimulatedInterestRateValid,
}) {
    // Estados para rastrear si los campos han sido tocados
    const [touchedFields, setTouchedFields] = useState({
        creditAmount: false,
        totalPriceHome: false,
        numberOfPays: false,
        simulatedInterestRate: false,
    });

    const markFieldAsTouched = (fieldName) => {
        setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    };

    const checkInterestRate = (creditType, value) => {
        const response = comprobeSimulatedInterestRate(creditType, value);
        if (response) {
            const newValue = value / 12 / 100;
            setSimulatedInterestRate(newValue);
            setMessageSimulatedInterestRate('Valido');
            setIsSimulatedInterestRateValid(true);
        } else {
            setMessageSimulatedInterestRate(
                'No valido, ingrese un valor entre el rango de tasas de interés'
            );
            setIsSimulatedInterestRateValid(false);
        }
    };

    const handleIntegerInput = (e, setter, setValidity, fieldName) => {
        const inputValue = e.target.value;
        markFieldAsTouched(fieldName); // Marcar el campo como tocado
        // Permitir solo números enteros
        if (/^\d*$/.test(inputValue)) {
            setter(inputValue);
            setValidity(true);
        } else {
            setValidity(false);
        }
    };

    return (
        <div>
            {creditType === 'Select' ? (
                ''
            ) : (
                <section className="border-2 p-4 w-full rounded-lg">
                    <div className="grid gap-4">
                        {/* Cantidad solicitada */}
                        <label className="grid" htmlFor="Credit_Amount">
                            Cantidad solicitada:
                            <input
                                type="text"
                                id="Credit_Amount"
                                name="Credit_Amount"
                                placeholder="10000000"
                                onBlur={(e) =>
                                    handleIntegerInput(
                                        e,
                                        setCreditAmount,
                                        setIsCreditAmountValid,
                                        'creditAmount'
                                    )
                                }
                                className={`borde ${touchedFields.creditAmount && !isCreditAmountValid
                                    ? 'border-red-500'
                                    : 'border-black'
                                    }`}
                            />
                            {touchedFields.creditAmount && !isCreditAmountValid && (
                                <span className="text-red-500 text-sm flex justify-center">
                                    Ingrese un número válido
                                </span>
                            )}
                        </label>

                        {/* Precio total de la casa */}
                        <label className="grid" htmlFor="totalPriceHome">
                            Precio total de la casa:
                            <input
                                type="text"
                                id="totalPriceHome"
                                name="totalPriceHome"
                                placeholder="100000000"
                                onBlur={(e) =>
                                    handleIntegerInput(
                                        e,
                                        setTotalPriceHome,
                                        setIsTotalPriceHomeValid,
                                        'totalPriceHome'
                                    )
                                }
                                className={`border ${touchedFields.totalPriceHome && !isTotalPriceHomeValid
                                    ? 'border-red-500'
                                    : 'border-black'
                                    }`}
                            />
                            {touchedFields.totalPriceHome && !isTotalPriceHomeValid && (
                                <span className="text-red-500 text-sm flex justify-center">
                                    Ingrese un número válido
                                </span>
                            )}
                        </label>
                        <span className="text-sm flex justify-center font-bold">
                            Ingrese el monto según se muestra, sin el punto decimal.
                        </span>
                        {/* Plazo en años */}
                        <label className="grid" htmlFor="numberOfPays">
                            Plazo (en años):
                            <input
                                type="text"
                                id="numberOfPays"
                                name="numberOfPays"
                                placeholder="10"
                                onBlur={(e) =>
                                    handleIntegerInput(
                                        e,
                                        (value) => setNumberOfPays(value * 12),
                                        setIsNumberOfPaysValid,
                                        'numberOfPays'
                                    )
                                }
                                className={`borde ${touchedFields.numberOfPays && !isNumberOfPaysValid
                                    ? 'border-red-500'
                                    : 'border-black'
                                    }`}
                            />
                            {touchedFields.numberOfPays && !isNumberOfPaysValid && (
                                <span className="text-red-500 text-sm flex justify-center">
                                    Ingrese un número válido
                                </span>
                            )}
                        </label>
                        <span className="text-sm flex justify-center font-bold">
                            Ingrese los años como se muestra.
                        </span>

                        {/* Tasa de interés anual */}
                        <label className="grid" htmlFor="simulatedInterestRate">
                            Tasa de interes anual:
                            <input
                                type="number"
                                id="simulatedInterestRate"
                                name="simulatedInterestRate"
                                step="0.000000001"
                                placeholder="3.5"
                                onBlur={() => markFieldAsTouched('simulatedInterestRate')}
                                className={`border ${touchedFields.simulatedInterestRate ? 'border-black' : ''
                                    }`}
                            />
                            <section>
                                <div className="flex justify-center my-2 font-bold">
                                    {messageSimulatedInterestRate ? (
                                        ''
                                    ) : (
                                        <div>
                                            <span className="mr-1">Rango de tasa de interés: </span>
                                            {creditType === 'firstHome' && (
                                                <p className="text-center">
                                                    {fisrtHomeInterestRate[0]} -{' '}
                                                    {fisrtHomeInterestRate[1]}
                                                </p>
                                            )}
                                            {creditType === 'secondHome' && (
                                                <p className="text-center">
                                                    {secondHomeInterestRate[0]} -{' '}
                                                    {secondHomeInterestRate[1]}
                                                </p>
                                            )}
                                            {creditType === 'commercialProperty' && (
                                                <p className="text-center">
                                                    {commercialPropertyInterestRate[0]} -{' '}
                                                    {commercialPropertyInterestRate[1]}
                                                </p>
                                            )}
                                            {creditType === 'remodeling' && (
                                                <p className="text-center">
                                                    {remodelingInterestRate[0]} -{' '}
                                                    {remodelingInterestRate[1]}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    <p className="text-center">{messageSimulatedInterestRate}</p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const inputElement =
                                                document.getElementById('simulatedInterestRate');
                                            checkInterestRate(creditType, inputElement.value);
                                        }}
                                        className="w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 justify-center"
                                    >
                                        Comprobar Tasa
                                    </button>
                                </div>
                            </section>
                        </label>
                    </div>
                </section>
            )}
        </div>
    );
}

SimulationForm.propTypes = {
    creditType: PropTypes.string.isRequired,
    messageSimulatedInterestRate: PropTypes.string.isRequired,
    setCreditAmount: PropTypes.func.isRequired,
    setSimulatedInterestRate: PropTypes.func.isRequired,
    setNumberOfPays: PropTypes.func.isRequired,
    setTotalPriceHome: PropTypes.func.isRequired,
    setMessageSimulatedInterestRate: PropTypes.func.isRequired,
    isCreditAmountValid: PropTypes.bool.isRequired,
    setIsCreditAmountValid: PropTypes.func.isRequired,
    isTotalPriceHomeValid: PropTypes.bool.isRequired,
    setIsTotalPriceHomeValid: PropTypes.func.isRequired,
    isNumberOfPaysValid: PropTypes.bool.isRequired,
    setIsNumberOfPaysValid: PropTypes.func.isRequired,
    setIsSimulatedInterestRateValid: PropTypes.func.isRequired,
};

export default SimulationForm;
