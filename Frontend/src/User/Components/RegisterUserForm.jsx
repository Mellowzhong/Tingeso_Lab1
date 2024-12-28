import { useState } from 'react';
import { postUser } from '../Services/UserServices';

function RegisterUserForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState(0);
    const [rutPart1, setRutPart1] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSetRut = (e) => {
        const rutPart2 = e.target.value;
        setRut(`${rutPart1}-${rutPart2}`);
    }

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
                    <button type="submit" className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'>
                        Registrarse
                    </button>
                </form>
            </section>
        </div>
    )
}

export default RegisterUserForm;