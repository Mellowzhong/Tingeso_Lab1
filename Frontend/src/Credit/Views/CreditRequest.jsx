import FirstHomeForm from "../Components/FirstHomeForm";
import SecondHomeForm from "../Components/SecondHomeForm";
import ComercialPropertyForm from "../Components/ComercialPropertyForm";
import RemoldingForm from "../Components/RemoldingForm";
import RequestUserForm from "../../User/Components/RequestUserForm";

import { useState } from "react";
import { postCredit } from "../Services/CreditService";
import { getUser } from "../../User/Services/UserServices";

function CreditRequest() {
    // User data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");

    // Credit data
    const [creditId, setCreditId] = useState("");
    const [creditType, setCreditType] = useState("");

    const [showCreditDocuments, setShowCreditDocuments] = useState(false);

    const handleSelectChange = (e) => {
        setCreditType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (creditType == "") {
            console.log("No credit type selected");
        } else {
            console.log("Submitting credit request:", creditType);
            const userRequestData = { firstName, lastName, rut };
            const creditRequestData = { creditType };

            setShowCreditDocuments(true);

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
    };

    return (
        <>
            {!showCreditDocuments &&
                <section>
                    <RequestUserForm setFirstName={setFirstName} setLastName={setLastName} setRut={setRut} />
                    <form className="grid" onSubmit={handleSubmit}>
                        <label htmlFor="creditType">Selecciona el tipo de crédito:</label>
                        <select name="creditType" id="creditType" value={creditType} onChange={handleSelectChange}>
                            <option value="">Seleccione una opción</option>
                            <option value="firstHome">First Home</option>
                            <option value="secondHome">Second Home</option>
                            <option value="commercialProperty">Commercial Property</option>
                            <option value="remodeling">Remodeling</option>
                        </select>
                        <button type="submit">Siguiente</button>
                    </form>
                </section>
            }
            {/* Parte de los documentos */}
            creditId - {creditId}
            {showCreditDocuments &&
                <section>
                    {creditType === "firstHome" && <FirstHomeForm creditId={creditId} />}
                    {creditType === "secondHome" && <SecondHomeForm creditId={creditId} />}
                    {creditType === "commercialProperty" && <ComercialPropertyForm creditId={creditId} />}
                    {creditType === "remodeling" && <RemoldingForm creditId={creditId} />}
                </section>
            }
        </>
    );
}

export default CreditRequest;