import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthUser from '../components/auth/AuthUser'
import Pagination from './Pagination'

const SearchBar = ({ typeSearch, variableUpdate, amountPages, variablePagination, urlApi, childPage }) => {

  const { getToken } = AuthUser()
  const bearerToken = getToken();

  const [inputSearch, setInputSearch] = useState('')
  const [optionSelect, setOptionSelect] = useState(typeSearch[0])

  const [formError, setError] = useState([''])

  let actualPage = 0
  amountPages.forEach((page) => {
    if (page.selected === true) {
      actualPage = page.page

    }
  });


  const searchData = async () => {

    await axios.post(`${urlApi}`,
      {
        option_select: optionSelect,
        input_search: inputSearch,
        //OJO
        number_page: actualPage

      }
      , {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          withCredentials: true
        }

      }).then(
        response => {
          //console.log(response.data.notes)
          variableUpdate(response.data.notes)
          variablePagination(response.data.page)


          response.data.page.forEach((page) => {
            if (page.selected === true) {
              actualPage = page.page

              amountPages[actualPage] === 'undefined' ? <div>Loading</div> :

                setNumberPreviousPage(actualPage - 1 <= 0 ? { 'number': 1, 'canUse': 'disabled' } : { 'number': actualPage - 1, 'canUse': '' })
              setNumberNextPage(typeof (amountPages[actualPage]) === 'undefined' || actualPage === 1 ? { 'number': 'no tiene', 'canUse': 'disabled' } : { 'number': actualPage + 1, 'canUse': '' })
            }
          });

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


  //si el numero es negativo será 1, de lo contrario menos uno al actual
  const [numberPreviousPage, setNumberPreviousPage] = useState(actualPage - 1 <= 0 ? { 'number': 1, 'canUse': 'disabled' } : { 'number': actualPage - 1, 'canUse': '' })

  //si el array no existe, el resultado será más uno al boton Anterior
  const [numberNextPage, setNumberNextPage] = useState(typeof (amountPages[actualPage]) === 'undefined' ? { 'number': 'no tiene', 'canUse': 'disabled' } : { 'number': actualPage + 1, 'canUse': '' })


  let isPaginationCallOn = false

  //const { getToken } = AuthUser()
  const buttonsPages = async (page) => {

    if (isPaginationCallOn === false) {
      if (actualPage !== page) {
        isPaginationCallOn = true

        await axios.post(`${urlApi}`,
          {
            option_select: optionSelect,
            input_search: inputSearch,
            number_page: page
          },
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              withCredentials: true
            }

          }).then(
            response => {
              variableUpdate(response.data.notes)
              variablePagination(response.data.page)

              response.data.page.forEach((page) => {
                if (page.selected === true) {
                  actualPage = page.page

                  amountPages[actualPage] === 'undefined' ? <div>Loading</div> :

                    setNumberPreviousPage(actualPage - 1 <= 0 ? { 'number': 1, 'canUse': 'disabled' } : { 'number': actualPage - 1, 'canUse': '' })
                  setNumberNextPage(typeof (amountPages[actualPage]) === 'undefined' || actualPage === 1 ? { 'number': 'no tiene', 'canUse': 'disabled' } : { 'number': actualPage + 1, 'canUse': '' })
                }
              });

            }
          ).catch(
            error => {
              //console.log(error)
            }
          )
      } else {
        console.log('funciona')
      }
    } else {
      console.log(' ya hay otra llamada')
    }

  }


  return (
    <div className='m-4'>

      <div className="row ">


        <small className="text-danger">
          {formError}
        </small>

        <div className="col-5 col-md-3">
          <select

            className="form-select"
            onChange={(e) => setOptionSelect(e.target.value)}
          //value={typeSearch[0]}

          >
            {
              typeSearch.map((type, index) =>

                <option key={index} value={type}  >
                  {type}
                </option>


              )
            }

          </select>
        </div>

        <div className="col-7 col-md-5 p-0">

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control input-todo"
              placeholder="Search note..."
              onChange={(e) => setInputSearch(e.target.value)}
            />

          </div>
        </div>
        <div className="col-6 col-md-2">
          <button
            className="btn btn-outline-primary w-100 text-truncate text-white"
            onClick={() => searchData()}
          >
            <span >
              Search
            </span>
          </button>
        </div>

        <div className="col-6 col-md-2">
          <Link to="create" className="btn btn-outline-success w-100 text-truncate text-white">
            <span >
              Add
            </span>
          </Link>
        </div>


      </div>

      {childPage}

      <Pagination
        amountPages={amountPages}
        functionButtonsPages={buttonsPages}

        numberPreviousButton={numberPreviousPage}
        numberNextButton={numberNextPage}

      />
    </div>
  )
}

export default SearchBar