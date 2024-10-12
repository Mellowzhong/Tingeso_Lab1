import FirstHomeForm from "../Components/FirstHomeForm";
import SecondHomeForm from "../Components/SecondHomeForm";
import ComercialPropertyForm from "../Components/ComercialPropertyForm";
import RemoldingForm from "../Components/RemoldingForm";
import RequestUserForm from "../../User/Components/RequestUserForm";

import { useState } from "react";
import { postCredit } from "../Services/CreditRequestService";
import { getUser } from "../../User/Services/UserServices"

function Simulation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");

    const [creditType, setCrediRequest] = useState("");
    const [showFirstHomeForm, setShowFirstHomeForm] = useState(false);
    const [showSecondHomeForm, setShowSecondHomeForm] = useState(false);
    const [showComercialPropertyForm, setShowComercialPropertyForm] = useState(false);
    const [showRemodelingForm, setShowRemodelingForm] = useState(false);

    const handleCheckboxChange = (formType) => {
        switch (formType) {
            case "firstHome":
                setShowFirstHomeForm(!showFirstHomeForm);
                setCrediRequest(!showFirstHomeForm ? "firstHome" : "");
                break;
            case "secondHome":
                setShowSecondHomeForm(!showSecondHomeForm);
                setCrediRequest(!showSecondHomeForm ? "secondHome" : "");
                break;
            case "comercialProperty":
                setShowComercialPropertyForm(!showComercialPropertyForm);
                setCrediRequest(!showComercialPropertyForm ? "comercialProperty" : "");
                break;
            case "remodeling":
                setShowRemodelingForm(!showRemodelingForm);
                setCrediRequest(!showRemodelingForm ? "remodeling" : "");
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        console.log("Submitting credit request:", creditType);
        const userRequestData = { firstName, lastName, rut };
        const creditRequestData = { creditType };

        try {
            const user = await getUser(userRequestData);
            console.log("User:", user);
            const response = await postCredit(creditRequestData, user.id);
            console.log("Response:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <RequestUserForm setFirstName={setFirstName} setLastName={setLastName} setRut={setRut} />
            <form className="grid" onSubmit={handleSubmit}>
                <label htmlFor="firstHome">
                    {showFirstHomeForm ? `Ocultar first home form` : `Mostrar first home form`}
                    <input type="checkbox" onChange={() => handleCheckboxChange("firstHome")} />
                    {showFirstHomeForm && <FirstHomeForm className={showFirstHomeForm ? "show-element" : null} />}
                </label>
                <label htmlFor="secondHome">
                    {showSecondHomeForm ? `Ocultar second home form` : `Mostrar second home form`}
                    <input type="checkbox" onChange={() => handleCheckboxChange("secondHome")} />
                    {showSecondHomeForm && <SecondHomeForm className={showSecondHomeForm ? "show-element" : null} />}
                </label>
                <label htmlFor="comercialProperty">
                    {showComercialPropertyForm ? `Ocultar comercial property form` : `Mostrar comercial property form`}
                    <input type="checkbox" onChange={() => handleCheckboxChange("comercialProperty")} />
                    {showComercialPropertyForm && <ComercialPropertyForm className={showComercialPropertyForm ? "show-element" : null} />}
                </label>
                <label htmlFor="remodeling">
                    {showRemodelingForm ? `Ocultar remodeling form` : `Mostrar remodeling form`}
                    <input type="checkbox" onChange={() => handleCheckboxChange("remodeling")} />
                    {showRemodelingForm && <RemoldingForm className={showRemodelingForm ? "show-element" : null} />}
                </label>
                <button type="submit">Mandar solicitud</button>
            </form>
        </>
    );
}

export default Simulation;