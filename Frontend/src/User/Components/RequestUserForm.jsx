import PropTypes from 'prop-types';
import { useState } from 'react';

function RequestUserForm({ setFirstName, setLastName, setRut }) {

    const [rutPart1, setRutPart1] = useState("");

    const handleSetRut = (e) => {
        const rutPart2 = e.target.value;
        setRut(`${rutPart1}-${rutPart2}`);
    }

    return (
        <section className='bg-white'>
            <h2 className='text-xl font-semibold mb-4 text-center'>Datos del Usuario</h2>
            <div className='grid gap-4'>
                <label htmlFor="firstName" className='grid'>
                    Nombre:
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='Francisco'
                        className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                <label htmlFor="lastName" className='grid'>
                    Apellido:
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Sanchez'
                        className="mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                <label htmlFor="rut" className='grid'>
                    Rut:
                    <div className='flex'>
                        <input
                            type="number"
                            id="rut_part_1"
                            name="rut_part_1"
                            onInput={(e) => {
                                if (e.target.value.length > 8) {
                                    e.target.value = e.target.value.slice(0, 8);
                                }
                            }}
                            onBlur={(e) => setRutPart1(e.target.value)}
                            placeholder='12345678'
                            className="mt-1 block w-5/6 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <span className='flex items-center mx-2'>-</span>
                        <input
                            type="text"
                            id="rut_part_2"
                            name="rut_part_2"
                            onBlur={(e) => handleSetRut(e)}
                            maxLength="1"
                            placeholder='k'
                            className="mt-1 block w-1/6 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </label>
            </div>
        </section>
    );
}

RequestUserForm.propTypes = {
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setRut: PropTypes.func.isRequired
};

export default RequestUserForm;