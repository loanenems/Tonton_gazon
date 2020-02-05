import React, {useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function Garden_create() {

    const [limage, setLimage] = useState('');
    console.log(limage);

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
                'Content-Type': `multipart/form-data`,
            }
        })
            .then(function (reponse) {
                //On traite la réponse envoyée par le serveur
                setLimage(reponse.data);
            })
            .catch(function (erreur) {
                //On traite ici les erreurs éventuellement survenues
                console.log(erreur);
            });
    };

    return (
        <div>
            <img src={limage} alt="test"/>
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
                <label htmlFor="image">image</label>
                <input type="file" id="image" name="image" accept="image/png, image/jpeg"/>
                <br/>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}
