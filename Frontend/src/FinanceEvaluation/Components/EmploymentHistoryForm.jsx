import PropTypes from 'prop-types';

function EmpoymentHistoryForm({ employmentHistory, setEmploymentHistory }) {
    return (
        <div className='grid border-2 m-4'>
            <label htmlFor="employmentHistory">
                <h2>Historial laboral</h2>
                <input type="checkbox"
                    name="employmentHistory"
                    id="employmentHistory"
                    checked={employmentHistory}
                    onChange={() => setEmploymentHistory(!employmentHistory)}
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