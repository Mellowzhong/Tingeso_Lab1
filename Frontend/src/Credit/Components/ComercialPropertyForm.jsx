import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';

function ComercialPropertyForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [appraisalCertificate, setAppraisalCertificate] = useState(null);
    const [businessFinanceState, setBusinessFinanceState] = useState(null);
    const [businessPlan, setBusinessPlan] = useState(null);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (businessFinanceState) {
                await postFile(businessFinanceState, "estado financiero del negocio", creditId);
            }
            if (incomeCertificate) {
                await postFile(incomeCertificate, "comprobante de ingresos", creditId);
            }
            if (appraisalCertificate) {
                await postFile(appraisalCertificate, "certificado de avaluo", creditId);
            }
            if (businessPlan) {
                await postFile(businessPlan, "plan de negocio", creditId);
            }
            console.log("All files uploaded successfully");
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <div>
            <h1>Comercial Property Form</h1>
            <div className="grid">
                <DocumentForm
                    documentRequiredName="Estado financiero del negocio"
                    handleFunction={(event) => handleFileChange(event, setBusinessFinanceState)}
                    setFunction={setBusinessFinanceState}
                    documentName="estado financiero del negocio"
                />
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate)}
                    setFunction={setIncomeCertificate}
                    documentName="comprobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avaluo"
                    handleFunction={(event) => handleFileChange(event, setAppraisalCertificate)}
                    setFunction={setAppraisalCertificate}
                    documentName="certificado de avaluo"
                />
                <DocumentForm
                    documentRequiredName="Plan de negocio"
                    handleFunction={(event) => handleFileChange(event, setBusinessPlan)}
                    setFunction={setBusinessPlan}
                    documentName="plan de negocio"
                />
                <button type="button" onClick={handleUpload}>Upload Files</button>
            </div>
        </div>
    );
}

ComercialPropertyForm.propTypes = {
    creditId: PropTypes.string,
};

export default ComercialPropertyForm;