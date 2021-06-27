import React from 'react'
import {Link} from "react-router-dom";
import { useCartContext } from '../context/CartContextProvider';


const Nav = () => {
  const {countCartItems} = useCartContext();
  let count = countCartItems();
    return (
        <header className="navigation">
        <div className="nav-one">
        <img src="/images/logo.png" className="logo" alt="" />
        <div className="input-group w-75">
        <i class="fa fa-search"></i>
        <input type="text" />
        </div>
        </div>
        <ul className="nav-two">
        <li className="each-nav large-text   white-text btn"><Link to="">Login</Link></li>
        <li className="each-nav bold"><Link>More <i class="fa fa-angle-down"></i></Link></li>
        <li className="each-nav bold"><Link to="/cart"><span className="count-notif">{count}</span><i class="fa fa-shopping-cart"></i> Cart </Link></li>
        </ul>
      
        </header>
    )
}

export default Nav
