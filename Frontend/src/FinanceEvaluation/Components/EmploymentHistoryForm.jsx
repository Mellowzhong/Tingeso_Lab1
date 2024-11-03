import PropTypes from 'prop-types';

function EmpoymentHistoryForm({ employmentHistory, setEmploymentHistory }) {
    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <label htmlFor="employmentHistory" className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold">Historial Laboral</h2>
                <input
                    type="checkbox"
                    name="employmentHistory"
                    id="employmentHistory"
                    checked={employmentHistory}
                    onChange={() => setEmploymentHistory(!employmentHistory)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
            </label>
        </div>
    );
}

EmpoymentHistoryForm.propTypes = {
    employmentHistory: PropTypes.bool.isRequired,
    setEmploymentHistory: PropTypes.func.isRequired,
};

export default EmpoymentHistoryForm;