import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';

export default function Nav() {

    //We store the current loggin state into a var
    const [isLogged, setIsLogged] = useState(localStorage.getItem('is_logged'));
    let history = useHistory();

    let handleSearch = (e) => {
        e.preventDefault();
        history.push("/search_advert?search="+document.getElementById('search').value+"&page=1");
    };

    //Handle the action of logging out
    let handleLogout = (e) => {
        e.preventDefault();

        axios.get('/api/logout')
            .then(() => {
                //Once the user is disconnected, we can update the localStorage and re-render the component via State
                localStorage.setItem('access_token', '');
                localStorage.setItem('is_logged', 'false');
                setIsLogged('false');
            })
    };

    //This JSX display the different authentication buttons, depending on the current logging state of the user
    let jsxAuth = () => {
        if (localStorage.getItem('is_logged') === "true") {
            return (
                <>
                    <Link to="/mon-profil" className="navbar_element btn btn_primary">Mon profil</Link>
                    <a className="navbar_element btn btn_secondary" onClick={(e) => handleLogout(e)}>Logout</a>
                </>
            );
        } else {
            return (
                <>
                    <Link to="/login" className="navbar_element btn btn_secondary">Connexion</Link>
                    <Link to="/register" className="navbar_element btn btn_primary"> Inscription </Link>
                </>
            );
        }

    };

    return (
        <>
            <input type="text" name="search" id="search"/>
            <button onClick={(e) => handleSearch(e)}>search</button>
            <nav className="navbar">
                <div className="navbar_group navbar_brand">
                    <a className="navbar_element navbar_brand_group" href="">
                        <img src="/img/logo_noir.png" alt="Logo Tonton Gazon" className="navbar_brand_logo"></img>
                        <p className="navbar_brand_name">Tonton Gazon</p>
                    </a>
                </div>
                <div className="navbar_group navbar_links">
                    <a href="" className="navbar_element">Accueil</a>
                    <a href="" className="navbar_element">Un lien</a>
                    <a href="" className="navbar_element">Encore un lien</a>
                </div>
                <div className="navbar_group navbar_authentication">
                    {jsxAuth()}
                </div>
            </nav>

            <nav className="navbar_mobile inactive">
                <input id="toggle" type="checkbox"></input>
                <label htmlFor="toggle" className="navbar_hamburger">
                    <div className="top-bun"></div>
                    <div className="meat"></div>
                    <div className="bottom-bun"></div>
                </label>

                <div className="nav">
                    <div className="navbar_wrapper">
                        <div className="navbar_common">
                            <input type="text" className="navbar_search"></input>
                        </div>
                        <div className="navbar_links">
                            <a href="#">HOME</a><br />
                            <a href="#">ABOUT</a><br />
                            <a href="#">WORK</a><br />
                            <a href="#">SERVICES</a>
                        </div>
                        <div className="navbar_auth">
                            <Link to="/login" className="navbar_element btn btn_secondary_white">Connexion</Link>
                            <Link to="/register" className="navbar_element btn btn_primary_white"> Inscription </Link>
                        </div>
                    </div>
                </div>
                <div className="blackFilter"></div>
            </nav>
        </>
    );
}
