import React from 'react'
import Nav from '../../components/header'
import axios from "axios";
import {useHistory} from 'react-router-dom'

export default function Register() {
    const history = useHistory();

    let handleSubmit = (e) => {
        e.preventDefault();
        ('click');
        axios.post(
            '/api/register', {
                'name': document.getElementById('name').value,
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
                'password_confirmation': document.getElementById('password-confirm').value
            }).then(response => {
            // We store the received token
            const token = response.data['access_token'];
            // Then we assign the token to localStorage to keep track of it
            localStorage.setItem('access_token', token);
            localStorage.setItem('is_logged', 'true');
            // And set it as a default Authorization header (Bearer token)
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

            // Redirect to homepage
            history.push('/home');
        }).catch(error => {
            (error);
        });
    };

    return (
        <form className="bloc bloc_form" role="form" method="POST">
            <div className="bloc_title">
                <img src="./img/waving-hand-sign.png"></img>
                <h3>Inscription</h3>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="name">Nom</label>
                <input className="form_input" id="name" type="text" name="name" placeholder="Lacroix" required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="email">Email</label>
                <input className="form_input"  id="email" type="email" name="email"required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="password">Mot de passe</label>
                <input className="form_input" id="password" type="password" name="password" required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="password-confirm">Confirmation du mot de passe</label>
                <input className="form_input" id="password-confirm" type="password" name="password_confirmation" required/>
            </div>

            <a className="btn btn_primary"  onClick={(e) => handleReset(e)}>Créer mon compte</a>
            {/* <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary"> Créer mon compte </button> */}

        </form>
    );
}
