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

    const [incomeCertificateFileLoaded, setIncomeCertificateFileLoaded] = useState(false);
    const [appraisalCertificateFileLoaded, setAppraisalCertificateFileLoaded] = useState(false);
    const [creditHistorialFileLoaded, setCreditHistorialFileLoaded] = useState(false);
    const [firstHomeCertificateFileLoaded, setFirstHomeCertificateFileLoaded] = useState(false);
    const [employmentFileLoaded, setEmploymentFileLoaded] = useState(false);

    const [statusUploadMessage, setStatusUploadMessage] = useState(false);

    const isFormValid = incomeCertificate && appraisalCertificate && creditHistorial && firstHomeCertificate && employment;

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
            if (appraisalCertificate) await postFile(appraisalCertificate, "certificado de avaluo", creditId);
            if (firstHomeCertificate) await postFile(firstHomeCertificate, "certificado de primer vivienda", creditId);
            if (creditHistorial) await postFile(creditHistorial, "historial crediticio", creditId);
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
            <h2 className="text-xl font-semibold mb-4">Documentos para Segunda Vivienda</h2>

            <form className="grid gap-4">
                <div id="secondHomeIncomeCertificate">
                    <DocumentForm
                        documentRequiredName="Comprobante de ingresos"
                        handleFunction={(event) => handleFileChange(event, setIncomeCertificate, setIncomeCertificateFileLoaded)}
                        setFunction={setIncomeCertificate}
                        documentName="comprobante de ingresos"
                    />
                    {
                        incomeCertificateFileLoaded && (
                            <span id='incomeCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                                Archivo cargado correctamente
                            </span>
                        )

                    }
                </div>
                <div id="secondHomeAppraisalCertificate">
                    <DocumentForm
                        documentRequiredName="Certificado de avalúo"
                        handleFunction={(event) => handleFileChange(event, setAppraisalCertificate, setAppraisalCertificateFileLoaded)}
                        setFunction={setAppraisalCertificate}
                        documentName="certificado de avaluo"
                    />
                    {
                        appraisalCertificateFileLoaded && (
                            <span id='appraisalCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                                Archivo cargado correctamente
                            </span>
                        )

                    }
                </div>
                <div id="secondHomeFirstHomeCertificate">
                    <DocumentForm
                        documentRequiredName="Certificado de primera vivienda"
                        handleFunction={(event) => handleFileChange(event, setFirstHomeCertificate, setFirstHomeCertificateFileLoaded)}
                        setFunction={setFirstHomeCertificate}
                        documentName="certificado de primer vivienda"
                    />
                    {
                        firstHomeCertificateFileLoaded && (
                            <span id='firstHomeCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                                Archivo cargado correctamente
                            </span>
                        )
                    }
                </div>
                <div id="secondHomeCreditHistorial">
                    <DocumentForm
                        documentRequiredName="Historial crediticio"
                        handleFunction={(event) => handleFileChange(event, setCreditHistorial, setCreditHistorialFileLoaded)}
                        setFunction={setCreditHistorial}
                        documentName="historial crediticio"
                    />
                    {
                        creditHistorialFileLoaded && (
                            <span id='creditHistorialFileLoaded' className="text-green-600 text-sm mt-1">
                                Archivo cargado correctamente
                            </span>
                        )
                    }
                </div>
                <div id="secondHomeEmployment">
                    <DocumentForm
                        documentRequiredName="Laboral"
                        handleFunction={(event) => handleFileChange(event, setEmployment, setEmploymentFileLoaded)}
                        setFunction={setEmployment}
                        documentName="Laboral"
                    />
                    {
                        employmentFileLoaded && (
                            <span id='employmentFileLoaded' className="text-green-600 text-sm mt-1">
                                Archivo cargado correctamente
                            </span>
                        )
                    }
                </div>
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

SecondHomeForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default SecondHomeForm;