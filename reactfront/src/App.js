//import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ShowProducts from './components/products/ShowProducts';
import CreateProduct from './components/products/CreateProduct';
import EditProduct from './components/products/EditProduct';

import ShowNotes from './components/notes/ShowNotes';
import EditNote from './components/notes/EditNote';
import CreateNote from './components/notes/CreateNote';

import LayoutUser from './layouts/LayoutUser';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//TODO ESTO ES EL ENRUTADOR, AL FINAL EL LARAVEL SERVIRÁ COMO UNA API Y EL REACT COMO LA PAGINA EN SÍ

function App() {

  return (
    <div className="App font-monospace" style={{ height: "auto" }}>
      <BrowserRouter>
        <Routes>


          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<ProtectedRoutes />}>

            <Route path='/user' element={<LayoutUser />}>
              <Route index path='notes/*' element={< ShowNotes />} />
              <Route path='notes/create' element={< CreateNote />} />
              <Route path='notes/edit/:id' element={< EditNote />} />


              <Route path="products" element={<ShowProducts />} />
              <Route path='create' element={<CreateProduct />} />
              <Route path='edit/:id' element={<EditProduct />} />

            </Route>



          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
