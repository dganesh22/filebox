import React, { useRef } from 'react'
import  {NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

function Register() {
  const fname = useRef();
  const femail = useRef();
  const fmobile = useRef();
  const fpassword = useRef();

  // to navigate 
  const navigate = useNavigate()

  // submithandler = 
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data  = {
        name: fname.current.value,
        email: femail.current.value,
        mobile: fmobile.current.value,
        password: fpassword.current.value
      }

      console.log(`regster =`, data )
      await axios.post(`/api/auth/register`, data)
        .then(res => {
            toast.success(res.data.msg)
            navigate(`/login`)
        })
        .catch(err => toast.error(err.response.data.msg))
    } catch (err) {
      toast.error(err)
    }
  }
  return (
    <div className='container'>
    <div className="row">
        <div className="col-md-12 text-center mt-5">
            <h3 className="display-3 text-primary">Register</h3>
        </div>
    </div>

    <div className="row">
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
          <div className="card">
              <div className="card-body">
                <form autoComplete="off" onSubmit={submitHandler}>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" ref={fname} id="name" className="form-control" required />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" ref={femail} id="email" className="form-control" required />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="mobile">Mobile</label>
                      <input type="number" name="mobile" ref={fmobile} id="mobile" className="form-control" required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" ref={fpassword} id="password" className="form-control" required />
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" value="Register" className="btn btn-warning" />
                    </div>
                </form>
              </div>
              <div className="card-footer">
                  <p className="text-end">
                      <strong>Already registered?</strong>
                      <NavLink to={`/login`} className="btn btn-link">Login Here</NavLink>
                  </p>
              </div>
          </div>
      </div>
    </div>
</div>
  )
}

export default Register
