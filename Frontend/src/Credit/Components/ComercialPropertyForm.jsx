import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';

function ComercialPropertyForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [appraisalCertificate, setAppraisalCertificate] = useState(null);
    const [businessFinanceState, setBusinessFinanceState] = useState(null);
    const [businessPlan, setBusinessPlan] = useState(null);
    const [employment, setEmployment] = useState(null);

    const [businessFinanceStateFileLoaded, setBusinessFinanceStateFileLoaded] = useState(false);
    const [incomeCertificateFileLoaded, setIncomeCertificateFileLoaded] = useState(false);
    const [appraisalCertificateFileLoaded, setAppraisalCertificateFileLoaded] = useState(false);
    const [businessPlanFileLoaded, setBusinessPlanFileLoaded] = useState(false);
    const [employmentFileLoaded, setEmploymentFileLoaded] = useState(false);

    const [statusUploadMessage, setStatusUploadMessage] = useState(false);

    const isFormValid = businessFinanceState && incomeCertificate && appraisalCertificate && businessPlan && employment;

    const handleFileChange = (event, setFile, isFileLoadedFunction) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            isFileLoadedFunction(true);
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

            setStatusUploadMessage(true);
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
                    handleFunction={(event) => handleFileChange(event, setBusinessFinanceState, setBusinessFinanceStateFileLoaded)}
                    setFunction={setBusinessFinanceState}
                    documentName="estado_financiero_del_negocio"
                />
                {
                    businessFinanceStateFileLoaded && (
                        <span id='businessFinanceStateFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )

                }
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
                    documentRequiredName="Certificado de avalúo"
                    handleFunction={(event) => handleFileChange(event, setAppraisalCertificate, setAppraisalCertificateFileLoaded)}
                    setFunction={setAppraisalCertificate}
                    documentName="certificado_de_avaluo"
                />
                {
                    appraisalCertificateFileLoaded && (
                        <span id='appraisalCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )

                }

                <DocumentForm
                    documentRequiredName="Plan de negocio"
                    handleFunction={(event) => handleFileChange(event, setBusinessPlan, setBusinessPlanFileLoaded)}
                    setFunction={setBusinessPlan}
                    documentName="plan_de_negocio"
                />
                {
                    businessPlanFileLoaded && (
                        <span id='businessPlanFileLoaded' className="text-green-600 text-sm mt-1">
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

ComercialPropertyForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default ComercialPropertyForm;