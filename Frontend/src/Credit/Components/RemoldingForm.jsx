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
            setFile(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (incomeCertificate) await postFile(incomeCertificate, "comrpobante de ingresos", creditId);
            if (remodelingAmount) await postFile(remodelingAmount, "presupuesto de remodelacion", creditId);
            if (updateAppraisalCertificate) await postFile(updateAppraisalCertificate, "certificado de avaluo actualizado", creditId);
            if (employment) await postFile(employment, "laboral", creditId);

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
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Documentos para Remodelación</h2>
            <form className="grid gap-4">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate)}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Presupuesto de remodelación"
                    handleFunction={(event) => handleFileChange(event, setRemodelingAmount)}
                    setFunction={setRemodelingAmount}
                    documentName="presupuesto de remodelacion"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avalúo actualizado"
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
                <button type="button" onClick={handleUpload} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                    Subir Archivos
                </button>
            </form>
        </div>
    );
}

RemoldingForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default RemoldingForm;