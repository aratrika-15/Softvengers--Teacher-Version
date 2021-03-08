import React from 'react'
import {NavbarItems} from './NavbarItems'
import logo from '../assets/imgs/Logo.png'
import './Navbar.css'


const Navbar = () => {
    return (
        <nav className = "NavbarItems">
            <h1 className="navbar-logo"><img src={logo} width="60" height="60"/>Softvengers</h1>
             <div className="menu-icon"></div>
             <ul>
                 {
                     NavbarItems.map((item,index)=>{
                         return (
                         <li key={index}>
                             <a className={item.cName} href={item.url}>
                                 {item.title}
                             </a>
                         </li>
                         ) 
                     })
                 }
                 
             </ul>
         </nav>
    )
}


export default Navbar
