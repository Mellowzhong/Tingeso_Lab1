import DocumentForm from "../../Document/Components/DocumentForm";
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';
import { postFinanceEvaluation } from "../../FinanceEvaluation/Services/FinanceEvaluationService";

import PropTypes from 'prop-types';

function FirstHomeForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [appraisalCertificate, setAppraisalCertificate] = useState(null);
    const [creditHistorial, setCreditHistorial] = useState(null);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (incomeCertificate) {
                await postFile(incomeCertificate, "comrpobante de ingresos", creditId);
            }
            if (appraisalCertificate) {
                await postFile(appraisalCertificate, "certificado de avaluo", creditId);
            }
            if (creditHistorial) {
                await postFile(creditHistorial, "historial crediticio", creditId);
            }
            console.log("All files uploaded successfully");
            const financeEvaluationData = { debtToIncomeRatio: false, creditHistory: false, employmentHistory: false, savingCapacity: false, evaluationResult: false };
            await postFinanceEvaluation(creditId, financeEvaluationData);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <div>
            <h1>First Home Form</h1>
            <form className="grid">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate)}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avalúo"
                    handleFunction={(event) => handleFileChange(event, setAppraisalCertificate)}
                    setFunction={setAppraisalCertificate}
                    documentName="certificado de avaluo"
                />
                <DocumentForm
                    documentRequiredName="Historial crediticio"
                    handleFunction={(event) => handleFileChange(event, setCreditHistorial)}
                    setFunction={setCreditHistorial}
                    documentName="historial crediticio"
                />
                <button type="button" onClick={handleUpload}>Upload Files</button>
            </form>
        </div>
    );
}

FirstHomeForm.propTypes = {
    creditId: PropTypes.string,
};

export default FirstHomeForm;