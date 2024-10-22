import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

import { faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    const iconLinkedin = <FontAwesomeIcon icon={faLinkedin} size='xl' />
    const iconGithub = <FontAwesomeIcon icon={faSquareGithub} size='xl' />
    const iconEmail = <FontAwesomeIcon icon={faEnvelopeOpenText} size='xl' />

    return (
        <div className='container-fluid py-3 bg-dark' >

            <div className="container ">
                <footer className="d-flex flex-wrap justify-content-between align-items-center">
                    <p className="col-md-4 mb-0 text-body-secondary text-start">Página hecha por Jorge Heredia</p>

                    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    </a>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><Link to={'https://www.linkedin.com/in/jorge-luis-heredia-jaimes-053a3131b'} target='_blank' className="nav-link px-2 text-body-secondary">{iconLinkedin}</Link></li>
                        <li className="nav-item"><Link to={'https://github.com/JLHJ21'} target='_blank' className="nav-link px-2 text-body-secondary">{iconGithub}</Link></li>
                        <li className="nav-item"><Link to={'jorgeherediavzla@gmail.com'} target='_blank' className="nav-link px-2 text-body-secondary">{iconEmail}</Link></li>
                    </ul>
                </footer>
            </div>
        </div>

    )
}

export default Footer