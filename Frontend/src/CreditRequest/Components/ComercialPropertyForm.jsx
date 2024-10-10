import DocumentForm from "../../Document/Components/DocumentForm";

import { useState } from "react";
import { postFile } from '../Services/CreditRequestService';

function SecondHomeForm() {
    const [, setIncomeCertificate] = useState(null);
    const [, setAppraisalCertificate] = useState(null);
    const [, setBusinessFinanceState] = useState(null);
    const [, setBusinessPlan] = useState(null);

    const handleFileChange = async (event, setFile, typeOfCredit) => {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file)); // Para la vista previa
            const docValue = typeOfCredit; // Obtén este valor de donde sea necesario
            try {
                const response = await postFile(file, docValue);
                console.log(response); // Muestra la respuesta del servidor
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <div>
            <h1>Comercial Property Form</h1>
            <form className="grid">
                <DocumentForm documentRequiredName="Estado financiero del negocio" handleFunction={handleFileChange} setFunction={setBusinessFinanceState} documentName="estado financiero del negocio" />
                <DocumentForm documentRequiredName="Comprobante de ingresos" handleFunction={handleFileChange} setFunction={setIncomeCertificate} documentName="comprobante de ingresos" />
                <DocumentForm documentRequiredName="Certificado de avaluo" handleFunction={handleFileChange} setFunction={setAppraisalCertificate} documentName="certificado de avaluo" />
                <DocumentForm documentRequiredName="Plan de negocio" handleFunction={handleFileChange} setFunction={setBusinessPlan} documentName="plan de negocio" />
            </form>
        </div>
    );
}

export default SecondHomeForm;