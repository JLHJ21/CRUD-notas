//import axios from 'axios'
import React from 'react'
//import AuthUser from '../components/auth/AuthUser'
//import SearchBar from './SearchBar'


//const endpoint = 'http://localhost:8000/api/v1'
const Pagination = ({ amountPages, functionButtonsPages, numberPreviousButton, numberNextButton }) => {

    /*

    setNumberNextPage(actualPage - 1 <= 1 ? { 'number': 1, 'canUse': 'disabled' } : { 'number': actualPage - 1, 'canUse': '' })
    setNumberNextPage(typeof (amountPages[actualPage]) === 'undefined' ? { 'number': 'no tiene', 'canUse': 'disabled' } : { 'number': actualPage + 1, 'canUse': '' })
    */


    return (
        <div>
            <ul className="pagination justify-content-center pt-3 table-responsive">

                <li className={numberPreviousButton.canUse + ' page-item'}>
                    <button className="page-link" value={numberPreviousButton.number} onClick={() => functionButtonsPages(numberPreviousButton.number)}>
                        Previous
                    </button>
                </li>


                {

                    amountPages.map((page, index) =>

                        <li
                            key={index}
                            className={page.selected === true ? 'page-item boton_paginacion active' : 'page-item boton_paginacion'}
                            value={page.page}
                        >
                            <button className="page-link" onClick={() => functionButtonsPages(page.page)}>{page.page}</button>
                        </li>

                    )
                }


                <li className={numberNextButton.canUse + ' page-item'}>
                    <button className="page-link" value={numberNextButton.number} onClick={() => { functionButtonsPages(numberNextButton.number) }} >
                        Next
                    </button>
                </li>

            </ul>
        </div>
    )
}

export default Pagination