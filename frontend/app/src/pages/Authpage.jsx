import React, { useState } from 'react'
import LoginPage from './Login'
import SignUpForm from './Signup'


const Authpage = () => {
  const [isLoginpage_open,set_auth_page] = useState(true)
  const setAuthForm = ()=>{
    set_auth_page(!isLoginpage_open)
  }
  return (
    <div>
      {
        isLoginpage_open ? <LoginPage setForm={setAuthForm}/> : <SignUpForm setForm={setAuthForm}/>
      }
    </div>
  )
}

export default Authpage
