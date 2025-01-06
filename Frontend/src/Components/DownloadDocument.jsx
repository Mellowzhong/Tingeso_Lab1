import PropTypes from 'prop-types';
import { useState } from 'react';
import { downloadDocument } from "../Document/Services/DocumentServices";

function DownloadDocument({ document }) {
    const [downloadDocumentMessage, setDownloadDocumentMessage] = useState("");
    // Handle document request submission

    const documentHandleSubmit = async (e, documentId, fileName) => {
        e.preventDefault();
        try {
            await downloadDocument(documentId, fileName);
            setDownloadDocumentMessage("Documento solicitado correctamente");
        }
        catch {
            setDownloadDocumentMessage("Error al solicitar documento");
        }
    };
    return (
        <form
            key={document.id}
            onSubmit={(e) => documentHandleSubmit(e, document.id, document.documentName)}
            className="m-4 text-center"
        >
            <div className="my-2 border-2 p-2 rounded-xl bg-white">
                <span>
                    <strong> Nombre del documento</strong>
                    <p className="my-2"> {document.documentName}</p>
                </span>
                <span>
                    <strong> Tipo de documento</strong>
                    <p className="my-2">{document.documentType}</p>
                </span>
            </div>

            {downloadDocumentMessage ? <p className="text-center">{downloadDocumentMessage}</p> : ""}

            <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-2">
                Solicitar Documento
            </button>
        </form>
    )
}

DownloadDocument.propTypes = {
    document: PropTypes.object.isRequired,
};

export default DownloadDocument;