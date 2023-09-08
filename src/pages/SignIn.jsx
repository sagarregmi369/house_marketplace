import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const [showPassword, setShowPassword]=useState(false)
  const [formData, setFormData]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate()
  const onChangeHandler=(e)=>{
    setFormData(prevState=>{
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    })

  }
  const toggleShowPassword=()=>setShowPassword(prevState=>!prevState);

  const onSubmit=async(e)=>{
    e.preventDefault()
    try {
      const auth=getAuth()
    const userCredential=await signInWithEmailAndPassword(auth, formData.email, formData.password)

    if(userCredential.user){
      navigate('/')
    }
      
    } catch (error) {
      toast.error('Wrong User Credentials')
    }

  }
  
  return (
    <>
    <div className="pageConatiner">
      <header>
        <p className="pageHeader">
          Welcome Back!
        </p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            className="emailInput"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={onChangeHandler} 
          />
          <div className="passwordInputDiv">
            <input 
              type={showPassword?"text":"password"} 
              className="passwordInput" 
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={onChangeHandler} 
            />
            <img 
              src={VisibilityIcon} 
              alt="show password" 
              className="showPassword"
              onClick={toggleShowPassword} />
          </div>
          <Link 
            to="/forgot-password" 
            className='forgotPasswordLink'>
              Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px"/>
            </button>
          </div>
        </form>
        <OAuth/>
        <Link 
            to="/sign-up" 
            className='registerLink'>
              Sign Up Instead
          </Link>
      </main>
    </div>
    </>
  )
}

export default SignIn