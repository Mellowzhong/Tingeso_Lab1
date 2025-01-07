import DocumentForm from "../../Document/Components/DocumentForm";
import { useState } from "react";
import PropTypes from 'prop-types';

function FirstHomeForm({ creditId }) {
    // Convertirlos en verificadores
    const [incomeCertificate, setIncomeCertificate] = useState(false);
    const [appraisalCertificate, setAppraisalCertificate] = useState(false);
    const [creditHistorial, setCreditHistorial] = useState(false);
    const [employment, setEmployment] = useState(false);

    const [incomeCertificateFileLoaded, setIncomeCertificateFileLoaded] = useState(false);
    const [appraisalCertificateFileLoaded, setAppraisalCertificateFileLoaded] = useState(false);
    const [creditHistorialFileLoaded, setCreditHistorialFileLoaded] = useState(false);
    const [employmentFileLoaded, setEmploymentFileLoaded] = useState(false);

    const isFormValid = incomeCertificate && appraisalCertificate && creditHistorial && employment;

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Documentos para Primera Vivienda</h2>
            <p>Haga click fuera del bloque para que se cargue el archivo</p>
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
                        <span id='incomeCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )

                }
                <DocumentForm
                    documentRequiredName="Certificado de avalúo"
                    setFunction={setAppraisalCertificate}
                    documentName="certificado_de_avaluo"
                    isFileLoadedFunction={setAppraisalCertificateFileLoaded}
                    creditId={creditId}
                />
                {
                    appraisalCertificateFileLoaded && (
                        <span id='appraisalCertificateFileLoaded' className="text-green-600 text-sm mt-1">
                            Archivo cargado correctamente
                        </span>
                    )

                }
                <DocumentForm
                    documentRequiredName="Historial crediticio"
                    setFunction={setCreditHistorial}
                    documentName="historial_crediticio"
                    isFileLoadedFunction={setCreditHistorialFileLoaded}
                    creditId={creditId}
                />
                {
                    creditHistorialFileLoaded && (
                        <span id='creditHistorialFileLoaded' className="text-green-600 text-sm mt-1">
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
                        <span id='employmentFileLoaded' className="text-green-600 text-sm mt-1">
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

FirstHomeForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default FirstHomeForm;