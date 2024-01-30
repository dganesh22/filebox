import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

function PrivateRoute() {
    const context = useContext(AuthContext)
    const isLogin  = context.isLogin 
  return (
    <React.Fragment>
        {
            isLogin ? <Outlet/> : <Navigate to={`/login`} />
        }
    </React.Fragment>
  )
}

export default PrivateRoute
