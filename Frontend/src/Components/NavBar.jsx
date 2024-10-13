import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div className="my-4 py-4 border-b-2 text-center">
            <Link to="/">
                <span className="mx-4">
                    Presta banco
                </span>
            </Link>
            <Link to="/simulation">
                <span className="mx-4">
                    Simulacion de credito
                </span>
            </Link>
            <Link to={"/creditRequest"}>
                <span className="mx-4">
                    Solicitud de crédito
                </span>
            </Link>
            <Link to={"/excecutive"}>
                <span className="mx-4">
                    Ejecutivo
                </span>
            </Link>
        </div>
    )
}