import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    fisrtHomeInterestRate,
    secondHomeInterestRate,
    commercialPropertyInterestRate,
    remodelingInterestRate,
} from '../../Utils/Constants';
import { comprobeSimulatedInterestRate } from '../../Utils/SimulationUtils';

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

    const [touchedFields, setTouchedFields] = useState({
        creditAmount: false,
        totalPriceHome: false,
        numberOfPays: false,
        simulatedInterestRate: false,
    });

    const interestRates = {
        firstHome: fisrtHomeInterestRate,
        secondHome: secondHomeInterestRate,
        commercialProperty: commercialPropertyInterestRate,
        remodeling: remodelingInterestRate,
    };

    const placeholderContent = interestRates[creditType]
        ? `${interestRates[creditType][0]} - ${interestRates[creditType][1]}`
        : 'Select a credit type';

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
        markFieldAsTouched(fieldName);
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
                <section id='simulatedCreditSection' className="border-2 p-4 w-full rounded-lg">
                    <div className="grid gap-4">
                        <label className="grid" htmlFor="CreditAmount">
                            Cantidad solicitada:
                            <input
                                type="text"
                                id="CreditAmount"
                                name="CreditAmount"
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
                                <span id='simulationCreditAmountErrorMessage' className="text-red-500 text-sm flex justify-center">
                                    Ingrese un número válido
                                </span>
                            )}
                        </label>

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
                                <span id='simulationTotalPriceHomeErrorMessage' className="text-red-500 text-sm flex justify-center">
                                    Ingrese un número válido
                                </span>
                            )}
                        </label>

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
                                className={`border ${touchedFields.numberOfPays && !isNumberOfPaysValid
                                    ? 'border-red-500'
                                    : 'border-black'
                                    }`}
                            />
                            {touchedFields.numberOfPays && !isNumberOfPaysValid && (
                                <span id='simulationNumberOfPaysErrorMessage' className="text-red-500 text-sm flex justify-center">
                                    Ingrese un número válido
                                </span>
                            )}
                        </label>

                        <label className="grid" htmlFor="simulatedInterestRate">
                            Tasa de interes anual:
                            <input
                                type="number"
                                id="simulatedInterestRate"
                                name="simulatedInterestRate"
                                step="0.1"
                                placeholder={placeholderContent}
                                onBlur={() => markFieldAsTouched('simulatedInterestRate')}
                                className={`border ${touchedFields.simulatedInterestRate ? 'border-black' : ''
                                    }`}
                            />
                            <section>
                                <div className="flex justify-center my-2 font-bold">
                                    {!messageSimulatedInterestRate && (
                                        <>
                                            <span id='RangeSimulatedInterestRate'>
                                                Rango de tasa de interés:
                                                {interestRates[creditType] && (
                                                    <span className="text-center">
                                                        {interestRates[creditType][0]} -{' '}
                                                        {interestRates[creditType][1]}
                                                    </span>
                                                )}
                                            </span>
                                        </>
                                    )}
                                    <p id="textIsValidOrNot" className="text-center">
                                        {messageSimulatedInterestRate}
                                    </p>
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
            )
            }
        </div >
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