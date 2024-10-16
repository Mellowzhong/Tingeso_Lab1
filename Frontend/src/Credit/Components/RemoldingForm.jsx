import DocumentForm from "../../Document/Components/DocumentForm";

import PropTypes from 'prop-types';

import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices'

function RemoldingForm({ creditId }) {
    const [, setIncomeCertificate] = useState(null);
    const [, setUpdateAppraisalCertificate] = useState(null);
    const [, setRemodelingAmount] = useState(null);

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
            <h1>Remodeling form</h1>
            <div className="grid">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={handleFileChange}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Presupuesto de remodelacion"
                    handleFunction={handleFileChange}
                    setFunction={setRemodelingAmount}
                    documentName="presupuesto de remodelacion"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avaluo actualizado"
                    handleFunction={handleFileChange}
                    setFunction={setUpdateAppraisalCertificate}
                    documentName="certificado de avaluo actualizado"
                />
            </div>
        </div>
    );
}

RemoldingForm.propTypes = {
    creditId: PropTypes.string,
};

export default RemoldingForm;