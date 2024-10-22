import React from 'react'
//import AuthUser from '../auth/AuthUser'
//import { Link } from 'react-router-dom'
//import axios from 'axios'
import SearchBar from '../../templates/SearchBar'
import TableNotes from './show/TableNotes'
//import Pagination from '../../templates/Pagination'


const endpoint = 'http://localhost:8000/api/v1/notes'

const ShowNotes = () => {

    const { typeSearch, amountPages, setNotes, setAmountPages, table } = TableNotes()

    return (

        amountPages.length <= 0 ?


            <div className="d-flex justify-content-center bg-black" style={{ minHeight: "85vh" }}>

                <strong role="status" className='align-self-center'>Loading...</strong>
                <div className="spinner-border m-5 align-self-center" aria-hidden="true"></div>
            </div>


            :
            <div className='text-white pt-3 pb-5 bg-black' style={{ minHeight: "85vh" }}>

                <div className='container'  >

                    <div>
                        <h1 className='display-3 pb-3 fw-bold fst-italic'>Notes</h1>
                    </div>

                    <div className='border border-1 rounded bg-dark'>
                        <SearchBar typeSearch={typeSearch} variableUpdate={setNotes} amountPages={amountPages} variablePagination={setAmountPages} urlApi={`${endpoint}/search`} childPage={table()} />
                    </div>
                </div>
            </div>

    )
}


export default ShowNotes