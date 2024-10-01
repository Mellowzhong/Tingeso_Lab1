import { useState } from 'react';
import { postUser } from '../Services/UserServices';
import { useDispatch } from 'react-redux';
import { createUser } from '../../Storage/States/User';

function UserForm() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { first_name, last_name, rut, email, password, address };
            const response = await postUser(userData);
            console.log("Usuario registrado exitosamente:", response);
            dispatch(createUser(userData));
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };

    return (
        <>
            <h1>USER FORM</h1>

            <section>
                <form onSubmit={handleSubmit} className='grid'>
                    <label htmlFor="first_name">Nombre:
                        <input type="text" id="first_name" name="first_name" onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label htmlFor="last_name">Apellido:
                        <input type="text" id="last_name" name="last_name" onChange={(e) => setLastName(e.target.value)} />
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
                    <label htmlFor="password">Contraseña:
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </>
    )
}

export default UserForm;