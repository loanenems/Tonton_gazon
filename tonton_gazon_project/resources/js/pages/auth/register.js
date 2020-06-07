import React, {useState} from 'react'
import axios from "axios";
import {Link, useHistory} from 'react-router-dom'

export default function Register() {
    const history = useHistory();

    const [errors, setErrors] = useState([]);

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

    let handleSubmit = (e) => {
        e.preventDefault();
        let checkedRadio = null;
        for (let radio of document.getElementsByName('role')) {
            if (radio.checked) {
                checkedRadio = radio;
            }
        }
        axios.post(
            '/api/register', {
                'name': document.getElementById('name').value,
                'surname': document.getElementById('surname').value,
                'birthday': document.getElementById('birthday').value,
                'email': document.getElementById('email').value,
                'password': document.getElementById('password').value,
                'password_confirmation': document.getElementById('password-confirm').value,
            }).then(response => {
            // Redirect to homepage
            history.push('/informations');
        }).catch(error => {
            setErrors([error.response.data.errors]);
        });
    };

    return (
        <form className="bloc bloc_form" role="form" method="POST">
            <div className="bloc_title">
                <img src="./img/waving-hand-sign.png"></img>
                <h3>Inscription</h3>
            </div>

            <div className="form_error">
                {errorsJSX()}
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="name">Nom</label>
                <input className="form_input" id="name" type="text" name="name" placeholder="Lacroix" required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="surname">Prénom</label>
                <input className="form_input" id="surname" type="text" name="surname" placeholder="Jean" required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="email">Email</label>
                <input className="form_input" id="email" type="email" name="email" required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="birthday">Date de naissance</label>
                <input className="form_input" id="birthday" type="date" name="birthday" required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="password">Mot de passe</label>
                <input className="form_input" id="password" type="password" name="password" required/>
            </div>

            <div className="form_group">
                <label className="form_label" htmlFor="password-confirm">Confirmation du mot de passe</label>
                <input className="form_input" id="password-confirm" type="password" name="password_confirmation"
                       required/>
            </div>

            <a href="/" className="btn btn_primary" onClick={(e) => handleSubmit(e)}>Créer mon compte</a>
            <Link className="btn btn_secondary" to={`/login`}>Vous avez déja un compte ?</Link>
            {/* <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary"> Créer mon compte </button> */}
        </form>
    );
}
