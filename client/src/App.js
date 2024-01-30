import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/default/Header'
import Footer from './components/default/Footer'
import Home from './components/default/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AdminDashboard from './components/admin/AdminDashboard'
import UserDashboard from './components/user/UserDashboard'
import Pnf from './components/default/Pnf'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './Auth/PrivateRoute'
import { AuthContext } from './Context/AuthContext'
import View from './components/screens/View'
import FileUpload from './components/user/FileUpload'
import GeneratePassword from './components/auth/GeneratePassword'
import ResetPassword from './components/auth/ResetPassword'

function App() {
  const context = useContext(AuthContext)
  const isLogin = context.isLogin

  return (
    <BrowserRouter>
          <Header/>
          <ToastContainer autoClose={4000} position={'top-right'} />
            <Routes>
               <Route element={<PrivateRoute/>}>
                    <Route exact path={`/`} element={<Home/>} />
                    <Route exact path={`/admin/dashboard`} element={<AdminDashboard/>} />
                    <Route exact path={`/user/dashboard`} element={<UserDashboard/>} />
                    <Route exact path={`/upload/new`} element={<FileUpload/>} />
                    <Route exact path={`/view/file/:id`} element={<View/>} />
               </Route>
               <Route exact path={`/password/reset`} element={isLogin? <Navigate to={`/`}/>: <ResetPassword/>} />
               <Route exact path={`/generate/password`} element={isLogin? <Navigate to={`/`}/>: <GeneratePassword/>} />
                <Route exact path={`/login`} element={isLogin? <Navigate to={`/`}/> : <Login/>} />
                <Route exact path={`/register`} element={isLogin? <Navigate to={`/`}/> : <Register/>} />
                <Route  path={`/*`} element={<Pnf/>} />
            </Routes>
          <Footer/> exact
    </BrowserRouter>
  )
}

export default App
