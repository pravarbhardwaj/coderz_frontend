import React, { useEffect, useState } from 'react'
import { getCurrentUserDetails, redirectLogin } from '../../request/APIManager'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';


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
    <div className="flex items-center justify-center h-screen bg-gray-50">
  {authStatus ? (
   <Loading login={true} />
  ) : (
    <div className="text-2xl text-red-600 font-semibold">Authentication Failed!</div>
  )}
</div>

  )
}

export default StudentLogin