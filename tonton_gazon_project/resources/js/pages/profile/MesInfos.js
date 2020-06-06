import React, {useEffect, useState} from 'react'
import axios from "axios";
import FormData from "form-data";


export default function MesInfos() {
    const [data, setData] = useState({});

    //Fetch the data regarding the current user's profile
    useEffect(() => {
        axios.get('/api/userInformations', {
                params: {
                    id: sessionStorage.getItem('user')
                }
            }
        ).then(res => {
            setData(res.data);
        });
    }, []);

    let handleChangeInformations = (e) => {
        e.preventDefault();
        axios.post('/api/updateInformations', {
            name: $('#name').val(),
            surname: $('#surname').val(),
            email: $('#email').val(),
            phone_number: $('#phone_number').val(),
            about_me: $('#about_me').val(),
        }).then(res => {

        }).catch(err => {

        });
    };

    if (data.hasOwnProperty("User")) {
        return (
            <div className="mes-infos">
                <div className="formulaire">
                    <form className="bloc bloc_form">
                        <div className="form_group">
                            <label className="form_label">Nom*</label>
                            <input id="name" name="name" className="form_input" type="text"
                                   defaultValue={data.User.name ? data.User.name : ''} placeholder="Votre nom"></input>
                        </div>

                        <div className="form_group">
                            <label className="form_label">Prénom*</label>
                            <input id="surname" name="surname" className="form_input" type="text"
                                   defaultValue={data.User.surname ? data.User.surname : ''}
                                   placeholder="Votre prénom"></input>
                        </div>

                        <div className="form_group">
                            <label className="form_label">Adresse e-mail*</label>
                            <input id="email" name="email" className="form_input" type="text"
                                   defaultValue={data.User.email ? data.User.email : ''}
                                   placeholder="Votre adresse e-mail"></input>
                        </div>

                        <div className="form_group">
                            <label className="form_label">Numéro de téléphone*</label>
                            <input id="phone_number" name="phone_number" className="form_input" type="text"
                                   defaultValue={data.User.phone_number ? data.User.phone_number : ''}
                                   placeholder="Votre numéro de téléphone"></input>
                        </div>

                        <div className="form_group">
                            <label className="form_label">À propos de moi</label>
                            <textarea id="about_me" name="about_me" className="form_input" cols="30" rows="5"
                                      defaultValue={data.User.about_me ? data.User.about_me : ''}
                                      placeholder="Présentez vous en quelques lignes..."></textarea>
                        </div>

                        <div className="button_group">
                            <a href="" className="btn btn_primary"
                               onClick={(e) => handleChangeInformations(e)}>Sauvegarder</a>
                            <a href="" className="btn btn_secondary">Annuler les modifications</a>
                        </div>
                    </form>
                </div>
                <div className="sidebar">
                    <h3>Votre porte monnaie</h3>
                    <div className="card">
                        <div className="stat">
                            <span className="text">Solde actuel</span>
                            <span className="num">13,00 €</span>
                            <a className="btn btn_primary" href="">Ajouter des fonds</a>
                        </div>
                    </div>
                    <h3>Vos notifications</h3>
                    <div className="card">
                        <div className="stat notif">
                            <span className="text">Vous avez un nouveau message</span>
                            <a className="btn btn_primary" href="">Voir les notifications</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
};
