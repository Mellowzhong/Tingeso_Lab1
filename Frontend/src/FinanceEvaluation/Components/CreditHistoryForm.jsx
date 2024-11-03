import PropTypes from 'prop-types';

function CreditHistoryForm({ creditHistory, setCreditHistory }) {
    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <label htmlFor="creditHistory" className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold">Historial crediticio</h2>
                <input
                    type="checkbox"
                    name="creditHistory"
                    id="creditHistory"
                    checked={creditHistory}
                    onChange={() => setCreditHistory(!creditHistory)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
            </label>
        </div>
    );
}

CreditHistoryForm.propTypes = {
    creditHistory: PropTypes.bool.isRequired,
    setCreditHistory: PropTypes.func.isRequired,
};

export default CreditHistoryForm;