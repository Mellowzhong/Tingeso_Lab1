import DocumentForm from "../../Document/Components/DocumentForm";

import { useState } from "react";
import { postFile } from '../Services/CreditRequestService';

function RemoldingForm() {
    const [, setIncomeCertificate] = useState(null);
    const [, setUpdateAppraisalCertificate] = useState(null);
    const [, setRemodelingAmount] = useState(null);

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
            <h1>Remodeling form</h1>
            <form className="grid">
                <DocumentForm documentRequiredName="Comprobante de ingresos" handleFunction={handleFileChange} setFunction={setIncomeCertificate} documentName="comrpobante de ingresos" />
                <DocumentForm documentRequiredName="Presupuesto de remodelacion" handleFunction={handleFileChange} setFunction={setRemodelingAmount} documentName="presupuesto de remodelacion" />
                <DocumentForm documentRequiredName="Certificado de avaluo actualizado" handleFunction={handleFileChange} setFunction={setUpdateAppraisalCertificate} documentName="certificado de avaluo actualizado" />
            </form>
        </div>
    );
}

export default RemoldingForm;