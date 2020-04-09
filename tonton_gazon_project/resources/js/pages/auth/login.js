import React, {useState} from 'react'
import {Link, useHistory, useRouteMatch ,Switch, Route} from 'react-router-dom'
import axios from 'axios';
import Error from "../error";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    let {path, url} = useRouteMatch();


    let submit = (e) => {
        e.preventDefault();

        // We send login form's data to login route
        axios.post(
            '/api/login', {
                email,
                password
            }).then(response => {
            // We store the received token
            const token = response.data['access_token'];
            // Then we assign the token to localStorage to keep track of it
            localStorage.setItem('access_token', token);
            localStorage.setItem('is_logged', 'true');
            // And set it as a default Authorization header (Bearer token)
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

            // Redirect to homepage
            history.push('/');
        }).catch(error => {
            (error);
        });
    };

    let handlePasswordReset = (e) => {
        e.preventDefault();

        axios.post('/api/create', {
            'email': email
        }).then((response) => {
            (response.data);
        })
    };

    let change = (e) => {
        e.target.name === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
    };

    return (
        <Switch>
            <Route exact path={path}>
                <form className="bloc bloc_form" role="form" method="POST">
                    <div className="bloc_title">
                        <img src="./img/waving-hand-sign.png"></img>
                        <h3>Connexion</h3>
                    </div>

                    <div className="form_group">
                        <label className="form_label" htmlFor="email">Adresse mail</label>
                        <input className="form_input"id="email" type="email" name="email"
                                    onChange={(e) => change(e)} value={email} required/>
                    </div>

                    <div className="form_group">
                        <label className="form_label" htmlFor="password">Mot de passe</label>
                        <input className="form_input" id="password" type="password"
                                    name="password" onChange={(e) => change(e)} required/>
                    </div>

                    <div className="form_group">
                        <div class="checkbox_group">
                            <label class="control control-checkbox">
                                Se souvenir de moi
                                    <input type="checkbox" name="remember"/>
                                <div class="control_indicator"></div>
                            </label>
                        </div>
                    </div>

                    <a href="" className="btn btn_primary" onClick={(e) => submit(e)}>Envoyer le formulaire</a>
                    <Link className="btn btn_secondary" to={`${url}/reset`}>Mot de passe oublié ?</Link>
                </form>
            </Route>
            <Route path={`${path}/reset`}>
                <form className="bloc bloc_form">
                    <div className="bloc_title">
                        <img src="./img/waving-hand-sign.png"></img>
                        <h3>Réinitialiser votre mot de passe</h3>
                    </div>
                    <div className="form_group">
                        <input id="email" type="email" className="form_input" name="email"
                           onChange={(e) => change(e)} value={email}
                           required placeholder="Votre adresse mail"/>
                    </div>
                    <a href="" className="btn btn_primary" onClick={(e) => handlePasswordReset(e)}>Réinitialiser</a>
                </form>
            </Route>
            <Route exact={false} component={Error}/>
        </Switch>
    );
}
