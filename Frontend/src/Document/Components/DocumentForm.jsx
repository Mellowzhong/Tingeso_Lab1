import PropTypes from 'prop-types';

function DocumentForm({ handleFunction, setFunction, documentName, documentRequiredName }) {
    return (
        <label className='grid' htmlFor={documentName}>{documentRequiredName}
            <input
                type="file"
                id={documentName}
                name={documentName}
                onBlur={(e) =>
                    handleFunction(e, setFunction)
                }
            />
        </label>
    )
}

DocumentForm.propTypes = {
    handleFunction: PropTypes.func.isRequired,
    setFunction: PropTypes.func.isRequired,
    documentName: PropTypes.string.isRequired,
    documentRequiredName: PropTypes.string.isRequired,
    // isFileLoadedFunction: PropTypes.func.isRequired
}

export default DocumentForm;