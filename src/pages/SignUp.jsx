import React, {useState} from 'react'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

//Firebase Documentation on Add and initialize the Authentication SDK
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
//Firebase Documentation on set a document
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'

import {db} from '../firebase.config'

const SignUp = () => {
  const [showPassword, setShowPassword]=useState(false)
  const [formData, setFormData]=useState({
    name:"",
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
  
  const onSubmit= async (e)=>{
    e.preventDefault()
    
    try {
      //Firebase Documentation on Add and initialize the Authentication SDK
      const auth=getAuth()
      const userCredential= await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user=userCredential.user
      updateProfile(auth.currentUser, {
        displayName:formData.name
      })
      //Firebase Documentation on set a document
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timeStamp= serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
      
    } catch (error) {
      toast.error('Something went wrong with registration')
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
            type="text" 
            className="nameInput"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={onChangeHandler} 
          />
          <input 
            type="email" 
            className="emailInput"
            name="email"
            placeholder="Email"
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
          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px"/>
            </button>
          </div>
        </form>
        <OAuth/>
        <Link 
            to="/sign-in" 
            className='registerLink'>
              Sign In Instead
          </Link>
      </main>
    </div>
    </>
  )
}

export default SignUp