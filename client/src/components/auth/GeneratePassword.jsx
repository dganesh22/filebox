import React, { useState, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function GeneratePassword() {
    const [valid,setValid] = useState(false)
    const femail = useRef()
    const navigate = useNavigate()

    // validate email
    const validate = async () => {
            if(femail.current.value === null || femail.current.value === "") {
                toast.warning(`User email field has to be filled`)
            } else {
                await axios.post(`/api/auth/verify/user`, {
                    email: femail.current.value
                }).then(res => {
                    toast.success(res.data.msg)
                    setValid(res.data.success)
                }).catch(err => toast.error(err.response.data.msg))
            }
    }

    // generate password
    const genPassword = async () =>  {
        await axios.post(`/api/auth/generate/password/link`, {
            email: femail.current.value
        }).then(res => {
            toast.success(res.data.msg)
            navigate(`/password/reset?token=${res.data.token}`)
        }).catch(err => toast.error(err.response.data.msg))
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-primary">Generate Pasword</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <div className="form-group mt-2">
                            <div className="input-group">
                                <input type="email" name="email" ref={femail} id="email" className="form-control" placeholder='Enter your registered email id' readOnly={valid ? true : false}  />
                                {
                                    valid ? <button onClick={genPassword} className="btn btn-success">Generate Password Link</button> : 
                                    <button className="btn btn-primary" onClick={validate}>Verify Email ID</button>
                                }
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
  )
}

export default GeneratePassword