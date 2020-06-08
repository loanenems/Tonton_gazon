import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FormData from 'form-data';

export default function MesJardins() {

    const [adress, setAdress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({address: "", coordinates: {lat: null, lon: null}});
    const [gardens, setGardens] = useState([]);
    const [cpt, setCpt] = useState(0);
    const [errors, setErrors] = useState([]);
    const [gardenEdit, setGardenEdit] = useState([]);

    useEffect(() => {
        axios.get('/api/garden_get_id'
        ).then(res => {
            setGardens(res.data.jardin);
        });
    }, [cpt]);

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

    let handleEdit = (e, idGarden) => {
        axios.get('/api/getGardenById', {
            params: {
                id: idGarden,
            }
        }).then(res => {
            setGardenEdit([res.data]);
        }).catch(err => {

        })
    };

    let submit = (e, method, gardenId=null) => {
        e.preventDefault();

        if (method === "add") {
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
                url: '/api/gardenAdd',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(function (reponse) {
                    setCpt(cpt + 1);
                }).catch(error => {
                setErrors([error.response.data.errors]);
            });
        }
        else {
            //We are creating a new FormData object
            let data = new FormData();
            let img = document.getElementById('image_edit').files[0];

            //We are building the formData object which is going to be sent to the server
            if (img !== undefined) {
                data.append('image', img, img.name);
            } else {
                data.append('image', "");
            }
            data.append('description', document.getElementById('description_edit').value);
            data.append('size', document.getElementById('size_edit').value);
            data.append('movableObstacle', document.getElementById('movableObstacle_edit').checked);
            data.append('unmovableObstacle', document.getElementById('unmovableObstacle_edit').checked);
            data.append('pets', document.getElementById('pets_edit').checked);
            data.append('equipment', document.getElementById('equipment_edit').checked ? 1 : 0);
            data.append('address', selectedAddress.address === "" ? "" : JSON.stringify(selectedAddress));
            data.append('garden_id',gardenId);


            //Conditional data that are only needed if a checkbox is checked
            if (document.getElementById('movableObstacle_edit').checked) {
                data.append('movableObstacle_details', document.getElementById('movableObstacle_details_edit').value);
            }
            if (document.getElementById('unmovableObstacle_edit').checked) {
                data.append('unmovableObstacle_details', document.getElementById('unmovableObstacle_details_edit').value);
            }
            if (document.getElementById('pets_edit').checked) {
                data.append('pets_details', document.getElementById('pets_details_edit').value);
            }

            //We make the post request to the GardenController who process the data
            axios({
                method: 'post',
                url: '/api/editGarden',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(function (reponse) {
                    setGardenEdit([]);
                }).catch(error => {
            });
        }
    };

    let handleRemove = (e, garden_id) => {
        e.preventDefault();

        axios.post('/api/deleteGarden', {
            id: garden_id
        }).then(res => {
            window.location.reload();
        }).catch(err => {

        })
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

    let cancelEdit = (e) => {
        e.preventDefault();
        setGardenEdit([]);
    }

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

    let FormGardenEditJSX = () => {
        return gardenEdit.map((garden, index) => {
            let movableChecked = () => {
                if (garden.movableObstacle) {
                    return (
                        <>
                            <input type="checkbox" id="movableObstacle_edit" name="movableObstacle_edit" defaultChecked/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="movableObstacle_details_edit"
                                   name="movableObstacle_details_edit" defaultValue={garden.movableObstacle}
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </>
                    );
                } else {
                    return (
                        <>
                            <input type="checkbox" id="movableObstacle_edit" name="movableObstacle_edit"/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="movableObstacle_details_edit"
                                   name="movableObstacle_details_edit"
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </>
                    );
                }
            };

            let unmovableChecked = () => {
                if (garden.unmovableObstacle) {
                    return (
                        <>
                            <input type="checkbox" id="unmovableObstacle_edit" name="unmovableObstacle_edit" defaultChecked/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="unmovableObstacle_details_edit"
                                   name="unmovableObstacle_details_edit" defaultValue={garden.unmovableObstacle}
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </>
                    );
                } else {
                    return (
                        <>
                            <input type="checkbox" id="unmovableObstacle_edit" name="unmovableObstacle_edit"/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="unmovableObstacle_details_edit"
                                   name="unmovableObstacle_details_edit"
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </>
                    );
                }
            };

            let petsChecked = () => {
                if (garden.pets) {
                    return (
                        <>
                            <input type="checkbox" id="pets_edit" name="pets_edit" defaultChecked/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="pets_details_edit"
                                   name="pets_details_edit" defaultValue={garden.pets}
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </>
                    );
                } else {
                    return (
                        <>
                            <input type="checkbox" id="pets_edit" name="pets_edit"/>
                            <div className="control_indicator"></div>
                            <input type="text" className="form_input form_hidden" id="pets_details_edit"
                                   name="pets_details_edit"
                                   placeholder="Décrivez en quelques mots les objets pouvant être déplacés"/>
                        </>
                    );
                }
            };

            let equipmentChecked = () => {
                if (garden.equipment == 1) {
                    return (
                        <> <input type="checkbox" id="equipment_edit" name="equipment_edit" defaultChecked/>  </>
                    );
                } else {
                    return (
                        <> <input type="checkbox" id="equipment_edit" name="equipment_edit"/>  </>
                    );
                }
            };

            return (
                <form className="bloc bloc_form" onSubmit={(e) => submit(e, "edit",garden.id)} method="post">
                    <div id="modifier" className="bloc_title">
                        <img src="./img/waving-hand-sign.png"></img>
                        <h3>Modifier le jardin selectionné</h3>
                    </div>

                    <div className="form_error">
                        {errorsJSX()}
                    </div>

                    <div className="form_group">
                        <label htmlFor="description" className="form_label">description</label>
                        <input type="text" className="form_input" id="description_edit" name="description_edit"
                               defaultValue={garden.description} placeholder="Décrivez votre jardin en quelques mots"/>
                    </div>

                    <div className="form_group">
                        <label htmlFor="size" className="form_label">size</label>
                        <input type="number" className="form_input" id="size_edit" name="size_edit"
                               defaultValue={garden.size} placeholder="Taille en m² de votre pelouse"/>
                    </div>
                    <div className="form_group">
                        <div className="checkbox_group">
                            <label htmlFor="movableObstacle_edit" className="control control-checkbox">
                                Objets déplacables
                                {movableChecked()}
                            </label>
                        </div>
                    </div>

                    <div className="form_group">
                        <div className="checkbox_group">
                            <label htmlFor="unmovableObstacle_edit" className="control control-checkbox">
                                Objets non déplacables
                                {unmovableChecked()}
                            </label>
                        </div>
                    </div>

                    <div className="form_group">
                        <div className="checkbox_group">
                            <label htmlFor="pets_edit" className="control control-checkbox">
                                Animaux
                                {petsChecked()}
                            </label>
                        </div>
                    </div>

                    <div className="form_group">
                        <div className="checkbox_group">
                            <label htmlFor="equipment_edit" className="control control-checkbox">
                                Equipement
                                {equipmentChecked()}
                                <div className="control_indicator"></div>
                            </label>
                        </div>
                    </div>

                    <div className="form_group">
                        <label htmlFor="image_edit" className="form_label">Image</label>
                        <input type="file" className="form_input" id="image_edit" name="image_edit"
                               accept="image/png, image/jpeg"/>
                    </div>

                    <div className="garden_adress_form form_group">
                        <label htmlFor="address_edit" className="form_label">Adresse</label>
                        <input type="text" id="address_edit" defaultValue={garden.address} className="form_input"
                               onKeyUp={(e) => handleAddress(e)}/>
                    </div>

                    <div className="garden_adress_suggestion_group">
                        {adressJSX}
                    </div>

                    <button className="garden_button btn btn_primary" type="submit">Envoyer</button>
                    <a className="btn btn_secondary" onClick={(e) => cancelEdit(e)}>Annuler</a>
                </form>
            );
        });
    };

    let JardinJSX = gardens.map((garden, index) => {
        //Parse the images string to an object
        const images = JSON.parse(garden.image);
        //This array will stock the <img/> html with images src
        const jsxImages = [];
        //Iterating the object to create the html node
        for (let [key, value] of Object.entries(images)) {
            jsxImages.push(<img className="my_garden_solo_img" src={value} alt=""></img>);
        }
        ;

        let movableJSX = () => {
            if (garden.movableObstacle === true) {
                return (<img src="/img/deplacable.png" alt="Objets déplacables" style={{opacity: 1}}></img>);
            } else {
                return (<img src="/img/deplacable.png" alt="Objets déplacables" style={{opacity: 0.25}}></img>);
            }
        }

        let unmovableJSX = () => {
            if (garden.unmovableObstacle === true) {
                return (<img src="/img/non_deplacable.png" alt="Objets déplacables" style={{opacity: 1}}></img>);
            } else {
                return (<img src="/img/non_deplacable.png" alt="Objets déplacables" style={{opacity: 0.25}}></img>);
            }
        }

        let petsJSX = () => {
            if (garden.pets === true) {
                return (<img src="/img/pet.png" alt="Objets déplacables" style={{opacity: 1}}></img>);
            } else {
                return (<img src="/img/pet.png" alt="Objets déplacables" style={{opacity: 0.25}}></img>);
            }
        }

        //Then returning the structure displaying all the informations
        return (
            <div className="my_garden_solo" key={index}>
                {jsxImages}
                <div className="my_garden_solo_info">
                    <strong>Jardin n°{index + 1}</strong>
                    <div className="my_garden_solo_picto">
                        {movableJSX()}
                        {unmovableJSX()}
                        {petsJSX()}
                    </div>
                    <p>{garden.description}</p>
                    <b>Superficie : {garden.size}m²</b>
                    <div>
                        <a className="btn btn_primary btn_modify_garden"
                           onClick={(e) => handleEdit(e, garden.id)}>Modifier</a>
                        <a href="" onClick={(e) => handleRemove(e, garden.id)}><img src="/img/trash.png"
                                                                                    alt="supprimer l'annonce"></img></a>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="my_garden">
            <div className="my_garden_list">
                {JardinJSX}
            </div>

            {FormGardenEditJSX()}

            <form className="bloc bloc_form" onSubmit={(e) => submit(e, "add")} method="post">
                <div id="modifier" className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h3>Creer un jardin</h3>
                </div>

                <div className="form_error">
                    {errorsJSX()}
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
                <a className="btn btn_secondary" onClick={(e) => cancelEdit(e)}>Annuler</a>
            </form>
        </div>
    )
};
