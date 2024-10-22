import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthUser from './AuthUser'
import axios from 'axios'

const endpoint = 'http://localhost:8000/api/v1'
const endpointCSRF = 'http://localhost:8000/'


const Login = () => {


    const { getToken, setToken } = AuthUser()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [formError, setError] = useState("")


    useEffect(() => {
        if (getToken()) {
            navigate('/user/notes')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitLogin = async (e) => {
        e.preventDefault()

        await axios.get(`${endpointCSRF}sanctum/csrf-cookie`).then((response) => {
            axios.post(`${endpoint}/login`,
                {
                    username: username,
                    password: password
                }
            ).then(
                response => {

                    setToken(
                        response.data.user,
                        response.data.token,
                        response.data.user.roles[0].name
                    )

                    navigate('/user/notes')
                }
            ).catch(
                error => {

                    console.log(error)
                    const newError = error.response.data

                    console.log(newError)

                    let errorsNew = ''


                    //itera los errores entregados por el response json
                    Object.keys(newError.errors).map(function (keyName, keyIndex) {
                        return errorsNew += ' | ' + newError.errors[keyName][0]
                    })

                    //actualiza el valor del global_error
                    setError(newError.message + errorsNew)

                }

            )
        })
    }


    return (
        <div className='text-white pt-3 pb-5 bg-black' style={{ minHeight: "100vh" }}>

            <div className='container pt-5'>
                <div className='row justify-content-center pt-5'>
                    <main className="col-sm-4 border p-2 px-4 bg-dark">


                        <form onSubmit={submitLogin}>

                            <div className='pt-4 pb-2'>
                                <h1 className='fs-2 fw-bold fst-italic'>Please sign in</h1>

                                <small className="text-danger fs-6">
                                    {formError}
                                </small>
                            </div>

                            <div className="form-floating mb-2">
                                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className="form-control" id="username" placeholder="name123" autoComplete='username' required />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="password" placeholder="Password" autoComplete='password' required />
                                <label htmlFor="password">Password</label>
                            </div>


                            <div className='btn-group py-2'>
                                <Link to="/register" className="btn btn-outline-success">Register</Link>
                                <button className="btn btn-outline-primary" type="submit">Sign in</button>
                            </div>

                            <p className="mt-2 mb-3 text-body-secondary">© Hecho por Jorge Heredia <br /> 2017–2024</p>
                        </form>
                    </main>
                </div>

            </div>

        </div>
    )
}

export default Login