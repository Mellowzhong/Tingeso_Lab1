import { useState } from 'react';
import { postUser } from '../Services/UserServices';

function RegisterUserForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { firstName, lastName, rut, email, address, age };
            const response = await postUser(userData);
            console.log("Usuario registrado exitosamente:", response);
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };

    return (
        <>
            <h1>USER FORM</h1>

            <section>
                <form onSubmit={handleSubmit} className='grid'>
                    <label htmlFor="firstName">Nombre:
                        <input type="text" id="firstName" name="firstName" onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label htmlFor="lastName">Apellido:
                        <input type="text" id="lastName" name="lastName" onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label htmlFor="rut">Rut:
                        <input type="text" id="rut" name="rut" onChange={(e) => setRut(e.target.value)} />
                    </label>
                    <label htmlFor="address">Dirección:
                        <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <label htmlFor="email">Email:
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label htmlFor="age">Edad:
                        <input type="number" id="age" name="age" onChange={(e) => setAge(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </>
    )
}

export default RegisterUserForm;