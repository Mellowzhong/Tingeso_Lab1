import { useState, useEffect } from 'react';
import { postUser } from '../Services/UserServices';

function RegisterUserForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState(0);
    const [rutPart1, setRutPart1] = useState("");
    const [rutPart2, setRutPart2] = useState("");
    const [errors, setErrors] = useState({ rutPart1: "", rutPart2: "" });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    // Validación del formulario completo
    useEffect(() => {
        const isValid =
            firstName.trim() !== "" &&
            lastName.trim() !== "" &&
            rut.trim() !== "" &&
            address.trim() !== "" &&
            age > 0; // Asegúrate de que la edad sea mayor a 0
        setIsFormValid(isValid);
    }, [firstName, lastName, rut, address, age]);

    // Validación de rut_part_1
    const validateRutPart1 = (value) => {
        if (value.length < 8) {
            setErrors((prev) => ({ ...prev, rutPart1: "El RUT debe tener al menos 8 dígitos." }));
        } else {
            setErrors((prev) => ({ ...prev, rutPart1: "" }));
        }
    };

    // Validación de rut_part_2
    const validateRutPart2 = (value) => {
        if (value.length !== 1) {
            setErrors((prev) => ({ ...prev, rutPart2: "El dígito verificador debe tener 1 carácter." }));
        } else {
            setErrors((prev) => ({ ...prev, rutPart2: "" }));
        }
    };

    // Actualiza el RUT completo si ambos campos son válidos
    const updateFullRut = () => {
        if (!errors.rutPart1 && !errors.rutPart2 && rutPart1 && rutPart2) {
            setRut(`${rutPart1}-${rutPart2}`);
        }
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { firstName, lastName, rut, address, age };

        try {
            const { status } = await postUser(userData);

            if (status === 201) {
                setMessageType("success");
                setMessage("Usuario registrado correctamente.");
            } else if (status === 409) {
                setMessageType("error");
                setMessage("El usuario ya existe.");
            } else {
                setMessageType("error");
                setMessage("Error al registrar usuario.");
            }
        } catch {
            setMessageType("error");
            setMessage("Ocurrió un error inesperado. Por favor, inténtalo nuevamente.");
        }
    };

    return (
        <div className='flex flex-col items-center justify-center '>
            <h1 className='text-4xl mb-4'>Registro</h1>

            <section className='border-2 p-4 w-1/4 rounded-lg bg-white'>
                <form onSubmit={handleSubmit} className='grid gap-4'>
                    <label className='grid' htmlFor="firstName">
                        Nombre:
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='Francisco'
                            className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <label className='grid' htmlFor="lastName">
                        Apellido:
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Sanchez'
                            className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <span>Rut:</span>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            {/* Cambiado a type="text" para evitar problemas con ceros iniciales */}
                            <input
                                type="text"
                                id="rut_part_1"
                                name="rut_part_1"
                                value={rutPart1}
                                onChange={(e) => {
                                    const value = e.target.value.slice(0, 8); // Limitar a 8 caracteres
                                    setRutPart1(value);
                                    validateRutPart1(value);
                                }}
                                onBlur={updateFullRut} // Actualiza el RUT completo al perder el foco
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
                                    const value = e.target.value.slice(0, 1); // Limitar a 1 carácter
                                    setRutPart2(value);
                                    validateRutPart2(value);
                                }}
                                onBlur={updateFullRut} // Actualiza el RUT completo al perder el foco
                                maxLength="1"
                                placeholder='k'
                                className="mt-1 block w-1/6 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {/* Mensajes de error */}
                        {errors.rutPart1 && (
                            <span className="text-red-500 text-sm mt-1">{errors.rutPart1}</span>
                        )}
                        {errors.rutPart2 && (
                            <span className="text-red-500 text-sm mt-1">{errors.rutPart2}</span>
                        )}
                    </div>
                    <label className='grid' htmlFor="address">
                        Dirección:
                        <input
                            type="text"
                            id="address"
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Obispo Donoso 5'
                            className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <label className='grid' htmlFor="age">
                        Edad:
                        <input
                            type="number"
                            id="age"
                            name="age"
                            onChange={(e) => setAge(e.target.value)}
                            placeholder='25'
                            className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    {message && (
                        <div id='messageUserExist' className={`flex justify-center p-2 text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {message}
                        </div>
                    )}
                    {/* El botón estará deshabilitado si el formulario no es válido */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full py-2 px-4 rounded-md text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}>
                        Registrarse
                    </button>
                </form>
            </section>
        </div>
    );
}

export default RegisterUserForm;