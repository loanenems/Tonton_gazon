import React, {useState} from 'react';
import axios from 'axios';

export default function Garden_create() {

    let submit = (e) => {
        e.preventDefault();

        //We are building the formData object which is going to be sent to the server
        let formData = {
          'description' : document.getElementById('description').value,
          'size' : document.getElementById('size').value,
          'movableObstacle' : document.getElementById('movableObstacle').checked,
          'unmovableObstacle' : document.getElementById('unmovableObstacle').checked,
          'pets' : document.getElementById('pets').checked,
          'equipment' : document.getElementById('equipment').checked,
        };

        //We make the post request to the GardenController who process the data
        axios({
            method: 'post',
            url: '/api/garden_add',
            data: formData,
        })
            .then(function (reponse) {
                //On traite la réponse envoyée par le serveur
                console.log(reponse);
            })
            .catch(function (erreur) {
                //On traite ici les erreurs éventuellement survenues
                console.log(erreur);
            });
    };

    return (
        <div>
            <form onSubmit={(e) => submit(e)} method="post">
                <label htmlFor="description">description</label>
                <input type="text" id="description" name="description"/>
                <br/>
                <label htmlFor="size">size</label>
                <input type="number" id="size" name="size"/>
                <br/>
                <label htmlFor="movableObstacle">movableObstacle</label>
                <input type="checkbox" id="movableObstacle" name="movableObstacle"/>
                <br/>
                <label htmlFor="unmovableObstacle">unmovableObstacle</label>
                <input type="checkbox" id="unmovableObstacle" name="unmovableObstacle"/>
                <br/>
                <label htmlFor="pets">pets</label>
                <input type="checkbox" id="pets" name="pets"/>
                <br/>
                <label htmlFor="equipment">equipment</label>
                <input type="checkbox" id="equipment" name="equipment"/>
                <br/>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}
