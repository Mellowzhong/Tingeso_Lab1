import PropTypes from 'prop-types';

function ApplicantAgeForm({ applicantAge, setApplicantAge }) {
    return (
        <div className='grid border-2 m-4'>
            <label htmlFor="applicantAge">
                <h2>Edad del solicitante</h2>
                <input type="checkbox"
                    name="applicantAge"
                    id="applicantAge"
                    checked={applicantAge} onChange={() => setApplicantAge(!applicantAge)}
                />
            </label>
        </div>
    );
}

ApplicantAgeForm.propTypes = {
    applicantAge: PropTypes.bool.isRequired,
    setApplicantAge: PropTypes.func.isRequired,
};

export default ApplicantAgeForm;