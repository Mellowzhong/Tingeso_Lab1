import PropTypes from 'prop-types';

function EvaluationResultForm({ evaluationResult, setEvaluationResult }) {
    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <label htmlFor="evaluationResult" className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold">Resultado de la Evaluación</h2>
                <input
                    type="checkbox"
                    name="evaluationResult"
                    id="evaluationResult"
                    checked={evaluationResult}
                    onChange={() => setEvaluationResult(!evaluationResult)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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