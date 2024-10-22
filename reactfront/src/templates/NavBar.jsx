import React from 'react'
import { Link } from 'react-router-dom'
import AuthUser from '../components/auth/AuthUser'
import axios from 'axios'
import userIcon from '../components/images/pardo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const endpoint = 'http://localhost:8000/api/v1'

function NavBar() {


    const { getLogout, getToken } = AuthUser()
    const iconNotes = <FontAwesomeIcon icon={faEnvelope} className='align-self-center pe-1' size='xl' />
    const logoutUser = async () => {

        const bearerToken = getToken();

        await axios.post(`${endpoint}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        }).then(
            response => {
                getLogout()
            }
        ).catch(
            error => {
                console.log(error)
            }

        )
    }


    return (

        <div style={{ background: "#6610f2" }}>

            <header className="p-2">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        </Link>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            {/*<li><Link to="/products" className="nav-link px-2 link-secondary">Products</Link></li>*/}
                            <li >
                                <Link to="/notes" className="nav-link active px-2 link-secondary fs-5 fw-bold text-white">{iconNotes} Notes </Link>
                            </li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        </form>

                        <div className="dropdown text-end">
                            <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={userIcon} alt="mdo" width="32" height="32" className="rounded-circle" />
                            </Link>
                            <ul className="dropdown-menu text-small">
                                <li>
                                    <Link onClick={logoutUser} className="dropdown-item">Sign out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

        </div >
    )
}

export default NavBar