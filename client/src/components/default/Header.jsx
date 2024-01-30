import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Header() {

    const {isLogin,isAdmin,isUser,currentUser, setIsAdmin, setIsLogin, setIsUser, setToken, setCurrentUser} = useContext(AuthContext)

    // logout
    const logoutHandler = async () => {
        if(window.confirm(`Are you sure to logout?`)) {
            await axios.get(`/api/auth/logout`)
            .then(res => {
                toast.success(res.data.msg)
                localStorage.clear()

                setToken(false)
                setIsLogin(false)
                setIsUser(false)
                setIsAdmin(false)
                setCurrentUser(false)
            }).catch(err => toast.error(err.response.data.msg))
        } else {
            return
        }
    }

  return (
    <header>
        <nav className={isLogin ? "navbar navbar-expand-md navbar-dark bg-success": "navbar navbar-expand-md navbar-dark bg-primary"}>
            <div className="container">
                <NavLink to={`/`} className="navbar-brand">FileBox</NavLink>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {
                    isLogin ? (
                        <div className="collapse navbar-collapse justify-content-between" id="menu">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to={`/`} className="nav-link">Home</NavLink>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    {
                                        currentUser ? (
                                            <NavLink to={`/`} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                            <strong className='text-uppercase'>
                                                 { currentUser ? currentUser.name : "Guest"} </strong>
                                             <i className="bi bi-person"></i>
                                        </NavLink>
                                        ) : (
                                            <NavLink to={`/`} className="nav-link">
                                                Logout
                                            </NavLink>
                                        )
                                    }
                                        {
                                            isUser ? (
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <NavLink to={`/user/dashboard`} className="dropdown-item">User Dashboard</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink onClick={logoutHandler} to={`/#`} className="dropdown-item">Logout</NavLink>
                                                    </li>
                                                </ul>
                                            ) : null
                                        }

                                        {
                                            isAdmin? (
                                                <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink to={`/admin/dashboard`} className="dropdown-item">Admin Dashboard</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink onClick={logoutHandler} to={`/#`} className="dropdown-item">Logout</NavLink>
                                                </li>
                                            </ul>
                                            ) : null 
                                        }
                                </li>
                            </ul>
                        </div>
                    ): (
                        <div className="collapse navbar-collapse justify-content-end" id="menu">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to={`/login`} className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/register`} className="nav-link">Register</NavLink>
                                </li>
                            </ul>
                        </div>
                    )
                }

            </div>
        </nav>
    </header>
  )
}

export default Header
