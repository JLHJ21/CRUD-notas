import React, { useEffect, useState } from 'react'
import AuthUser from '../../auth/AuthUser';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api/v1'

const TableNotes = () => {


    const { getToken } = AuthUser()
    const [notes, setNotes] = useState([''])
    const bearerToken = getToken();

    const typeSearch = ['Description', 'Hi']
    const [amountPages, setAmountPages] = useState([])

    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAllNotes = async () => {
        await axios.get(
            `${endpoint}/notes`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                withCredentials: true
            },
        }
        ).then(
            response => {
                setNotes(response.data.notes)
                setAmountPages(response.data.pages)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    const deleteNotes = async (id) => {
        const bearerToken = getToken();

        await axios.patch(`${endpoint}/notes/${id}`, { id_state: 2 }, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                withCredentials: true
            }

        }).then(
            response => {
                getAllNotes()
            }
        ).catch(
            error => {
                console.log(error)
            }

        )

    }

    const haveData = () => {

        if (typeof (notes) !== 'undefined') {
            return (
                notes.map((note, index) =>
                (
                    <tr key={index} id={index}>
                        <td> {typeof (note.notes) == 'undefined' ? 'hola que tal' : note.notes['description_note']} </td>
                        <td> {typeof (note.notes) == 'undefined' ? 'hola que tal' : note.notes['date_note']}</td>

                        <td>
                            <div className='btn-group w-100'>
                                <button onClick={() => deleteNotes(note.id_note_data)} className="btn btn-outline-danger text-white">Delete</button>
                                <Link to={`edit/${note.id_note_data}`} className="btn btn-outline-primary text-white">Edit</Link>
                            </div>
                        </td>

                    </tr>
                )
                )
            )

        } else {
            return (
                <tr key="{0}">
                    <td> No hay datos </td>
                    <td> No hay datos </td>
                    <td>
                        <div className='btn-group'>
                            <Link className="btn btn-warning text-white" disabled>Edit</Link>
                            <button className="btn btn-danger text-white" disabled>Delete</button>
                        </div>
                    </td>

                </tr>
            )
        }
    }

    const table = () => {
        return (
            <div>

                <table className="table table-hover">
                    <thead className="">
                        <tr>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {haveData()}
                    </tbody>
                </table>

            </div >
        )
    }

    return {
        bearerToken,
        typeSearch,
        amountPages,
        setNotes,
        setAmountPages,
        table
    }




}


export default TableNotes