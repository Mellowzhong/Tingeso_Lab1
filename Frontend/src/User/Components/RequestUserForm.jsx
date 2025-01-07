import PropTypes from 'prop-types';
import { useState } from 'react';

function RequestUserForm({ setFirstName, setLastName, setRut }) {
    const [rutPart1, setRutPart1] = useState("");
    const [rutPart2, setRutPart2] = useState("");
    const [errors, setErrors] = useState({ rutPart1: "", rutPart2: "" });

    const validateRutPart1 = (value) => {
        if (value.length < 8) {
            setErrors((prev) => ({ ...prev, rutPart1: "El RUT debe tener al menos 8 dígitos." }));
        } else {
            setErrors((prev) => ({ ...prev, rutPart1: "" }));
        }
    };

    const validateRutPart2 = (value) => {
        if (value.length !== 1) {
            setErrors((prev) => ({ ...prev, rutPart2: "El dígito verificador debe tener 1 carácter." }));
        } else {
            setErrors((prev) => ({ ...prev, rutPart2: "" }));
        }
    };

    const updateFullRut = () => {
        if (!errors.rutPart1 && !errors.rutPart2 && rutPart1 && rutPart2) {
            setRut(`${rutPart1}-${rutPart2}`);
        }
    };

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
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <input
                                type="text"
                                id="rut_part_1"
                                name="rut_part_1"
                                value={rutPart1}
                                onChange={(e) => {
                                    const value = e.target.value.slice(0, 8);
                                    setRutPart1(value);
                                    validateRutPart1(value);
                                }}
                                onBlur={updateFullRut}
                                placeholder='12345678'
                                className="mt-1 block w-5/6 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <span className='flex items-center mx-2'>-</span>
                            <input
                                type="text"
                                id="rut_part_2"
                                name="rut_part_2"
                                value={rutPart2}
                                onChange={(e) => {
                                    const value = e.target.value.slice(0, 1);
                                    setRutPart2(value);
                                    validateRutPart2(value);
                                }}
                                onBlur={updateFullRut}
                                maxLength="1"
                                placeholder='k'
                                className="mt-1 block w-1/6 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {errors.rutPart1 && (
                            <span className="text-red-500 text-sm mt-1">{errors.rutPart1}</span>
                        )}
                        {errors.rutPart2 && (
                            <span className="text-red-500 text-sm mt-1">{errors.rutPart2}</span>
                        )}
                    </div>
                </label>
            </div>
        </section>
    );
}

RequestUserForm.propTypes = {
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setRut: PropTypes.func.isRequired,
};

export default RequestUserForm;
