import PropTypes from 'prop-types';

function FinanceEvaluationForm({ documents, formHandleSubmit, documentHandleSubmit,
    setFeeToIncomeRatio, setCreditHistory, setEmploymentHistory, setDebtToIncomeRatio,
    setFinanceMaxAmount, setApplicantAge, setSavingCapacity, setEvaluationResult,
    feeToIncomeRatio, creditHistory, employmentHistory, debtToIncomeRatio,
    financeMaxAmount, applicantAge, savingCapacity, evaluationResult }) {

    return (
        <ul className="w-full flex flex-col items-center">
            {documents.map((credit) => (
                <div className="border-2 my-4 w-1/2 text-center" key={credit.id}>
                    <p>Credit ID: {credit.id}</p>
                    {credit.financialEvaluation.evaluationResult ? <p>true</p> : <p>false</p>}
                    <p>financial evaluation ID: {credit.financialEvaluation.id}</p>
                    <span>User info</span>
                    <p>First Name: {credit.user.firstName}</p>
                    <p>Last Name: {credit.user.lastName}</p>
                    <p>Rut: {credit.user.rut}</p>
                    <section>
                        <form className="grid" onSubmit={(e) => formHandleSubmit(e, credit.id, credit.financialEvaluation.id)}>
                            <label htmlFor="feeToIncomeRatio">
                                Relacion cuota/ingreso.
                                <input type="checkbox" name="feeToIncomeRatio" id="feeToIncomeRatio" checked={feeToIncomeRatio} onChange={() => setFeeToIncomeRatio(!feeToIncomeRatio)} />
                            </label>
                            <label htmlFor="creditHistory">
                                Historial crediticio
                                <input type="checkbox" name="creditHistory" id="creditHistory" checked={creditHistory} onChange={() => setCreditHistory(!creditHistory)} />
                            </label>
                            <label htmlFor="employmentHistory">
                                Antiguedad laboral y estabilidad
                                <input type="checkbox" name="employmentHistory" id="employmentHistory" checked={employmentHistory} onChange={() => setEmploymentHistory(!employmentHistory)} />
                            </label>
                            <label htmlFor="debtToIncomeRatio">
                                Relacion deuda/ingreso
                                <input type="checkbox" name="debtToIncomeRatio" id="debtToIncomeRatio" checked={debtToIncomeRatio} onChange={() => setDebtToIncomeRatio(!debtToIncomeRatio)} />
                            </label>
                            <label htmlFor="financeMaxAmount">
                                Monto maximo de financiamiento
                                <input type="checkbox" name="financeMaxAmount" id="financeMaxAmount" checked={financeMaxAmount} onChange={() => setFinanceMaxAmount(!financeMaxAmount)} />
                            </label>
                            <label htmlFor="applicantAge">
                                Edad del solicitante
                                <input type="checkbox" name="applicantAge" id="applicantAge" checked={applicantAge} onChange={() => setApplicantAge(!applicantAge)} />
                            </label>
                            <label htmlFor="savingCapacity">
                                Capacidad de ahorro
                                <input type="checkbox" name="savingCapacity" id="savingCapacity" checked={savingCapacity} onChange={() => setSavingCapacity(!savingCapacity)} />
                            </label>
                            <label htmlFor="evaluationResult">
                                Resultado de evaluacion
                                <input type="checkbox" name="evaluationResult" id="evaluationResult" checked={evaluationResult} onChange={() => setEvaluationResult(!evaluationResult)} />
                            </label>
                            <button type="submit">Mandar</button>
                        </form>
                        <h2 className='mt-10'>Solicitar los documentos</h2>
                        {credit.documents.map((document) => (
                            <form
                                className="my-4"
                                onSubmit={(e) => documentHandleSubmit(e, document.id, document.documentName)}
                                key={document.id}
                            >
                                <p>Document ID: {document.id}</p>
                                <p>Document Name: {document.documentName}</p>
                                <p>Document Type: {document.documentType}</p>
                                <p>Document Credit Type: {document.typeCreditDocument}</p>
                                <button type="submit">Solicitar documento</button>
                            </form>
                        ))}
                    </section>
                </div>
            ))}
        </ul>
    );
}

FinanceEvaluationForm.propTypes = {
    documents: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            rut: PropTypes.string.isRequired,
        }).isRequired,
        documents: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            documentName: PropTypes.string.isRequired,
            documentType: PropTypes.string.isRequired,
            typeCreditDocument: PropTypes.string.isRequired,
        })).isRequired,
    })).isRequired,
    formHandleSubmit: PropTypes.func.isRequired,
    documentHandleSubmit: PropTypes.func.isRequired,

    // Set functions
    setFeeToIncomeRatio: PropTypes.func.isRequired,
    setCreditHistory: PropTypes.func.isRequired,
    setEmploymentHistory: PropTypes.func.isRequired,
    setDebtToIncomeRatio: PropTypes.func.isRequired,
    setFinanceMaxAmount: PropTypes.func.isRequired,
    setApplicantAge: PropTypes.func.isRequired,
    setSavingCapacity: PropTypes.func.isRequired,
    setEvaluationResult: PropTypes.func.isRequired,

    // Data
    feeToIncomeRatio: PropTypes.bool.isRequired,
    creditHistory: PropTypes.bool.isRequired,
    employmentHistory: PropTypes.bool.isRequired,
    debtToIncomeRatio: PropTypes.bool.isRequired,
    financeMaxAmount: PropTypes.bool.isRequired,
    applicantAge: PropTypes.bool.isRequired,
    savingCapacity: PropTypes.bool.isRequired,
    evaluationResult: PropTypes.bool.isRequired,
};

export default FinanceEvaluationForm;