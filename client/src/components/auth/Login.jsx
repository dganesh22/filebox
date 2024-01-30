import React, {  useState, useRef, useContext } from 'react'
import { toast } from 'react-toastify'
import  { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'


function Login() {
  const context = useContext(AuthContext)
  const setIsLogin =context.setIsLogin
  const setToken = context.setToken

  const [view,setView] = useState('email')
  const femail = useRef()
  const fmobile = useRef()
  const fpassword = useRef()

  // navigate instance 
  const navigate = useNavigate()


  const viewHandler = (val) => {
    setView(val)
  }

  // submit handler
  const submitHandler = async (e) => {
      e.preventDefault(); // to avoid page refresh  
    try {
          if(view === 'email') {
              let data = {
                email: femail.current.value,
                password: fpassword.current.value
              }
              console.log(`email login = `, data)
              authenticateUser(data)
            
          } else {
            let data = {
              mobile: fmobile.current.value,
              password: fpassword.current.value
            }
            console.log(`mobile login = `, data)
            authenticateUser(data)
          }
      } catch (err) {
        toast.error(err)
      }
  }

  const authenticateUser = async (user) => {
    await axios.post(`/api/auth/login`, user)
              .then(res => {
                toast.success(res.data.msg)
                setIsLogin(res.data.success)
                setToken(res.data.authToken)

                localStorage.setItem("CC_TOKEN", res.data.authToken)
                localStorage.setItem("CC_STATUS", res.data.success)

                window.location.href = '/'
                navigate(`/`)
              })
              .catch(err => toast.error(err.response.data.msg))
  }

  return (
    <div className='container'>

        <div className="row">
            <div className="col-md-12 text-center mt-3">
                <h3 className="display-3 text-primary">Login</h3>
            </div>
        </div>

        <div className="row mt-3">
            <div className="col-md-8 offset-md-2 col-sm-12 col-lg-6 offset-lg-3">
                <div className="card">
                  <div className="card-header">
                      <div className="btn-group d-flex justify-content-center">
                          <button onClick={() => viewHandler('email')}  className="btn btn-success">Email</button>
                          <button onClick={() => viewHandler('mobile')} className="btn btn-warning">Mobile</button>
                      </div>
                  </div>
                  <div className="card-body">
                      <form autoComplete="off" onSubmit={submitHandler}>
                          {
                            view === "email" ? (
                            <div className="form-group mt-2">
                              <label htmlFor="email">Email</label>
                              <input type="email" name="email" ref={femail} id="email" className="form-control" required/>
                            </div>) : (
                              <div className="form-group mt-2">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="number" name="mobile" ref={fmobile} id="mobile" className="form-control" required/>
                            </div>
                            )
                          }
                         
                          <div className="form-group mt-2">
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" ref={fpassword} id="password" className="form-control" required />
                          </div>
                          <div className="form-group mt-2">
                              <input type="submit" value="Login" className="btn btn-success" />
                          </div>
                      </form>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                          <div className="text-start">
                              <NavLink to={`/generate/password`} className={'btn btn-link text-success'}>Forgot Password?</NavLink>
                          </div>
                          <div className="text-end text-danger">
                              
                              <NavLink to={`/register`} className="btn btn-link text-danger">Register Here</NavLink>
                          </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
