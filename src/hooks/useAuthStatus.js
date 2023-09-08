import React from 'react'
import {useEffect, useState, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'


const useAuthStatus = () => {
    const [loggedIn, setLoggedIn]= useState(false)
    const [checkingStatus, setCheckingStatus]= useState(true)
    const isMounted=useRef(true)

    useEffect(()=>{
        if(isMounted){
            const auth=getAuth()
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }

        return ()=>{
            isMounted.current=false
        } 
    },[isMounted])
    // Fix memory leak warning
    //https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks
  return {loggedIn, checkingStatus}
}
export {useAuthStatus}


