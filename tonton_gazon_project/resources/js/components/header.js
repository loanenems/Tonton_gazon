import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';
import {urlFromFilter} from '../helpers'

export default function Nav() {

    //We store the current loggin state into a var
    const [isLogged, setIsLogged] = useState('');

    if (isLogged !== localStorage.getItem('is_logged')) {
        setIsLogged(localStorage.getItem('is_logged'));
    }

    let history = useHistory();
    let handleSearch = (e) => {
        e.preventDefault();
        history.push(urlFromFilter());
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
                history.push('/');
            })
    };

    //This JSX display the different authentication buttons, depending on the current logging state of the user
    let jsxAuth = () => {
        if (isLogged === "true") {
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
            {/*Search bar*/}
            <input type="text" name="search" id="search"/>
            <button onClick={(e) => handleSearch(e)}>search</button>
            {/*Min payout for a job*/}
            <label htmlFor="payout">Tarif min</label>
            <input type="text" name="payout" id="payout"/>
            {/*user's level */}
            <div>
                <input type="radio" id="eval_1" name="eval" value="1"/>
                <label htmlFor="eval_1">1</label>
            </div>
            <div>
                <input type="radio" id="eval_2" name="eval" value="2"/>
                <label htmlFor="eval_2">2</label>
            </div>
            <div>
                <input type="radio" id="eval_3" name="eval" value="3"/>
                <label htmlFor="eval_3">3</label>
            </div>
            <div>
                <input type="radio" id="eval_4" name="eval" value="4"/>
                <label htmlFor="eval_4">4</label>
            </div>
            <div>
                <input type="radio" id="eval_5" name="eval" value="5"/>
                <label htmlFor="eval_5">5</label>
            </div>
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
                            <a href="#">HOME</a><br/>
                            <a href="#">ABOUT</a><br/>
                            <a href="#">WORK</a><br/>
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
