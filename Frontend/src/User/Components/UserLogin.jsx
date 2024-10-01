import { useState } from "react";
import { loginUser } from "../Services/UserServices";
import { useDispatch } from 'react-redux';
import { createUser } from '../../Storage/States/User';

function UserLogin() {

    // Hacer la peticion del login
    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { rut, password };
            const response = await loginUser(userData);
            dispatch(createUser(response));
            console.log("Usuario logeado exitosamente:", response);
        } catch (error) {
            console.error("Error al logear usuario:", error);
        }
    };

    return (
        <>
            <h1>Login page</h1>
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="rut">
                        Rut:
                        <input type="text" name="rut" id="rut" onChange={(e) => setRut(e.target.value)} />
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </>
    );
}

export default UserLogin;