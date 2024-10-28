import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';
import { postFinanceEvaluation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';

function RemoldingForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [updateAppraisalCertificate, setUpdateAppraisalCertificate] = useState(null);
    const [remodelingAmount, setRemodelingAmount] = useState(null);
    const [employment, setEmployment] = useState(null);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file); // Store the file object
        }
    };

    const handleUpload = async () => {
        try {
            if (incomeCertificate) {
                await postFile(incomeCertificate, "comrpobante de ingresos", creditId);
            }
            if (remodelingAmount) {
                await postFile(remodelingAmount, "presupuesto de remodelacion", creditId);
            }
            if (updateAppraisalCertificate) {
                await postFile(updateAppraisalCertificate, "certificado de avaluo actualizado", creditId);
            }
            if (employment) {
                await postFile(employment, "laboral", creditId);
            }
            console.log("All files uploaded successfully");
            const financeEvaluationData = {
                feeToIncomeRatio: false,
                creditHistory: false,
                employmentHistory: false,
                debtToIncomeRatio: false,
                financeMaxAmount: false,
                applicantAge: false,
                savingCapacity: false,
                evaluationResult: false
            };
            await postFinanceEvaluation(creditId, financeEvaluationData);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <div>
            <h1>Remodeling Form</h1>
            <div className="grid">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate)}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Presupuesto de remodelacion"
                    handleFunction={(event) => handleFileChange(event, setRemodelingAmount)}
                    setFunction={setRemodelingAmount}
                    documentName="presupuesto de remodelacion"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avaluo actualizado"
                    handleFunction={(event) => handleFileChange(event, setUpdateAppraisalCertificate)}
                    setFunction={setUpdateAppraisalCertificate}
                    documentName="certificado de avaluo actualizado"
                />
                <DocumentForm
                    documentRequiredName="Laboral"
                    handleFunction={(event) => handleFileChange(event, setEmployment)}
                    setFunction={setEmployment}
                    documentName="Laboral"
                />
                <button type="button" onClick={handleUpload}>Upload Files</button>
            </div>
        </div>
    );
}

RemoldingForm.propTypes = {
    creditId: PropTypes.string,
};

export default RemoldingForm;