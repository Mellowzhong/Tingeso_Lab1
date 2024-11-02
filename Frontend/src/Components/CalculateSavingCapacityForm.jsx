import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CalculateSavingCapacityForm({ handleIncomeChange, setSavingHistory }) {
    const [balance, setBalance] = useState(0);
    const [withdrawal, setWithdrawal] = useState(0);
    const [message, setMessage] = useState('No válido'); // Estado inicial como "No válido"

    const handleGradeChange = (balance, withdrawal) => {
        const newBalance = balance * 0.5;

        if (newBalance >= withdrawal) {
            setSavingHistory(true); // Si es válido, actualizar el historial
            setMessage('Válido');
        } else {
            setSavingHistory(false); // Si no es válido, mantener "No válido"
            setMessage('No válido');
        }
    }

    return (
        <div>
            <div className='border-2 p-2 m-2'>
                <label className="grid">
                    <h2 className="m-auto">Saldo</h2>
                    <input
                        className="rounded-md border-2"
                        type="number"
                        name="balance"
                        id="balance"
                        onBlur={(e) => setBalance(parseInt(e.target.value))}
                    />
                </label>
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
                <label className="grid">
                    Deposito mensual
                    <input
                        className="rounded-md border-2"
                        type="number"
                        name="monthlyIncome"
                        id="monthlyIncome"
                        onBlur={(e) => {
                            handleIncomeChange(parseInt(e.target.value))
                        }}
                    />
                </label>
                <button onClick={() => handleGradeChange(balance, withdrawal)} type='button'>Confirmar</button>
                <p>{message}</p>
            </div>
        </div>
    );
}

CalculateSavingCapacityForm.propTypes = {
    handleIncomeChange: PropTypes.func.isRequired,
    setSavingHistory: PropTypes.func.isRequired,
};