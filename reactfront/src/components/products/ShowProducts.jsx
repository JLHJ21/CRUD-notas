import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AuthUser from '../auth/AuthUser'

const endpoint = 'http://localhost:8000/api/v1'
//const endpointCSRF = 'http://localhost:8000/'

//funcion o class, de este archivo
const ShowProducts = () => {

    const { getToken } = AuthUser()
    const bearerToken = getToken();
    const [products, setProducts] = useState([''])

    useEffect(() => {
        getAllProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAllProducts = async () => {
        //await axios.get(`${endpointCSRF}sanctum/csrf-cookie`).then((response) => {
        axios.get(
            `${endpoint}/students`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        }
        ).then(
            response => {
                setProducts(response.data.message)
            }
        ).catch(
            error => {
                console.log(error)
            }

        )
        //})

    }

    const deleteProducts = async (id) => {
        await axios.delete(`${endpoint}/students/${id}`)
        getAllProducts()
    }

    return (
        <div>
            <div className="d-grip gap-2">
                <Link to="/create" className="btn btn-success text-white btn-lg mt-2 mb-2">Create</Link>
            </div>

            <table className="table table-striped">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Language</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td> {product.name} </td>
                            <td> {product.email} </td>
                            <td> {product.phone} </td>
                            <td> {product.language} </td>

                            <td>
                                <Link to={`edit/${product.id}`} className="btn btn-warning">Edit</Link>
                                <button onClick={() => deleteProducts(product.id)} className="btn btn-danger">Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowProducts