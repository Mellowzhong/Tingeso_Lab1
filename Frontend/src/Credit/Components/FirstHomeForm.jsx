import DocumentForm from "../../Document/Components/DocumentForm";
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';
import PropTypes from 'prop-types';

function FirstHomeForm({ creditId }) {
    const [, setIncomeCertificate] = useState(null);
    const [, setAppraisalCertificate] = useState(null);
    const [, setCreditHistorial] = useState(null);

    const handleFileChange = async (event, setFile, typeOfCredit) => {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
            try {
                const response = await postFile(file, typeOfCredit, creditId);
                console.log(response);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <div>
            <h1>First Home Form</h1>
            <div className="grid">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate, "comrpobante de ingresos")}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avalúo"
                    handleFunction={(event) => handleFileChange(event, setAppraisalCertificate, "certificado de avaluo")}
                    setFunction={setAppraisalCertificate}
                    documentName="certificado de avaluo"
                />
                <DocumentForm
                    documentRequiredName="Historial crediticio"
                    handleFunction={(event) => handleFileChange(event, setCreditHistorial, "historial crediticio")}
                    setFunction={setCreditHistorial}
                    documentName="historial crediticio"
                />
            </div>
        </div>
    );
}

FirstHomeForm.propTypes = {
    creditId: PropTypes.string,
};

export default FirstHomeForm;
