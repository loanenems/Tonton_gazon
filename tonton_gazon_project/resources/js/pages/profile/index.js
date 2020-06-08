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

    let statistiquesJSX = () => {
        if (data.hasOwnProperty('User')) {
            return (
                <>
                    <h3>Vos statistiques</h3>
                    <div className="card">
                        <div className="stat">
                            <span className="text">Note moyenne</span>
                            <span className="num">{data.User.eval}</span>
                        </div>
                        <div className="stat">
                            <span className="text">Nombre de notes</span>
                            <span className="num">{data.Statistiques}</span>
                        </div>
                        <div className="stat">
                            <span className="text">Nombre de tontes</span>
                            <span className="num">0</span>
                        </div>
                    </div>
                </>
            )
        }
        return "";
    };

    let handleChangePicture = () => {
        let data = new FormData();
        let img = document.getElementById('profile_pic').files[0];

        if (img !== undefined) {
            data.append('image', img, img.name);
        } else {
            data.append('image', "");
        }

        axios({
            method: 'post',
            url: '/api/updateProfilePic',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            window.location.reload();
        })
    };

    return (
        <div className="profile">
            <div className="sidebar">
                <div className="boxed">
                    <label htmlFor="profile_pic">
                        <img src={data.hasOwnProperty('User') ? data.User.profile_picture : ""} alt="Photo de profil"/>
                        <b className="profile_pic_change"><br />Changer de photo</b>
                        <input type="file" id="profile_pic" name="profile_pic" onChange={() => handleChangePicture()}/>
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
                {statistiquesJSX()}
            </div>
            <div className="profile-content">
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


