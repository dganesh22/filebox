import React, { useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FileUpload() {
  const [files,setFiles] = useState(false)
  const [loader,setLoader] = useState(false)
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  // get the file data onchange of file input
  const fileHandler = async (e) => {
    e.preventDefault()
    try {
      const fileData = e.target.files[0]
      // console.log(`fileData =`, fileData)
      if(!fileData) {
        toast.warning(`File input should not be empty`)
      } else if (fileData.size > 10 * 1024 * 1024) {
        toast.warning(`File size must be below 10Mb`)
      } else {
        setFiles(fileData)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }
  // submitting file to server
  const submitHandler = async (e) => {
      e.preventDefault()
      try {
        let formData = new FormData();
        formData.append("product",files)
        setLoader(true)

        await axios.post(`/api/file/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token
          }
        }).then(res => {
          setLoader(false)
          setFiles(false)
          toast.success(res.data.msg)
          navigate(`/user/dashboard`)
        }).catch(err => {
          setLoader(false)
          setFiles(false)
          toast.error(err.response.data.msg)
        })
      } catch (err) {
        toast.error(err.message)
      }
  }
  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
              <h3 className="display-3 text-success">FileUpload</h3>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4 col-lg-6 offset-lg-3 col-sm-12">
              <div className="card bg-dark text-light">
                <div className="card-body">
                   {
                      loader ? (
                          <div className="spinner-border text-success" style={{width: '3rem', height: '3rem'}} role='status'>
                              <span className="visually-hidden"></span>
                          </div>
                      ) : (
                        <form autoComplete="off" onSubmit={submitHandler}>
                        <div className="form-group mt-2 mb-3">
                          <input type="file" name="product" id="product" className="form-control" required hidden onChange={fileHandler} />
                            <label htmlFor="product" className='display-4'>
                                {
                                   files ? files.name : "Upload File"
                                }
                                <i className="bi bi-cloud-upload"></i>
                            </label>
                        </div>
                        <div className="form-group mt-2 mb-3">
                          <input type="submit" value="Upload" className="btn btn-success" />
                        </div>
                    </form>
                      )
                   }
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default FileUpload
