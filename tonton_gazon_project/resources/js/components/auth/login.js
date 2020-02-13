import React, {useState} from 'react'
import Nav from '../navbar'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    let submit = (e) => {
        e.preventDefault();

        // We send login form's data to login route
        axios.post(
            'api/login', {
                email,
                password
            }).then(response => {
            // We store the received token
            const token = response.data['access_token'];
            // Then we assign the token to localStorage to keep track of it
            localStorage.setItem('access_token', token);
            // And set it as a default Authorization header (Bearer token)
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

            // Redirect to homepage
            history.push('/home');
        }).catch(error => {
            console.log(error);
        });
    };

    let change = (e) => {
        e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
    };

    return (
        <div>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" role="form" method="POST">

                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">Adresse mail</label>
                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email"
                                                   onChange={(e) => change(e)}
                                                   required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Mot de
                                            passe</label>
                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control"
                                                   name="password" onChange={(e) => change(e)} required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember"/> Se souvenir de moi
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-8 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary"
                                                    onClick={(e) => submit(e)}>
                                                Se connecter
                                            </button>
                                            <li className="btn btn-link">
                                                <Link to="forgotpassword">Mot de passe oublié ?</Link>
                                            </li>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
