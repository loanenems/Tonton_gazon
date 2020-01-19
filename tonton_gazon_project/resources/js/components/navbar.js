import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Tonton Gazon</a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
        </nav>
    );
}
