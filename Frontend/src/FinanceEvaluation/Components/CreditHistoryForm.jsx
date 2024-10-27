import PropTypes from 'prop-types';

function CreditHistoryForm({ creditHistory, setCreditHistory }) {
    return (
        <div className='grid border-2 m-4'>
            <label htmlFor="creditHistory">
                <h2>Historial crediticio</h2>
                <input type="checkbox"
                    name="creditHistory"
                    id="creditHistory"
                    checked={creditHistory}
                    onChange={() => setCreditHistory(!creditHistory)}
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