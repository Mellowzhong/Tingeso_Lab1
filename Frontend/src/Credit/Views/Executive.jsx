import { getAllCredits } from "../Services/CreditService";
import { useEffect, useState } from "react";

import { downloadDocument } from "../../Document/Services/DocumentServices";

function Executive() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await getAllCredits();
                setDocuments(response);
            } catch (error) {
                console.error("Error fetching credits:", error);
            }
        };

        fetchCredits();
    }, []);

    const handleSubmit = async (e, documentId, fileName) => {
        e.preventDefault();
        console.log("ola", documentId, fileName);
        const response = await downloadDocument(documentId, fileName);
        console.log("Response:", response);
    };

    return (
        <div>
            <h1>Executive</h1>
            <ul>
                {documents.map((credit) => (
                    <div key={credit.id}>
                        <p>Credit ID: {credit.id}</p>
                        <span>User info</span>
                        <p>First Name: {credit.user.firstName}</p>
                        <p>Last Name: {credit.user.lastName}</p>
                        <p>Rut: {credit.user.rut}</p>
                        {credit.documents.map((document) => (
                            <form
                                className="my-4"
                                onSubmit={(e) => handleSubmit(e, document.id, document.documentName)}
                                key={document.id}
                            >
                                <p>Document ID: {document.id}</p>
                                <p>Document Name: {document.documentName}</p>
                                <p>Document Type: {document.documentType}</p>
                                <p>Document Credit Type: {document.typeCreditDocument}</p>
                                <button type="submit">Solicitar documento</button>
                            </form>
                        ))}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Executive;