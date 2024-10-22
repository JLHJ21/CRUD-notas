import React from 'react'
import NavBar from '../templates/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../templates/Footer'
import AuthUser from '../components/auth/AuthUser'

const LayoutUser = () => {

    const { getRol } = AuthUser()
    const navigate = useNavigate()

    if (getRol() !== 'user') {
        navigate('/')
    }

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />

        </>
    )
}

export default LayoutUser