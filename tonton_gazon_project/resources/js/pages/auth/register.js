import React from 'react'
import Nav from '../../components/header'
import axios from "axios";
import {useHistory} from 'react-router-dom'

export default function Register() {
    const history = useHistory();

    let handleSubmit = (e) => {
        e.preventDefault();
        let checkedRadio = null;
        for(let radio of document.getElementsByName('role')) {
            if(radio.checked) {
                checkedRadio = radio;
            }
        }
        axios.post(
            '/api/register', {
                'name': document.getElementById('name').value,
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
                'password_confirmation': document.getElementById('password-confirm').value,
                'primary_role': parseInt(checkedRadio.value),
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
            console.log(error);
        });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" role="form" method="POST">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-md-4 control-label">Nom</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text" className="form-control" name="name" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">Adresse Mail</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email"
                                                   required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Mot de
                                            passe</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control"
                                                   name="password" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password-confirm" className="col-md-4 control-label">Confirmation
                                            du mot de passe</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm" type="password" className="form-control"
                                                   name="password_confirmation" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password-confirm" className="col-md-4 control-label">Confirmation
                                            du mot de passe</label>

                                        <div className="col-md-6">
                                            <input type="radio" id="mowerer" name="role" value="0"/>
                                            <label htmlFor="mowerer">Tondeur</label>
                                            <input type="radio" id="mowered" name="role" value="1"/>
                                            <label htmlFor="mowered">Tondu</label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <button type="submit" onClick={(e) => handleSubmit(e)}
                                                    className="btn btn-primary">
                                                Créer mon compte
                                            </button>
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
