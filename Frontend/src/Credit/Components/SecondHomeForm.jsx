import DocumentForm from "../../Document/Components/DocumentForm";
import PropTypes from 'prop-types';
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';

function SecondHomeForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [appraisalCertificate, setAppraisalCertificate] = useState(null);
    const [creditHistorial, setCreditHistorial] = useState(null);
    const [firstHomeCertificate, setFirstHomeCertificate] = useState(null);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (incomeCertificate) {
                await postFile(incomeCertificate, "comrpobante de ingresos", creditId);
            }
            if (appraisalCertificate) {
                await postFile(appraisalCertificate, "certificado de avaluo", creditId);
            }
            if (firstHomeCertificate) {
                await postFile(firstHomeCertificate, "certificado de primer vivienda", creditId);
            }
            if (creditHistorial) {
                await postFile(creditHistorial, "historial crediticio", creditId);
            }
            console.log("All files uploaded successfully");
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <div>
            <h1>Second Home Form</h1>
            <div className="grid">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate)}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avaluo"
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
                <button type="button" onClick={handleUpload}>Upload Files</button>
            </div>
        </div>
    );
}

SecondHomeForm.propTypes = {
    creditId: PropTypes.string,
};

export default SecondHomeForm;