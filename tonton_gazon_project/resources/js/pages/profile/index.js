import React, {useEffect, useState} from 'react'

import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

import MesInfos from './MesInfos';
import MesJardins from './MesJardins';
import MesAnnonces from './MesAnnonces';
import axios from "axios";

export default function Profile() {
    let {path, url} = useRouteMatch();
    const [data, setData] = useState({});

    //Fetch the data regarding the current user's profile
    useEffect(() => {
        axios.get('/api/userInformations', {
                params: {
                    id: sessionStorage.getItem('user')
                }
            }
        ).then(res => {
            setData(res.data);
        });
    }, []);

    let handleChange = () => {
        let data = new FormData();
        let img = document.getElementById('profile_pic').files[0];
        console.log(img);
        if (img !== undefined) {
            data.append('image', img, img.name);
        } else {
            data.append('image', "");
        }

        axios({
            method: 'post',
            url: '/api/updateInformations',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            window.location.reload();
        })
    };

    return (
        <div class="profile">
            <div class="sidebar">
                <div class="boxed">
                    <label for="profile_pic">
                        <img src={data.hasOwnProperty('User') ? data.User.profile_picture : ""} alt="Photo de profil"/>
                        <b className="profile_pic_change"><br />Changer de photo</b>
                        <input type="file" id="profile_pic" name="profile_pic" onChange={() => handleChange()}/>
                    </label>
                    <h2>Mon profil</h2>
                </div>
                <h3>Vos liens utiles</h3>
                <ul>
                    <li>
                        <Link to={`${url}`}>Mes informations</Link>
                    </li>
                    <li>
                        <Link to={`${url}/jardins`}>Mes jardins</Link>
                    </li>
                    <li>
                        <Link to={`${url}/annonces`}>Mes annonces</Link>
                    </li>
                </ul>
                <h3>Vos statistiques</h3>
                <div class="card">
                    <div class="stat">
                        <span class="text">Note moyenne</span>
                        <span class="num">4,5</span>
                    </div>
                    <div class="stat">
                        <span class="text">Nombre de notes</span>
                        <span class="num">97</span>
                    </div>
                    <div class="stat">
                        <span class="text">Nombre de tontes</span>
                        <span class="num">12</span>
                    </div>
                </div>
            </div>
            <div class="profile-content">
                <Switch>
                    <Route exact path={path}>
                        <MesInfos/>
                    </Route>
                    <Route path={`${path}/jardins`}>
                        <MesJardins/>
                    </Route>
                    <Route path={`${path}/annonces`}>
                        <MesAnnonces/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
};


