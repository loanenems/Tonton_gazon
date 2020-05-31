import React, {useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function MesJardins() {

    const [adress, setAdress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({address: "", coordinates: {lat: null, lon: null}});

    let submit = (e) => {
        e.preventDefault();

        //We are creating a new FormData object
        let data = new FormData();
        let img = document.getElementById('image').files[0];

        //We are building the formData object which is going to be sent to the server
        if (img !== undefined) {
            data.append('image', img, img.name);
        } else {
            data.append('image', "");
        }
        data.append('description', document.getElementById('description').value);
        data.append('size', document.getElementById('size').value);
        data.append('movableObstacle', document.getElementById('movableObstacle').checked);
        data.append('unmovableObstacle', document.getElementById('unmovableObstacle').checked);
        data.append('pets', document.getElementById('pets').checked);
        data.append('equipment', document.getElementById('equipment').checked ? 1 : 0);
        data.append('address', selectedAddress.address === "" ? "" : JSON.stringify(selectedAddress));

        //Conditional data that are only needed if a checkbox is checked
        if (document.getElementById('movableObstacle').checked) {
            data.append('movableObstacle_details', document.getElementById('movableObstacle_details').value);
        }
        if (document.getElementById('unmovableObstacle').checked) {
            data.append('unmovableObstacle_details', document.getElementById('unmovableObstacle_details').value);
        }
        if (document.getElementById('pets').checked) {
            data.append('pets_details', document.getElementById('pets_details').value);
        }

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

    let handleAddress = (e) => {
        let val = e.target.value;
        if (val !== "") {
            axios.defaults.headers.common = {};
            axios.get('https://api-adresse.data.gouv.fr/search/', {
                params: {
                    q: val,
                    limit: 10,
                    autocomplete: 1,
                    type: "housenumber"
                }
            }).then(response => {
                setAdress(response.data.features);
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('access_token');
            });
        }
    };

    let handleSelect = (e) => {
        let lat = e.target.dataset.lat;
        let lon = e.target.dataset.lon;
        let address = {address: e.target.innerText, coordinates: {lat: lat, lon: lon}};
        document.getElementById('address').value = address.address;
        setSelectedAddress(address);
    };

    let adressJSX = adress.map((obj) => {
        return (
            <>
                <p className="garden_adress_suggestion"
                   data-lat={obj.geometry.coordinates[1]} data-lon={obj.geometry.coordinates[0]}
                   onClick={(e) => handleSelect(e)}>{obj.properties.label}</p>
            </>
        )
    });

    return (
        <div className="my_garden">
            <div className="my_garden_list">
                <div className="my_garden_solo">
                    <img className="my_garden_solo_img" src="/img/jardin.jpg" alt=""></img>
                    <div className="my_garden_solo_info">
                        <strong>Jardin n°1</strong>
                        <div className="my_garden_solo_picto">
                            <img src="/img/deplacable.png" alt="Objets déplacables"></img>
                            <img src="/img/non_deplacable.png" alt="Objets non déplacables"></img>
                            <img src="/img/pet.png" alt="Animaux"></img>
                        </div>
                        <p>Description en quelques lignes nan ?</p>
                        <b>Superficie de 200m²</b>
                        <a className="btn btn_primary">Modifier</a>
                    </div>
                </div>
                <div className="my_garden_solo">
                    <img className="my_garden_solo_img" src="/img/jardin.jpg" alt=""></img>
                    <div className="my_garden_solo_info">
                        <strong>Jardin n°1</strong>
                        <div className="my_garden_solo_picto">
                            <img src="/img/deplacable.png" alt="Objets déplacables"></img>
                            <img src="/img/non_deplacable.png" alt="Objets non déplacables"></img>
                            <img src="/img/pet.png" alt="Animaux"></img>
                        </div>
                        <p>Description en quelques lignes nan ?</p>
                        <b>Superficie de 200m²</b>
                        <a className="btn btn_primary">Modifier</a>
                    </div>
                </div>
            </div>

            <form className="bloc bloc_form" onSubmit={(e) => submit(e)} method="post">
                <div className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h3>Creer un jardin</h3>
                </div>

                <div className="form_group">
                    <label htmlFor="description" className="form_label">description</label>
                    <input type="text" className="form_input" id="description" name="description"
                           placeholder="Décrivez votre jardin en quelques mots"/>
                </div>

                <div className="form_group">
                    <label htmlFor="size" className="form_label">size</label>
                    <input type="number" className="form_input" id="size" name="size"
                           placeholder="Taille en m² de votre pelouse"/>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="movableObstacle" className="control control-checkbox">
                            MovableObstacle
                            <input type="checkbox" id="movableObstacle" name="movableObstacle"/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="movableObstacle_details"
                                   name="movableObstacle_details"
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="unmovableObstacle" className="control control-checkbox">
                            UnmovableObstacle
                            <input type="checkbox" id="unmovableObstacle" name="unmovableObstacle"/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="unmovableObstacle_details"
                                   name="unmovableObstacle_details"
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="pets" className="control control-checkbox">
                            Pets
                            <input type="checkbox" id="pets" name="pets"/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="pets_details" name="pets_details"
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <div className="checkbox_group">
                        <label htmlFor="equipment" className="control control-checkbox">
                            Equipment
                            <input type="checkbox" id="equipment" name="equipment"/>
                            <div className="control_indicator"></div>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <label htmlFor="image" className="form_label">Image</label>
                    <input type="file" className="form_input" id="image" name="image" accept="image/png, image/jpeg"/>
                </div>

                <div className="garden_adress_form form_group">
                    <label htmlFor="address" className="form_label">Adresse</label>
                    <input type="text" id="address" className="form_input" onKeyUp={(e) => handleAddress(e)}/>
                </div>

                <div className="garden_adress_suggestion_group">
                    {adressJSX}
                </div>

                <button className="garden_button btn btn_primary" type="submit">Envoyer</button>
            </form>
        </div>
    )
};
