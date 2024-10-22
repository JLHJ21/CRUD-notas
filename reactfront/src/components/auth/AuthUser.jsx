//import React, { useState } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthUser = () => {


    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        const token = JSON.parse(tokenString)
        return token
    }

    const getUser = () => {
        const tokenString = sessionStorage.getItem('user')
        const token = JSON.parse(tokenString)
        return token
    }

    const getRol = () => {
        const tokenString = sessionStorage.getItem('rol')
        const token = JSON.parse(tokenString)
        return token
    }

    const navigate = useNavigate()

    const [token, setToken] = useState(getToken)
    const [user, setUser] = useState(getUser)
    const [rol, setRol] = useState(getRol)

    //rol::user
    /*
    useEffect(() => {
        if (getRol() === 'user') {
            navigate('/user')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    */

    const saveToken = (user, token, rol) => {
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('token', JSON.stringify(token))
        sessionStorage.setItem('rol', JSON.stringify(rol))

        setUser(user)
        setToken(token)
        setRol(rol)

    }

    const getLogout = () => {
        sessionStorage.clear()
        navigate('/')
    }


    return {
        setToken: saveToken,
        token,
        user,
        rol,
        getToken, getRol, getUser, getLogout
    }
}

export default AuthUser