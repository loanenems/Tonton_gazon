import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="navbar">
            <div className="navbar_group navbar_brand">
                <a className="navbar_element navbar_brand_group" href="">
                    <img src="./img/logo_noir.png" alt="Logo Tonton Gazon" className="navbar_brand_logo"></img>
                    <p className="navbar_brand_name">Tonton Gazon</p>
                </a>
            </div>
            <div className="navbar_group navbar_links">
                <Link to="/login" className="navbar_element">Login</Link>
                <Link to="/register" className="navbar_element">Register</Link>
            </div>
            <div className="navbar_group navbar_authentication">
                <Link to="/login" className="navbar_element btn btn_secondary">Connexion</Link>
                <Link to="/register" className="navbar_element btn btn_primary">Inscription</Link>
            </div>
        </nav>
    );
}
 