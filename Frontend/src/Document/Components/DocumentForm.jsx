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
        <>
            <label className='grid' htmlFor={documentName}>
                {documentRequiredName}
                <input
                    type="file"
                    id={documentName}
                    name={documentName}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </label>
            {docuemntIdExist && (
                <button
                    onClick={(e) => deleteDocumentFunction(e)}
                    className='bg-indigo-600 text-white hover:bg-indigo-700 rounded-md py-2 w-1/2 mx-auto'
                >
                    Deshacer
                </button>
            )}
        </>
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