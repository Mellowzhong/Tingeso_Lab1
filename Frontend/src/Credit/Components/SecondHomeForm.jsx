import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";

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

    const isFormValid = incomeCertificate && appraisalCertificate && creditHistorial && firstHomeCertificate && employment;

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Documentos para Segunda Vivienda</h2>
            <form className="grid gap-4">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    setFunction={setIncomeCertificate}
                    documentName="comprobante de ingresos"
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
                    documentRequiredName="Certificado de avalúo"
                    setFunction={setAppraisalCertificate}
                    documentName="certificado de avaluo"
                    isFileLoadedFunction={setAppraisalCertificateFileLoaded}
                    creditId={creditId}
                />
                {
                    appraisalCertificateFileLoaded && (
                        <span id='appraisalCertificateFileLoaded' className="text-green-600 text-sm mt-1 mx-auto">
                            Archivo cargado correctamente
                        </span>
                    )

                }
                <DocumentForm
                    documentRequiredName="Certificado de primera vivienda"
                    setFunction={setFirstHomeCertificate}
                    documentName="certificado de primer vivienda"
                    isFileLoadedFunction={setFirstHomeCertificateFileLoaded}
                    creditId={creditId}
                />
                {
                    firstHomeCertificateFileLoaded && (
                        <span id='firstHomeCertificateFileLoaded' className="text-green-600 text-sm mt-1 mx-auto">
                            Archivo cargado correctamente
                        </span>
                    )
                }
                <DocumentForm
                    documentRequiredName="Historial crediticio"
                    setFunction={setCreditHistorial}
                    documentName="historial crediticio"
                    isFileLoadedFunction={setCreditHistorialFileLoaded}
                    creditId={creditId}
                />
                {
                    creditHistorialFileLoaded && (
                        <span id='creditHistorialFileLoaded' className="text-green-600 text-sm mt-1 mx-auto">
                            Archivo cargado correctamente
                        </span>
                    )
                }
                <DocumentForm
                    documentRequiredName="Laboral"
                    setFunction={setEmployment}
                    documentName="Laboral"
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

SecondHomeForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default SecondHomeForm;