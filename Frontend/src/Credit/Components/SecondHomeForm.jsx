import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';
import { postFinanceEvaluation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';

function SecondHomeForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [appraisalCertificate, setAppraisalCertificate] = useState(null);
    const [creditHistorial, setCreditHistorial] = useState(null);
    const [firstHomeCertificate, setFirstHomeCertificate] = useState(null);
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
            if (appraisalCertificate) await postFile(appraisalCertificate, "certificado de avaluo", creditId);
            if (firstHomeCertificate) await postFile(firstHomeCertificate, "certificado de primer vivienda", creditId);
            if (creditHistorial) await postFile(creditHistorial, "historial crediticio", creditId);
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
            <h2 className="text-xl font-semibold mb-4">Documentos para Segunda Vivienda</h2>
            <form className="grid gap-4">
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
                    documentRequiredName="Certificado de primera vivienda"
                    handleFunction={(event) => handleFileChange(event, setFirstHomeCertificate)}
                    setFunction={setFirstHomeCertificate}
                    documentName="certificado de primer vivienda"
                />
                <DocumentForm
                    documentRequiredName="Historial crediticio"
                    handleFunction={(event) => handleFileChange(event, setCreditHistorial)}
                    setFunction={setCreditHistorial}
                    documentName="historial crediticio"
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

SecondHomeForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default SecondHomeForm;