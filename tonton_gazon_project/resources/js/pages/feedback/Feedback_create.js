import React, {useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function Feedback_create() {
    let submit = (e) => {
        e.preventDefault();

        //We are creating a new FormData object
        let data = new FormData();

        //We are building the formData object which is going to be sent to the server
        data.append('idTarget',document.getElementById('idTarget').value);
        data.append('title',document.getElementById('title').value);
        data.append('comment',document.getElementById('comment').value);
        data.append('rating',document.getElementById('rating').value);

        //We make the post request to the feedbackController who process the data
        axios({
            method: 'post',
            url: '/api/feedback_add',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(function (reponse) {

            })
            .catch(function (erreur) {
                //On traite ici les erreurs éventuellement survenues
                (erreur);
            });
    };

    return (
        <>
            <form className="bloc bloc_form" onSubmit={(e) => submit(e)} method="post">
                <div className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h3>Creer un avis</h3>
                </div>

                <div className="form_group">
                    <label htmlFor="idTarget" className="form_label">Id de la target</label>
                    <input type="text" className="form_input" id="idTarget" name="idTarget"/>
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
                        <input type="radio" id="star5" name="rating" value="5" /><label for="star5"></label>
                        <input type="radio" id="star4" name="rating" value="4" /><label for="star4"></label>
                        <input type="radio" id="star3" name="rating" value="3" /><label for="star3"></label>
                        <input type="radio" id="star2" name="rating" value="2" /><label for="star2"></label>
                        <input type="radio" id="star1" name="rating" value="1" /><label for="star1"></label>
                    </div>
                </div>

                <button className="btn btn-primary" type="submit">Envoyer</button>
            </form>
        </>
    );
}
