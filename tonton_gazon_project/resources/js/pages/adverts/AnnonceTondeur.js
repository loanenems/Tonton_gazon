import React from "react";
import {addDynamicalForm} from "../../helpers";
import FormData from "form-data";
import axios from "axios";

export default function AnnonceTondeur() {
    let handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        let dates = {};

        data.append('title', document.getElementById('title').value);
        data.append('description', document.getElementById('description').value);
        data.append('payout', document.getElementById('payout').value);
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
            (res);
        })
    };
    return (
        <form className="bloc bloc_form">
            <div className="bloc_title">
                <img src="../../img/waving-hand-sign.png"/>
                <h3>Creer une annonce</h3>
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
