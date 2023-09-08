import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {getAuth, updateProfile} from 'firebase/auth'
import {toast} from "react-toastify"
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

const Profile = () => {
  const auth=getAuth()
  const [editDetails, setEditDetails]=useState(false)
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  
  const onLogOutHandler=()=>{
    auth.signOut()
    navigate('/')
  }

  const changeDetailsHandler=()=>{
    editDetails && onSubmitHandler()
    setEditDetails(prevState=>!prevState)
    // Problem here
    
  }
  const onChangeHandler=(e)=>{
    setFormData(prevState=>{
      return{
        ...prevState,
        [e.target.name]:e.target.value
      }
    })
  }
  const onSubmitHandler=async()=>{
    try {
      if(auth.currentUser.displayName  !== formData.name){
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: formData.name
        })
      }
      // Update in firestore
      const userRef= doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name: formData.name
      } )
      
    } catch (error) {
      toast.error("Cound not update profile details")
      console.log(error);
    }
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" onClick={onLogOutHandler}>Log Out</button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={changeDetailsHandler}>{/*  problem here */}
            {editDetails?'Done': 'Change'}
          </p>
        </div>
        <div className="profileCard">
          <form onSubmit={onSubmitHandler} >
            <input 
              type="text" 
              name="name" 
              className={!editDetails? 'profileName':'profileNameActive'} 
              value={formData.name}
              disabled={!editDetails}
              onChange={onChangeHandler}
            />
            <input 
              type="email" 
              name="email" 
              className={!editDetails? 'profileName':'profileNameActive'} 
              value={formData.email}
              disabled
              onChange={onChangeHandler}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  )
}

export default Profile