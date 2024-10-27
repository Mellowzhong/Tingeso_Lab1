import PropTypes from 'prop-types';

function EvaluationResultForm({ evaluationResult, setEvaluationResult }) {
    return (
        <div className='grid border-2 m-4'>
            <label htmlFor="evaluationResult">
                <h2>Resultado de la evaluación</h2>
                <input type="checkbox"
                    name="evaluationResult"
                    id="evaluationResult"
                    checked={evaluationResult}
                    onChange={() => setEvaluationResult(!evaluationResult)}
                />
            </label>
        </div>
    );
}

EvaluationResultForm.propTypes = {
    evaluationResult: PropTypes.bool.isRequired,
    setEvaluationResult: PropTypes.func.isRequired,
};

export default EvaluationResultForm;