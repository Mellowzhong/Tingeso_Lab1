import DocumentForm from "../../Document/Components/DocumentForm";

import PropTypes from 'prop-types';

import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices'

function SecondHomeForm({ creditId }) {
    const [, setIncomeCertificate] = useState(null);
    const [, setAppraisalCertificate] = useState(null);
    const [, setCreditHistorial] = useState(null);
    const [, setFirstHOmeCertificate] = useState(null);

    const handleFileChange = async (event, setFile, typeOfCredit) => {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
            try {
                const response = await postFile(file, typeOfCredit, creditId);
                console.log(response);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <div>
            <h1>Second Home Form</h1>
            <div className="grid">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={handleFileChange}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avaluo"
                    handleFunction={handleFileChange}
                    setFunction={setAppraisalCertificate}
                    documentName="certificado de avaluo"
                />
                <DocumentForm
                    documentRequiredName="Certificado de primera vivienda"
                    handleFunction={handleFileChange}
                    setFunction={setFirstHOmeCertificate}
                    documentName="certificado de primer vivienda"
                />
                <DocumentForm
                    documentRequiredName="Historial crediticio"
                    handleFunction={handleFileChange}
                    setFunction={setCreditHistorial}
                    documentName="historial crediticio"
                />
            </div>
        </div>
    );
}

SecondHomeForm.propTypes = {
    creditId: PropTypes.string,
};

export default SecondHomeForm;