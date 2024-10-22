import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/student'

const CreateProduct = () => {

    //En caso tal que el error se le agregue un valor, se actualiza mostrandolo en la pagina
    const [formError, setError] = useState([''])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [language, setLanguage] = useState('')

    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()

        await axios.post(endpoint, {
            name: name,
            email: email,
            phone: phone,
            language: language,
        }).then(
            response => {
                navigate('/')
            }
        ).catch(
            error => {
                const newError = error.response.data
                let errorsNew = ''


                //itera los errores entregados por el response json
                Object.keys(newError.errors).map(function (keyName, keyIndex) {
                    return errorsNew += ' | ' + newError.errors[keyName][0]
                })

                //actualiza el valor del global_error
                setError(newError.message + errorsNew)

            }

        )
    }

    return (
        <div>

            <h3>Create student</h3>
            <small className="text-danger">{formError}</small>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        //Pongo valor predeterminado
                        value={name}
                        //Actualizo el valor
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Language</label>
                    <input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Store</button>
            </form>

        </div>
    )
}

export default CreateProduct