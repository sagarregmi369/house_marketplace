import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

const NavBar = () => {
    const navigate=useNavigate()
    const location = useLocation()
    const pathChecker=(route)=> route === location.pathname? true: false
    
  return (
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListitem" onClick={()=>navigate('/')}>
                    <ExploreIcon fill={pathChecker('/')?"#2c2c2c":"#8f8f8f"} width="36px" height="36px"/>
                    <p className={pathChecker('/')?"navbarListItemNameActive":"navbarListItemName"}>Explore</p>
                </li>
                <li className="navbarListitem" onClick={()=>navigate('/offers')}>
                    <OfferIcon fill={pathChecker('/offers')?"#2c2c2c":"#8f8f8f"} width="36px" height="36px"/>
                    <p className={pathChecker('/offers')?"navbarListItemNameActive":"navbarListItemName"}>Offers</p>
                </li>
                <li className="navbarListitem" onClick={()=>navigate('/profile')}>
                    <PersonOutlineIcon fill={pathChecker('/profile')?"#2c2c2c":"#8f8f8f"} width="36px" height="36px"/>
                    <p className={pathChecker('/profile')?"navbarListItemNameActive":"navbarListItemName"}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default NavBar