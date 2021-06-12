import React, { useEffect } from 'react'
import { Redirect } from 'react-router'

const Logout: React.FC = () => {
    useEffect(()=>{
        localStorage.removeItem("jwt")
        window.location.replace("/")
    },[])
    return (
      <p></p>
    )
}

export default Logout
