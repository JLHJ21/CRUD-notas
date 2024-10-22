import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/student/'


function EditProduct() {
    //En caso tal que el error se le agregue un valor, se actualiza mostrandolo en la pagina
    const [formError, setError] = useState([''])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [language, setLanguage] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()

        await axios.put(`${endpoint}${id}`, {
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

    useEffect(() => {
        const getProductId = async () => {
            const response = await axios.get(`${endpoint}${id}`).catch(
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

            setName(response.data.student['name'])
            setEmail(response.data.student['email'])
            setPhone(response.data.student['phone'])
            setLanguage(response.data.student['language'])
        }
        getProductId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>

            <h3>Edit student</h3>
            <small className="text-danger">
                {formError}
            </small>
            <form onSubmit={update}>
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

export default EditProduct