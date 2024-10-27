import PropTypes from 'prop-types';
import { useState } from 'react';

export default function DebtForm({ handleGradeChange }) {
    const [debt, setDebt] = useState(0);

    return (
        <div>
            <div>
                <label htmlFor="nota" className="grid">
                    <h2 className="m-auto">Deuda</h2>
                    <input
                        className="rounded-md border-2"
                        type="number"
                        name="nota"
                        id="nota"
                        onChange={(e) => setDebt(parseInt(e.target.value))}
                    />
                    <button onClick={() => handleGradeChange(debt)} type='button'>confirmar</button>
                </label>
            </div>
        </div>
    );
}

DebtForm.propTypes = {
    handleGradeChange: PropTypes.func.isRequired,
};