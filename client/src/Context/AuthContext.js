import axios from 'axios'
import React, { useState, createContext, useEffect } from 'react'
import { toast } from 'react-toastify'

// context 
export const AuthContext = createContext()

// context provider component
function AuthProvider(props) {
    const [isAdmin,setIsAdmin] = useState(false)
    const [isUser,setIsUser] = useState(false)
    const [isLogin,setIsLogin] = useState(false)
    const [currentUser,setCurrentUser] = useState(false)
    const [token,setToken] = useState(false)

    const checkAuth = async () => {
        if(localStorage.getItem("CC_TOKEN") && localStorage.getItem("CC_STATUS")) {
          // when login success
          let aToken = localStorage.getItem("CC_TOKEN")
          let aStatus = localStorage.getItem("CC_STATUS")
            setToken(aToken)
            if(aStatus) {
              setIsLogin(true)
            }
            
            // access the user info based on token
            await axios.get(`/api/auth/current/user`, {
              headers: {
                Authorization: aToken
              }
            }).then(res => {
                setCurrentUser(res.data.user)
                if(res.data.user.role === "user") setIsUser(true)
                if(res.data.user.role === "admin") setIsAdmin(true)
            })
            .catch(err => toast.error(err.response.data.message))
        } else {
          // when logout or login error
          setToken(false)
          setIsLogin(false)
          setIsUser(false)
          setIsAdmin(false)
          setCurrentUser(false)
        }
    }


    useEffect(() => {
        checkAuth()

        // unmount
        return () => {
          checkAuth()
        }
    },[isUser,isAdmin])

  return (
    <AuthContext.Provider value={{ isAdmin, isUser, isLogin, setIsLogin, currentUser, setIsUser,setCurrentUser, setIsAdmin, token, setToken }}>
        { props.children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
