import { Link } from "react-router-dom";

export default function NavBar() {

    return (
        <div className="my-4 py-4 border-b-2 text-center">
            <Link to="/">
                <span className="mx-4">
                    Presta banco
                </span>
            </Link>
            <Link to={"/simulation"}>
                <span className="mx-4">
                    Simulacion
                </span>
            </Link>
        </div>
    )
}