import DocumentForm from "../../Document/Components/DocumentForm";

import PropTypes from 'prop-types';

import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices'

function ComercialPropertyForm({ creditId }) {
    const [, setIncomeCertificate] = useState(null);
    const [, setAppraisalCertificate] = useState(null);
    const [, setBusinessFinanceState] = useState(null);
    const [, setBusinessPlan] = useState(null);

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
            <h1>Comercial Property Form</h1>
            <div className="grid">
                <DocumentForm
                    documentRequiredName="Estado financiero del negocio"
                    handleFunction={handleFileChange}
                    setFunction={setBusinessFinanceState}
                    documentName="estado financiero del negocio"
                />
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={handleFileChange}
                    setFunction={setIncomeCertificate}
                    documentName="comprobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avaluo"
                    handleFunction={handleFileChange}
                    setFunction={setAppraisalCertificate}
                    documentName="certificado de avaluo"
                />
                <DocumentForm
                    documentRequiredName="Plan de negocio"
                    handleFunction={handleFileChange}
                    setFunction={setBusinessPlan}
                    documentName="plan de negocio"
                />
            </div>
        </div>
    );
}

ComercialPropertyForm.propTypes = {
    creditId: PropTypes.string,
};

export default ComercialPropertyForm;