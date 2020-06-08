import React, {useEffect, useState} from 'react';
import {addDynamicalForm} from "../../helpers";
import {useHistory} from 'react-router-dom';
import FormData from "form-data";
import axios from "axios";

export default function AnnonceTondeur() {

    const [errors, setErrors] = useState([]);
    let history = useHistory();

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
        let data = new FormData();
        let dates = {};

        data.append('title', document.getElementById('title').value);
        data.append('description', document.getElementById('description').value);
        data.append('payout', document.getElementById('payout').value);
        data.append('type', 1);
        for (let date of $('#date_group').find('input[type="date"]')) {
            dates[$(date).attr('id')] = $(date).val();
        }
        data.append('date', JSON.stringify(dates));

        axios({
            method: 'post',
            url: '/api/addAdvert',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            history.push('/adverts?page=1&equipment=false&type=0');
        }).catch(error => {
            setErrors([error.response.data.errors]);
        });
    };
    return (
        <form className="bloc bloc_form">
            <div className="bloc_title">
                <img src="../../img/waving-hand-sign.png"/>
                <h3>Creer une annonce</h3>
            </div>

            <div className="form_error">
                {errorsJSX()}
            </div>

            <div className="form_group">
                <label htmlFor="title" className="form_label">Titre</label>
                <input type="text" name="title" className="form_input" id="title"/>
            </div>

            <div className="form_group">
                <label className="form_label">Description</label>
                <textarea name="description" className="form_input" cols="30" rows="5" id="description"
                          placeholder="Décrivez votre annonce"/>
            </div>

            <div className="form_group">
                <label htmlFor="payout" className="form_label">Salaire désiré</label>
                <input type="number" step="0.01" name="payout" className="form_input" id="payout"/>
            </div>

            <div className="form_group" id="date_group">
                <label className="form_label">Date</label>
                <input type="date" name="date" className="form_input" id="date" placeholder="date"/>
            </div>

            <button onClick={(e) => {
                e.preventDefault();
                addDynamicalForm();
            }}>Ajouter
            </button>
            <br/>
            <a href="" className="btn btn_primary" onClick={(e) => handleSubmit(e)}>Envoyer le formulaire</a>
        </form>
    )
}
