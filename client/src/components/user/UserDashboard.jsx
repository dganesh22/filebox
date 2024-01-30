import React, { useEffect, useState, useCallback, useContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

function UserDashboard() {
  const [docs,setDocs] = useState([])
  const { token } = useContext(AuthContext)

  const url = "https://node-express-auth.onrender.com"

  // callback hook 
  const getCallback = useCallback(() => {
    const getInput = async () => {
      await axios.get(`/api/file/all`,{
        headers: {
          Authorization: token
        }
      }).then(res => {
          setDocs(res.data.files)
      }).catch(err => toast.error(err.response.data.msg))
    }

    getInput()
  },[])

  // useMemo(() => {

  // },[])

  useEffect(() => {
    getCallback()
  },[])

  // delete handler 
  const deleteFile = async (id) => {
      if(window.confirm(`Are you sure to delete a file?`)) {
         await axios.delete(`/api/file/delete/${id}`, {
              headers: {
                Authorization: token
              }
          }).then(res => {
            toast.success(res.data.msg)
            window.location.reload()
          }).catch(err => toast.error(err.response.data.msg))
      }
  }

  return (
    <div className='container'>
    <div className="row">
        <div className="col-md-12 text-center mt-5">
            <h3 className="display-3 text-primary">User Dashboard</h3>
            <NavLink to={`/upload/new`} className="btn btn-danger float-end">
                <i className="bi bi-cloud"></i> Upload New
            </NavLink>
        </div>
    </div>

    <div className="row">
        {
            docs && docs.map((item,index) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                 
                    <div className="card file mt-3 mb-3">
                        <button className="btn btn-sm btn-danger position-absolute end-0 top-0" onClick={() => deleteFile(item._id)} >
                        <i className="bi bi-trash3"></i>
                        </button>
                        <NavLink to={`/view/file/${item._id}`}>
                        {
                           item.extName === ".png" || item.extName === ".jpg" ? <img src={`${url}/${item.newName}`} className='img-fluid' /> : null }
                        {
                          item.extName === ".pdf" ? <embed src={`https://blog.idrsolutions.com/app/uploads/2020/10/pdf-1.png`} className='img-fluid' /> : null
                        }

                        {
                           item.extName === ".pptx" || item.extName === ".ppt" ? <embed src={`https://www.freeiconspng.com/thumbs/ppt-icon/powerpoint-icon-microsoft-powerpoint-icon-network-powerpoint-icons-and-3.png`} className='img-fluid' /> : null
                        }

                        {
                           item.extName === ".docx" || item.extName === ".doc" ? <embed src={`https://img.freepik.com/premium-vector/doc-file-icon-flat-design-graphic-illustration-vector-docicon_666746-185.jpg`} className='img-fluid' /> : null
                        }
                           </NavLink>
                        <div className="card-body">
                          <h6 className="text-center text-success text-capitalize">
                             { item.info ? item.info.name : null } </h6>
                        </div>
                    </div>
                 
                </div>
              )
            })
        }
    </div>
</div>
  )
}

export default UserDashboard
