import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"

const ForgotPassword = () => {
  const [email, setEmail]= useState("")
  const onChangeHandler=(e)=>setEmail(e.target.value)
  
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      const auth =getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was send')
    } catch (error) {
      toast.error('Could not send reset email')
    }

  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmitHandler}>
          <input 
            type="email" 
            className='emailInput' 
            placeHolder='Email'
            name="email"
            value={email}
            onChange={onChangeHandler}/>
        </form>
        <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>
        <div className="signInBar">
          <div className="signInText">Send Reset Link</div>
          <button className="signInButton">
            <ArrowRightIcon fill='#ffffff' width="34px" height="34px"/>
          </button>
        </div>
      </main>
    </div>
  )
}

export default ForgotPassword