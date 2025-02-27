import PropTypes from 'prop-types';
import { useState } from 'react';

function ApplicantAgeForm({ applicantAge, setApplicantAge }) {
    const [age, setAge] = useState(0);
    const [message, setMessage] = useState("Edad del solicitante no comprobada");
    const [errorMessage, setErrorMessage] = useState("");

    // Función para manejar la validación de la edad
    const handleAgeInput = (e) => {
        const inputValue = e.target.value;

        if (/^\d+$/.test(inputValue)) {
            setAge(parseInt(inputValue, 10));
            setErrorMessage(""); // Limpiar mensaje de error si el valor es válido
        } else {
            setErrorMessage("Ingrese un número entero válido para la edad");
        }
    };

    const handleSimulationSubmit = (e) => {
        e.preventDefault();

        if (age <= 75 && age >= 18) {
            setMessage("El solicitante es menor de 75 años y mayor de 18 años");
        } else {
            setMessage("El solicitante no cumple con la edad requerida");
        }
    };

    const handleValidation = () => {
        setApplicantAge(!applicantAge); // Cambia el estado de `applicantAge`
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-1/2 ml-2 grid items-center">
            {/* Comprobar edad */}
            <section className="mb-4">
                <h2 className="text-4xl font-semibold mb-2 text-center">Comprobar Edad del Solicitante</h2>
                <div className="flex flex-col items-center">
                    <label htmlFor="Age" className="w-1/4">
                        <input
                            type="number"
                            id="Age"
                            name="Age"
                            placeholder="Ingrese la edad"
                            onBlur={handleAgeInput}
                            className={`border border-gray-300 rounded-md p-2 w-full text-center mb-4 ${errorMessage ? "border-red-500" : ""
                                }`}
                        />
                    </label>
                    {errorMessage && (
                        <span id='AgeErrorMessage' className="text-red-500 text-sm mb-2">{errorMessage}</span>
                    )}
                    <button
                        onClick={handleSimulationSubmit}
                        type="button"
                        className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 ${errorMessage ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={!!errorMessage} // Deshabilitar botón si hay un error
                    >
                        Comprobar
                    </button>
                    <span className={`mt-4 ${message.includes('no') ? 'text-red-600' : 'text-green-500'}`}>
                        {message}
                    </span>
                </div>
            </section>

            {/* Botón para validar edad */}
            <section className="flex flex-col items-center">
                <button
                    onClick={handleValidation}
                    type="button"
                    className={`bg-${applicantAge ? 'green' : 'red'}-600 text-white py-2 px-4 rounded-md hover:bg-${applicantAge ? 'green' : 'red'
                        }-600`}
                >
                    {applicantAge ? "Edad validada" : "Validar Edad"}
                </button>
            </section>
        </div>
    );
}

ApplicantAgeForm.propTypes = {
    applicantAge: PropTypes.bool.isRequired,
    setApplicantAge: PropTypes.func.isRequired,
};

export default ApplicantAgeForm;