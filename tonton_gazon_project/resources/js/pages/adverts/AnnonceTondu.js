import {addDynamicalForm} from "../../helpers";
import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";
import FormData from "form-data";

export default function AnnonceTondu() {
    const [gardens, setGardens] = useState([]);
    const [errors, setErrors] = useState([]);

    let history = useHistory();


    useEffect(() => {
        axios.get('/api/garden_get_id'
        ).then(res => {
            setGardens(res.data.jardin);
        });
    }, []);

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

    //This function handle the garden creation submit
    let handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        let dates = {};

        data.append('title', document.getElementById('title').value);
        data.append('description', document.getElementById('description').value);
        data.append('idGarden', document.getElementById('garden_id').value);
        data.append('payout', document.getElementById('salaire').value);
        data.append('type', 0);
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

    let gardenSelectJSX =
        gardens.map((g, i) => {
            return (
                <option key={i} value={g.id}>{g.description}</option>
            )
        });

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
                <label htmlFor="garden_id" className="form_label">Jardin</label>
                <select name="garden_id" className="form_input" id="garden_id">
                    {gardenSelectJSX}
                </select>
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
                <label className="form_label">Salaire</label>
                <input type="number" step="0.01" name="salaire" className="form_input"
                       placeholder="Définissez un salaire pour la tonte" id="salaire"/>
            </div>

            <div className="form_group" id="date_group">
                <label className="form_label">Date</label>
                <input type="date" name="date" className="form_input" id="date" placeholder="date"/>
            </div>

            <button className="btn btn_secondary" onClick={(e) => {
                e.preventDefault();
                addDynamicalForm();
            }}>Ajouter
            </button>

            <br/>
            <br/>
            <a href="" className="btn btn_primary" onClick={(e) => handleSubmit(e)}>Envoyer le formulaire</a>
        </form>
    )
}
