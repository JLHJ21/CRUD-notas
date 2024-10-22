import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthUser from './AuthUser'

const endpoint = 'http://localhost:8000/api/v1'

const Register = () => {

    const { getToken } = AuthUser()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [formError, setError] = useState("")


    useEffect(() => {
        if (getToken()) {
            navigate('/user/notes')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const submitRegistro = async (e) => {
        e.preventDefault()

        await axios.post(`${endpoint}/register`,
            {
                name: name,
                username: username,
                email: email,
                password: password,
                repeatPassword: repeatPassword
            }
        ).then(
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
        <div className='text-white pt-3 pb-5 bg-black' style={{ minHeight: "100vh" }}>

            <div className='container pt-4'>
                <div className='row justify-content-center pt-4'>
                    <main className="col-sm-4 border p-2 px-4 bg-dark">

                        <form onSubmit={submitRegistro}>

                            <div className='pt-4 pb-2'>
                                <h1 className='fs-2 fw-bold fst-italic'>Please sign up</h1>

                                <small className="text-danger fs-6">
                                    {formError}
                                </small>
                            </div>


                            <div className="form-floating mb-2">
                                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="name" placeholder="name" autoComplete='on' required />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className="form-control" id="username" placeholder="name123" autoComplete='username' required />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="email" placeholder="name@example.com" required />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <div className="form-floating mb-2">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="password" placeholder="Password" autoComplete='new-password' required />
                                <label htmlFor="password">Password</label>
                            </div>


                            <div className="form-floating mb-2">
                                <input type="password" onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} className="form-control" id="repeatPassword" placeholder="Password" autoComplete='new-password' required />
                                <label htmlFor="repeatPassword">Repeat password</label>
                            </div>

                            <div className='btn-group py-2'>
                                <Link to="/" className="btn btn-outline-success">Login</Link>
                                <button className="btn btn-outline-primary" type="submit">Sign up</button>

                            </div>

                            <p className="mt-2 mb-3 text-body-secondary">© 2017–2024</p>
                        </form>
                    </main>
                </div>

            </div>

        </div>
    )
}

export default Register