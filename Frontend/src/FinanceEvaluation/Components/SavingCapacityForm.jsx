import PropTypes from 'prop-types';

function SavingCapacityForm({ savingCapacity, setSavingCapacity }) {
    return (
        <div className='grid border-2 m-4'>
            <label htmlFor="savingCapacity">
                <h2>Capacidad de ahorro</h2>
                <input type="checkbox"
                    name="savingCapacity"
                    id="savingCapacity"
                    checked={savingCapacity}
                    onChange={() => setSavingCapacity(!savingCapacity)}
                />
            </label>
        </div>
    );
}

SavingCapacityForm.propTypes = {
    savingCapacity: PropTypes.bool.isRequired,
    setSavingCapacity: PropTypes.func.isRequired,
};

export default SavingCapacityForm;