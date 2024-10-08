import { useState } from "react";
import { postSimulation } from '../Services/SimulationService';

function SimulationFirstHomeForm() {
    const [, setIncomeCertificate] = useState(null);
    const [, setAppraisalCertificate] = useState(null);
    const [, setCreditHistorial] = useState(null);

    const handleFileChange = async (event, setFile, typeOfCredit) => {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file)); // Para la vista previa
            const docValue = typeOfCredit; // Obtén este valor de donde sea necesario
            try {
                const response = await postSimulation(file, docValue);
                console.log(response); // Muestra la respuesta del servidor
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <div>
            <h1>Simulation First Home Form</h1>
            {/* <span>3 documentos: Comprobante de ingresos - Certificado de avaluo - Historial crediticio  </span> */}
            <form>
                <label htmlFor="incomeCertificate">Comprobante de ingresos
                    <input
                        type="file"
                        id="incomeCertificate"
                        name="incomeCertificate"
                        onChange={(e) => handleFileChange(e, setIncomeCertificate, "comrpobante de ingresos")}
                    />
                </label>
                <label htmlFor="appraisalCertificate">Certificado de avaluo
                    <input
                        type="file"
                        id="appraisalCertificate"
                        name="appraisalCertificate"
                        onChange={(e) => handleFileChange(e, setAppraisalCertificate, "certificado de avaluo")}
                    />
                </label>
                <label htmlFor="creditHistorial">Historial crediticio
                    <input
                        type="file"
                        id="creditHistorial"
                        name="creditHistorial"
                        onChange={(e) => handleFileChange(e, setCreditHistorial, "historial crediticio")}
                    />
                </label>
                <button>Mandar</button>
            </form>
        </div>
    );
}

export default SimulationFirstHomeForm;