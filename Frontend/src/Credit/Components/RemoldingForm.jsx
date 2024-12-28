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

    const [incomeCertificateFileLoaded, setIncomeCertificateFileLoaded] = useState(false);
    const [updateAppraisalCertificateFileLoaded, setUpdateAppraisalCertificateFileLoaded] = useState(false);
    const [remodelingAmountFileLoaded, setRemodelingAmountFileLoaded] = useState(false);
    const [employmentFileLoaded, setEmploymentFileLoaded] = useState(false);

    const [statusUploadMessage, setStatusUploadMessage] = useState(false);

    const isFormValid = incomeCertificate && updateAppraisalCertificate && remodelingAmount && employment;


    const handleFileChange = (event, setFile, isFileLoadedFunction) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            isFileLoadedFunction(true);
        }
    };

    const handleUpload = async () => {
        try {
            if (incomeCertificate) await postFile(incomeCertificate, "comprobante de ingresos", creditId);
            if (remodelingAmount) await postFile(remodelingAmount, "presupuesto de remodelacion", creditId);
            if (updateAppraisalCertificate) await postFile(updateAppraisalCertificate, "certificado de avaluo actualizado", creditId);
            if (employment) await postFile(employment, "laboral", creditId);

            alert("All files uploaded successfully");

            // Datos de evaluación financiera
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
            setStatusUploadMessage(true);
        } catch {
            alert("Error al subir los archivos");
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Documentos para Remodelación</h2>

            <form className="grid gap-4">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate, setIncomeCertificateFileLoaded)}
                    setFunction={setIncomeCertificate}
                    documentName="comprobante_de_ingresos"
                />
                {
                    incomeCertificateFileLoaded && (
                        <span id='incomeCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )

                }
                <DocumentForm
                    documentRequiredName="Presupuesto de remodelación"
                    handleFunction={(event) => handleFileChange(event, setRemodelingAmount, setRemodelingAmountFileLoaded)}
                    setFunction={setRemodelingAmount}
                    documentName="presupuesto_de_remodelacion"
                />
                {
                    remodelingAmountFileLoaded && (
                        <span id='remodelingAmountFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )
                }

                <DocumentForm
                    documentRequiredName="Certificado de avalúo actualizado"
                    handleFunction={(event) => handleFileChange(event, setUpdateAppraisalCertificate, setUpdateAppraisalCertificateFileLoaded)}
                    setFunction={setUpdateAppraisalCertificate}
                    documentName="certificado_de_avaluo_actualizado"
                />
                {
                    updateAppraisalCertificateFileLoaded && (
                        <span id='updateAppraisalCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )
                }

                <DocumentForm
                    documentRequiredName="Laboral"
                    handleFunction={(event) => handleFileChange(event, setEmployment, setEmploymentFileLoaded)}
                    setFunction={setEmployment}
                    documentName="laboral"
                />

                {
                    employmentFileLoaded && (
                        <span id='employmentFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )
                }

                {/* Botón deshabilitado mientras se suben los archivos */}
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!isFormValid} // Deshabilitar si alguna validación es falsa o algún campo está vacío
                    className={`w-full py-2 px-4 rounded-md ${isFormValid
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                >
                </button>
                {statusUploadMessage && <span id="uploadFilesText" className="text-sm flex justify-center font-bold">Todos los archivos se han subido correctamente</span>}
            </form>
        </div>
    );
}

RemoldingForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default RemoldingForm;