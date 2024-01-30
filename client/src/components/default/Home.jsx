import React, { useEffect, useState, useCallback} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

function Home() {
  const [docs,setDocs] = useState([])
  const url = "https://node-express-auth.onrender.com"

  // callback hook 
  const getCallback = useCallback(() => {
    const getInput = async () => {
      await axios.get(`/api/file/open`).then(res => {
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


  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center mt-5">
                <h3 className="display-3 text-primary">Files</h3>
            </div>
        </div>

        <div className="row">
            {
                docs && docs.map((item,index) => {
                  return (
                    <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                      {/* <NavLink to={`/view/file/${item._id}`}> */}
                        <div className="card file mt-3 mb-3">
                            {
                               item.extName === ".png" || item.extName === ".jpg" ? <img src={`${url}/${item.newName}`} className='img-fluid' /> : null
                            }
                            {
                              item.extName === ".pdf" ? <embed src={`https://blog.idrsolutions.com/app/uploads/2020/10/pdf-1.png`} className='img-fluid' /> : null
                            }

                            {
                               item.extName === ".pptx" || item.extName === ".ppt" ? <embed src={`https://www.freeiconspng.com/thumbs/ppt-icon/powerpoint-icon-microsoft-powerpoint-icon-network-powerpoint-icons-and-3.png`} className='img-fluid' /> : null
                            }

                            {
                               item.extName === ".docx" || item.extName === ".doc" ? <embed src={`https://img.freepik.com/premium-vector/doc-file-icon-flat-design-graphic-illustration-vector-docicon_666746-185.jpg`} className='img-fluid' /> : null
                            }
                            <div className="card-body">
                              <h6 className="text-center text-success text-capitalize">
                                 { item.info ? item.info.name : null } </h6>
                            </div>
                        </div>
                        {/* </NavLink> */}
                    </div>
                  )
                })
            }
        </div>
    </div>
  )
}

export default Home
