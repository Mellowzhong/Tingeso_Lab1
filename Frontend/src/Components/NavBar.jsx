import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function NavBar() {
    const user = useSelector((state) => state.user)

    return (
        <div className="my-4 py-4 border-b-2 text-center">
            <Link to="/">
                <span>
                    E-commerce
                </span>
            </Link>
            <section className="flex text-start justify-between">
                <Link to="/login">
                    <span className="mx-4">{user.first_name} - {user.last_name}</span>
                </Link>
            </section>
        </div>
    )
}