import React, {useState} from 'react'
import {Link, useHistory, useRouteMatch, Switch, Route} from 'react-router-dom'
import axios from 'axios';
import Error from "../error";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    let {path, url} = useRouteMatch();

    if (sessionStorage.getItem('is_logged') === 'true') {
        //The user is redirected to index
        history.push('/');
    }

    let errorsJSX = () => {
        //Ce tableau va contenir l'ensemble des messages d'erreur
        let messages = [];

        //On parcours l'objet contenant la/les erreurs pour chaque champ
        errors.map((error, index) => {
            for (let [key, value] of Object.entries(error)) {
                //Key = nom du champ
                //value = tableau contenant un ou plusieurs messages d'erreur
                
                value.map((message, index) => {
                    messages.push(message);
                });
            }
        });

        //On construit l'affichage
        return messages.map((message, index) => {
            return (
                <div key={index}>
                    <p>{message}</p>
                </div>
            )
        })
    };

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
            // Then we assign the token to sessionStorage to keep track of it
            sessionStorage.setItem('access_token', token);
            sessionStorage.setItem('is_logged', 'true');
            sessionStorage.setItem('user', response.data['user'].id);
            // And set it as a default Authorization header (Bearer token)
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
            window.location.reload();
        }).catch(error => {
            if(error.response.status == 409) {
                // Mauvais mail
                setErrors(error.response.data);
            } else if ( error.response.status == 403 ) {
                setErrors(error.response.data);
            } else {
                setErrors([error.response.data.errors]);
            }
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
                        <img src="/img/waving-hand-sign.png"></img>
                        <h3>Connexion</h3>
                    </div>

                    <div className="form_error">
                        {errorsJSX()}
                    </div>

                    <div className="form_group">
                        <label className="form_label" htmlFor="email">Adresse mail</label>
                        <input className="form_input" id="email" type="email" name="email"
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
                    <Link className="btn btn_secondary" to={`${url}/reset_password`}>Mot de passe oublié ?</Link>
                </form>
            </Route>
            <Route path={`${path}/reset_password`}>
                <form className="bloc bloc_form">
                    <div className="bloc_title">
                        <img src="/img/waving-hand-sign.png"></img>
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
        </Switch>
    );
}
