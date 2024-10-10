import DocumentForm from "../../Document/Components/DocumentForm";

import { useState } from "react";
import { postFile } from '../Services/CreditRequestService';

function SecondHomeForm() {
    const [, setIncomeCertificate] = useState(null);
    const [, setAppraisalCertificate] = useState(null);
    const [, setCreditHistorial] = useState(null);
    const [, setFirstHOmeCertificate] = useState(null);

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
            <h1>Second Home Form</h1>
            <form className="grid">
                <DocumentForm documentRequiredName="Comprobante de ingresos" handleFunction={handleFileChange} setFunction={setIncomeCertificate} documentName="comrpobante de ingresos" />
                <DocumentForm documentRequiredName="Certificado de avaluo" handleFunction={handleFileChange} setFunction={setAppraisalCertificate} documentName="certificado de avaluo" />
                <DocumentForm documentRequiredName="Certificado de primera vivienda" handleFunction={handleFileChange} setFunction={setFirstHOmeCertificate} documentName="certificado de primer vivienda" />
                <DocumentForm documentRequiredName="Historial crediticio" handleFunction={handleFileChange} setFunction={setCreditHistorial} documentName="historial crediticio" />
            </form>
        </div>
    );
}

export default SecondHomeForm;