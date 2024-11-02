import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CalculateRecentWithdrawalsForm({ balance, setSavingCapacityRecentWithdrawals }) {
    const [withdrawal, setWithdrawal] = useState(0);
    const [message, setMessage] = useState('No válido'); // Estado inicial como "No válido"

    const handleGradeChange = (withdrawal) => {
        const newBalance = balance * 0.3;

        if (newBalance >= withdrawal) {
            setSavingCapacityRecentWithdrawals(true); // Si es válido, cambiar el estado
            setMessage('Válido');
        } else {
            setSavingCapacityRecentWithdrawals(false); // Si no es válido, mantener "No válido"
            setMessage('No válido');
        }
    }

    return (
        <div>
            <div className='border-2 p-2 m-2'>
                <label className="grid">
                    Retiro
                    <input
                        className="rounded-md border-2"
                        type="number"
                        name="withdrawal"
                        id="withdrawal"
                        onBlur={(e) => setWithdrawal(parseInt(e.target.value))}
                    />
                </label>
                <button onClick={() => handleGradeChange(withdrawal)} type='button'>Confirmar</button>
                <p>{message}</p>
            </div>
        </div>
    );
}

CalculateRecentWithdrawalsForm.propTypes = {
    balance: PropTypes.number.isRequired,
    setSavingCapacityRecentWithdrawals: PropTypes.func.isRequired,
};