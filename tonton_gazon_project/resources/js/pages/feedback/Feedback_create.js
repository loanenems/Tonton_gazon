import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';

export default function Feedback_create() {

    const [errors, setErrors] = useState([]);
    let {id} = useParams();
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

    let submit = (e) => {
        e.preventDefault();

        //We are creating a new FormData object
        let data = new FormData();

        //We are building the formData object which is going to be sent to the server
        data.append('idTarget', id);
        data.append('title', document.getElementById('title').value);
        data.append('comment', document.getElementById('comment').value);
        data.append('rating', ($('.star_group').find(':checked').val() === undefined ? 0 : $('.star_group').find(':checked').val()));

        //We make the post request to the feedbackController who process the data
        axios({
            method: 'post',
            url: '/api/feedback_add',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(function (reponse) {
            history.push('/profil/'+id);
        }).catch(error => {
            setErrors([error.response.data.errors]);
        });
    };

    return (
        <>
            <form className="bloc bloc_form" onSubmit={(e) => submit(e)} method="post">
                <div className="bloc_title">
                    <img src="/img/waving-hand-sign.png"></img>
                    <h3>Creer un avis</h3>
                </div>

                <div className="form_error">
                    {errorsJSX()}
                </div>

                <div className="form_group">
                    <label htmlFor="title" className="form_label">Titre de l'avis</label>
                    <input type="text" className="form_input" id="title" name="title"/>
                </div>

                <div className="form_group">
                    <label htmlFor="comment" className="form_label">Commentaire de l'avis</label>
                    <input type="text" className="form_input" id="comment" name="comment"/>
                </div>

                <div className="form_group form_star">
                    <p className="form_label">Evaluation</p>
                    <div className="star_group">
                        <input type="radio" id="star5" name="rating" value="5"/><label htmlFor="star5"></label>
                        <input type="radio" id="star4" name="rating" value="4"/><label htmlFor="star4"></label>
                        <input type="radio" id="star3" name="rating" value="3"/><label htmlFor="star3"></label>
                        <input type="radio" id="star2" name="rating" value="2"/><label htmlFor="star2"></label>
                        <input type="radio" id="star1" name="rating" value="1"/><label htmlFor="star1"></label>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Envoyer</button>
            </form>
        </>
    );
}
