import FirstHomeForm from "../Components/FirstHomeForm";
import SecondHomeForm from "../Components/SecondHomeForm";
import ComercialPropertyForm from "../Components/ComercialPropertyForm";
import RemoldingForm from "../Components/RemoldingForm";
import RequestUserForm from "../../User/Components/RequestUserForm";

import { useState } from "react";
import { postCredit } from "../Services/CreditService";
import { getUser } from "../../User/Services/UserServices"

function CreditRequest() {
    // User data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");

    // Credit forms
    const [showFirstHomeForm, setShowFirstHomeForm] = useState(false);
    const [showSecondHomeForm, setShowSecondHomeForm] = useState(false);
    const [showComercialPropertyForm, setShowComercialPropertyForm] = useState(false);
    const [showRemodelingForm, setShowRemodelingForm] = useState(false);

    // Credit data
    const [creditId, setCreditId] = useState("");
    const [creditType, setCrediRequest] = useState("");

    const [showCreditDocuments, setShowCreditDocuments] = useState(false);

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
            case "commercialProperty":
                setShowComercialPropertyForm(!showComercialPropertyForm);
                setCrediRequest(!showComercialPropertyForm ? "commercialProperty" : "");
                break;
            case "remodeling":
                setShowRemodelingForm(!showRemodelingForm);
                setCrediRequest(!showRemodelingForm ? "remodeling" : "");
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting credit request:", creditType);
        const userRequestData = { firstName, lastName, rut };
        const creditRequestData = { creditType };

        setShowCreditDocuments(!showCreditDocuments);

        try {
            const user = await getUser(userRequestData);
            console.log("User:", user);
            const response = await postCredit(creditRequestData, user.id);
            setCreditId(response);
            console.log("Response:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            {!showCreditDocuments &&
                <section>
                    <RequestUserForm setFirstName={setFirstName} setLastName={setLastName} setRut={setRut} />
                    <form className="grid" onSubmit={handleSubmit}>
                        <label htmlFor="firstHome">
                            {showFirstHomeForm ? `Ocultar first home form` : `Mostrar first home form`}
                            <input type="checkbox" onChange={() => handleCheckboxChange("firstHome")} />
                        </label>
                        <label htmlFor="secondHome">
                            {showSecondHomeForm ? `Ocultar second home form` : `Mostrar second home form`}
                            <input type="checkbox" onChange={() => handleCheckboxChange("secondHome")} />
                        </label>
                        <label htmlFor="commercialProperty">
                            {showComercialPropertyForm ? `Ocultar comercial property form` : `Mostrar comercial property form`}
                            <input type="checkbox" onChange={() => handleCheckboxChange("commercialProperty")} />
                        </label>
                        <label htmlFor="remodeling">
                            {showRemodelingForm ? `Ocultar remodeling form` : `Mostrar remodeling form`}
                            <input type="checkbox" onChange={() => handleCheckboxChange("remodeling")} />
                        </label>
                        <button type="submit">Siguente</button>
                    </form>
                </section>
            }
            {/* Parte de los documentos */}
            creditId - {creditId}
            {showCreditDocuments &&
                <section >
                    {showFirstHomeForm && <FirstHomeForm creditId={creditId} className={showFirstHomeForm ? "show-element" : null} />}
                    {showSecondHomeForm && <SecondHomeForm creditId={creditId} className={showSecondHomeForm ? "show-element" : null} />}
                    {showComercialPropertyForm && <ComercialPropertyForm creditId={creditId} className={showComercialPropertyForm ? "show-element" : null} />}
                    {showRemodelingForm && <RemoldingForm creditId={creditId} className={showRemodelingForm ? "show-element" : null} />}
                </section>
            }
        </>
    );
}

export default CreditRequest;