import React, { useState } from 'react'
import AuthUser from '../auth/AuthUser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/v1/notes/'

const CreateNote = () => {

    const { getToken } = AuthUser()
    const bearerToken = getToken();
    const navigate = useNavigate()

    const [formError, setError] = useState([''])
    const [descriptionNote, setDescriptionNote] = useState('')


    const submitNote = async (e) => {
        e.preventDefault()

        await axios.post(
            `${endpoint}`,
            {
                description_note: descriptionNote
            },
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    withCredentials: true
                }

            }
        ).then(
            response => {
                navigate('/user/notes')
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
        <div className=' text-white pt-3 pb-5 bg-black' style={{ minHeight: "85vh" }}>
            <div className="container">

                <div className='pb-3'>
                    <h1 className='display-3 fw-bold fst-italic'>Create note</h1>

                    <small className="text-danger fs-6">
                        {formError}
                    </small>
                </div>


                <form onSubmit={submitNote}>
                    <div className="mb-3 text-start">
                        <label className="form-label">Description</label>
                        <input
                            //Pongo valor predeterminado
                            value={descriptionNote}
                            //Actualizo el valor
                            onChange={(e) => setDescriptionNote(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Store</button>
                </form>
            </div>
        </div>)
}

export default CreateNote