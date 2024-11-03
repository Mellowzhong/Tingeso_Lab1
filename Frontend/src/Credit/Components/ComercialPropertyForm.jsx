import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';
import { postFinanceEvaluation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';

function ComercialPropertyForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [appraisalCertificate, setAppraisalCertificate] = useState(null);
    const [businessFinanceState, setBusinessFinanceState] = useState(null);
    const [businessPlan, setBusinessPlan] = useState(null);
    const [employment, setEmployment] = useState(null);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (businessFinanceState) await postFile(businessFinanceState, "estado financiero del negocio", creditId);
            if (incomeCertificate) await postFile(incomeCertificate, "comprobante de ingresos", creditId);
            if (appraisalCertificate) await postFile(appraisalCertificate, "certificado de avaluo", creditId);
            if (businessPlan) await postFile(businessPlan, "plan de negocio", creditId);
            if (employment) await postFile(employment, "laboral", creditId);

            alert("All files uploaded successfully");

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
        } catch {
            alert("Error al subir los archivos");
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Documentos para Propiedad Comercial</h2>
            <form className="grid gap-4">
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
                    documentRequiredName="Certificado de avalúo"
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

ComercialPropertyForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default ComercialPropertyForm;