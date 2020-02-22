import React, {useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function Garden_create() {
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
                console.log(erreur);
            });
    };

    return (
        <>
            <form className="bloc bloc_form" onSubmit={(e) => submit(e)} method="post">
                <div className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h3>Creer un jardin</h3>
                </div>

                <div className="form_group">
                    <label htmlFor="description" className="form_label">description</label>
                    <input type="text" className="form_input" id="description" name="description"/>
                </div>

                <div className="form_group">
                    <label htmlFor="size" className="form_label">size</label>
                    <input type="number" className="form_input" id="size" name="size"/>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="movableObstacle" class="control control-checkbox">
                            movableObstacle
                                <input type="checkbox" id="movableObstacle" name="movableObstacle" />
                            <div class="control_indicator"></div>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="unmovableObstacle" class="control control-checkbox">
                            unmovableObstacle
                                <input type="checkbox" id="unmovableObstacle" name="unmovableObstacle" />
                            <div class="control_indicator"></div>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="pets" class="control control-checkbox">
                            Pets
                                <input type="checkbox" id="pets" name="pets" />
                            <div class="control_indicator"></div>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="equipment" class="control control-checkbox">
                            equipment
                                <input type="checkbox" id="equipment" name="equipment" />
                            <div class="control_indicator"></div>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <label htmlFor="image" className="form_label">image</label>
                    <input type="file" className="form_input" id="image" name="image" accept="image/png, image/jpeg"/>
                </div>

                <button type="submit">Envoyer</button>
            </form>
        </>
    );
}
