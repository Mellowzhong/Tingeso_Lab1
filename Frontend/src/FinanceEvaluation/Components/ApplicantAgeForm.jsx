import PropTypes from 'prop-types';
import { useState } from 'react';

function ApplicantAgeForm({ applicantAge, setApplicantAge }) {
    const [age, setAge] = useState(0);
    const [message, setMessage] = useState("Edad del solicitante no comprobada");

    const handleSimulationSubmit = async (e) => {
        e.preventDefault();

        if (age <= 75 && age >= 18) {
            setMessage("El solicitante es menor de 75 años y mayor de 18 años");
        } else {
            setMessage("El solicitante no cumple con la edad requerida");
        }
    };

    return (
        <div className='flex flex-col items-center border-2 m-4 p-4'>
            <section className='flex flex-col items-center mb-4'>
                <label htmlFor="Age" className='flex flex-col items-center'>
                    <h2>Ingrese la edad a comprobar</h2>
                    <input
                        type="number"
                        id="Age"
                        name="Age"
                        onChange={(e) => setAge(e.target.value)}
                        className='mt-2 mb-2 text-center'
                    />
                    <button onClick={handleSimulationSubmit} type='button'>Comprobar</button>
                </label>
                <span>{message}</span>
            </section>
            <label htmlFor="applicantAge" className='flex flex-col items-center'>
                <h2>Edad del solicitante</h2>
                <input
                    type="checkbox"
                    name="applicantAge"
                    id="applicantAge"
                    checked={applicantAge}
                    onChange={() => setApplicantAge(!applicantAge)}
                />
            </label>

        </div>
    );
}

ApplicantAgeForm.propTypes = {
    applicantAge: PropTypes.bool.isRequired,
    setApplicantAge: PropTypes.func.isRequired,
};

export default ApplicantAgeForm;