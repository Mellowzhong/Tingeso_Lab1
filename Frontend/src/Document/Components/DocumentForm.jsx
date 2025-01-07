import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { postFile, deleteDocument } from '../../Document/Services/DocumentServices';

function DocumentForm({ documentRequiredName, setFunction, documentName, creditId, isFileLoadedFunction }) {
    const [docuemntIdExist, setDocuemntIdExist] = useState(false);
    const [documentId, setDocumentId] = useState(null);
    const fileInputRef = useRef(null);

    const deleteDocumentFunction = async (e) => {
        e.preventDefault();
        const { data } = await deleteDocument(documentId);
        console.log(data);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setDocuemntIdExist(false);
        setDocumentId(null);
        isFileLoadedFunction(false);
        setFunction(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFunction(true);
            const { data } = await postFile(file, "comprobante_de_ingresos", creditId);
            setDocumentId(data);
            isFileLoadedFunction(true);
            setDocuemntIdExist(true);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <label htmlFor={documentName} className="block text-sm font-medium text-gray-700 text-center">
                {documentRequiredName}
                <div className="mt-2 relative">
                    <input
                        type="file"
                        id={documentName}
                        name={documentName}
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
            </label>
            {docuemntIdExist && (
                <button
                    onClick={(e) => deleteDocumentFunction(e)}
                    className="bg-red-600 text-white hover:bg-red-700 rounded-md py-2 px-4"
                >
                    Deshacer
                </button>
            )}
        </div>
    );
}

DocumentForm.propTypes = {
    setFunction: PropTypes.func.isRequired,
    documentName: PropTypes.string.isRequired,
    documentRequiredName: PropTypes.string.isRequired,
    creditId: PropTypes.string.isRequired,
    isFileLoadedFunction: PropTypes.func.isRequired,
};

export default DocumentForm;
