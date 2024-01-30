import React, { useRef, useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


function ResetPassword() {
    const [token,setToken] = useState(false)
    const [params,setParams] = useSearchParams()
    console.log(`token = `, params.get(`token`))

    useEffect(() => {
        setToken(params.get(`token`))
    },[params])

    const fpass = useRef()
    const fcpass = useRef()

    const navigate  = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let fp = fpass.current.value
            let cp = fcpass.current.value

            if(fp !== cp) {
                toast.warning(`Passwords are not matched`)
            } else {
                await axios.patch(`/api/auth/password/update`, {
                    password: fp
                } , {
                    headers: {
                        Authorization: `${token}`
                    }
                }).then(res => {
                    toast.success(res.data.msg)
                    navigate(`/login`)
                }).catch(err => toast.error(err.response.data.msg))
            }
        } catch (err) {
            toast.error(err.msg)
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Generate Password</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" method='post' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="pass">Password</label>
                                <input type="password" ref={fpass} name="pass" id="pass" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                            <label htmlFor="pass">Confirm Password</label>
                                <input type="password" ref={fcpass} name="cpass" id="cpass" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Reset Password" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ResetPassword