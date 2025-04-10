import React, { useEffect, useState } from 'react'
import { getCurrentUserDetails, redirectLogin } from '../../request/APIManager'
import { useNavigate, useParams } from 'react-router-dom';


function StudentLogin({setUserRole}) {
const navigation = useNavigate();
const [authStatus, setAuthStatus] = useState(true)
const { id, key } = useParams();
const login = async () => {
    const response = await redirectLogin(key, setUserRole)
    if (!response) {
        setAuthStatus(false)
        return
    }
    if (response) {
        const quest = await getCurrentUserDetails()
        if (!quest) {
            setAuthStatus(false)
            return
        }
        navigation("/")
    }
}
useEffect(() => {
    login()
}, [])
  return (
    <div>{authStatus ? "Logging in..." : "Authentication Failed!"}</div>
  )
}

export default StudentLogin