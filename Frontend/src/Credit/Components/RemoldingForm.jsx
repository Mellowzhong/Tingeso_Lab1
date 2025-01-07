import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";

function RemoldingForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [updateAppraisalCertificate, setUpdateAppraisalCertificate] = useState(null);
    const [remodelingAmount, setRemodelingAmount] = useState(null);
    const [employment, setEmployment] = useState(null);

    const [incomeCertificateFileLoaded, setIncomeCertificateFileLoaded] = useState(false);
    const [updateAppraisalCertificateFileLoaded, setUpdateAppraisalCertificateFileLoaded] = useState(false);
    const [remodelingAmountFileLoaded, setRemodelingAmountFileLoaded] = useState(false);
    const [employmentFileLoaded, setEmploymentFileLoaded] = useState(false);

    const isFormValid = incomeCertificate && updateAppraisalCertificate && remodelingAmount && employment;

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Documentos para Remodelación</h2>

            <form className="grid gap-4">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    setFunction={setIncomeCertificate}
                    documentName="comprobante_de_ingresos"
                    isFileLoadedFunction={setIncomeCertificateFileLoaded}
                    creditId={creditId}
                />
                {
                    incomeCertificateFileLoaded && (
                        <span id='incomeCertificateFileLoaded' className="text-green-600 text-sm mt-1 mx-auto">
                            Archivo cargado correctamente
                        </span>
                    )

                }
                <DocumentForm
                    documentRequiredName="Presupuesto de remodelación"
                    setFunction={setRemodelingAmount}
                    documentName="presupuesto_de_remodelacion"
                    isFileLoadedFunction={setRemodelingAmountFileLoaded}
                    creditId={creditId}
                />
                {
                    remodelingAmountFileLoaded && (
                        <span id='remodelingAmountFileLoaded' className="text-green-600 text-sm mt-1 mx-auto">
                            Archivo cargado correctamente
                        </span>
                    )
                }

                <DocumentForm
                    documentRequiredName="Certificado de avalúo actualizado"
                    setFunction={setUpdateAppraisalCertificate}
                    documentName="certificado_de_avaluo_actualizado"
                    isFileLoadedFunction={setUpdateAppraisalCertificateFileLoaded}
                    creditId={creditId}
                />
                {
                    updateAppraisalCertificateFileLoaded && (
                        <span id='updateAppraisalCertificateFileLoaded' className="text-green-600 text-sm mt-1 mx-auto">
                            Archivo cargado correctamente
                        </span>
                    )
                }

                <DocumentForm
                    documentRequiredName="Laboral"
                    setFunction={setEmployment}
                    documentName="laboral"
                    isFileLoadedFunction={setEmploymentFileLoaded}
                    creditId={creditId}
                />

                {
                    employmentFileLoaded && (
                        <span id='employmentFileLoaded' className="text-green-600 text-sm mt-1 mx-auto">
                            Archivo cargado correctamente
                        </span>
                    )
                }
                {isFormValid ? <span id="uploadFilesText" className="text-sm flex justify-center font-bold">Todos los archivos se han subido correctamente</span> : <span className="text-sm flex justify-center font-bold">Aun no se suben los archivos</span>}
                {isFormValid ? <span className="mx-auto">Puede seguir a la seccion de ejecutivo</span> : ""}
            </form>
        </div>
    );
}

RemoldingForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default RemoldingForm;