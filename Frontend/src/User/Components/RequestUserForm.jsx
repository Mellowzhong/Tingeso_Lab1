import PropTypes from 'prop-types';

function RequestUserForm({ setFirstName, setLastName, setRut }) {

    return (
        <>
            <h1>Request USER FORM</h1>
            <section>
                <div className='grid'>
                    <label htmlFor="firstName">Nombre:
                        <input type="text" id="firstName" name="firstName" onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                    <label htmlFor="lastName">Apellido:
                        <input type="text" id="lastName" name="lastName" onChange={(e) => setLastName(e.target.value)} />
                    </label>
                    <label htmlFor="rut">Rut:
                        <input type="text" id="rut" name="rut" onChange={(e) => setRut(e.target.value)} />
                    </label>
                </div>
            </section>
        </>
    )
}

RequestUserForm.propTypes = {
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setRut: PropTypes.func.isRequired
}

export default RequestUserForm;