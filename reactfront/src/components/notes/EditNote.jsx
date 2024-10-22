import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../auth/AuthUser'

const endpoint = 'http://localhost:8000/api/v1/notes/'
const EditNote = () => {
    //En caso tal que el error se le agregue un valor, se actualiza mostrandolo en la pagina
    const [formError, setError] = useState([''])

    const { getToken } = AuthUser()

    const [descriptionNote, setDescriptionNote] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()
    const bearerToken = getToken();

    const update = async (e) => {
        e.preventDefault()

        await axios.put(
            `${endpoint}${id}`,
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

    useEffect(() => {
        const getNoteId = async () => {

            await axios.get(
                `${endpoint}${id}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    withCredentials: true
                }
            },
            ).then(
                response => {
                    setDescriptionNote(response.data.note['notes']['description_note'])
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
        getNoteId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className='text-white pt-3 pb-5 bg-black' style={{ minHeight: "85vh" }}>

            <div className="container">
                <div className='pb-3'>
                    <h1 className='display-3 fw-bold fst-italic'>Edit note</h1>

                    <small className="text-danger fs-6">
                        {formError}
                    </small>
                </div>


                <form onSubmit={update}>
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
        </div>
    )
}

export default EditNote