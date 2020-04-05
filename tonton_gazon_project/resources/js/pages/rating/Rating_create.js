import React, {useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function Rating_create() {
    let submit = (e) => {
        e.preventDefault();

        //We are creating a new FormData object
        let data = new FormData();
        let img = document.getElementById('image').files[0];

        //We are building the formData object which is going to be sent to the server
        data.append('image',img,img.name);
        data.append('description',document.getElementById('description').value);
        data.append('size',document.getElementById('size').value);
        data.append('movableObstacle',document.getElementById('movableObstacle').checked);
        data.append('unmovableObstacle',document.getElementById('unmovableObstacle').checked);
        data.append('pets',document.getElementById('pets').checked);
        data.append('equipment',document.getElementById('equipment').checked ? 1 : 0);

        //We make the post request to the GardenController who process the data
        axios({
            method: 'post',
            url: '/api/garden_add',
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

}