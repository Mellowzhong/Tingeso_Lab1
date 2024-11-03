import PropTypes from 'prop-types';

function RequestUserForm({ setFirstName, setLastName, setRut }) {
    return (
        <section className='border-2 p-4 rounded-lg bg-white'>
            <div className='grid gap-4'>
                <label htmlFor="firstName" className='grid'>
                    Nombre:
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        className='border p-2 focus:ring-indigo-500 focus:border-indigo-500'
                    />
                </label>
                <label htmlFor="lastName" className='grid'>
                    Apellido:
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        className='border p-2 focus:ring-indigo-500 focus:border-indigo-500'
                    />
                </label>
                <label htmlFor="rut" className='grid'>
                    Rut:
                    <input
                        type="text"
                        id="rut"
                        name="rut"
                        onChange={(e) => setRut(e.target.value)}
                        className='border p-2 focus:ring-indigo-500 focus:border-indigo-500'
                    />
                </label>
            </div>
        </section>
    );
}

RequestUserForm.propTypes = {
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setRut: PropTypes.func.isRequired
};

export default RequestUserForm;