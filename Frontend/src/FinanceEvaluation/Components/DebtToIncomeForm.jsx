import PropTypes from 'prop-types';

function DebtToIncomeForm({ debtToIncomeRatio, setDebtToIncomeRatio }) {
    return (
        <div className='grid border-2 m-4'>
            <label htmlFor="debtToIncomeRatio">
                <h2>Relación deuda-ingresos</h2>
                <input
                    type="checkbox"
                    name="debtToIncomeRatio"
                    id="debtToIncomeRatio"
                    checked={debtToIncomeRatio}
                    onChange={() => setDebtToIncomeRatio(!debtToIncomeRatio)}
                />
            </label>
        </div>
    );
}

DebtToIncomeForm.propTypes = {
    debtToIncomeRatio: PropTypes.bool.isRequired,
    setDebtToIncomeRatio: PropTypes.func.isRequired,
};

export default DebtToIncomeForm;