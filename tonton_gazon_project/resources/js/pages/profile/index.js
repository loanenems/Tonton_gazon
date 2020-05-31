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

    return (
        <div class="profile">
            <div class="sidebar">
                <div class="boxed">
                    <img src="https://avatarfiles.alphacoders.com/108/thumb-108953.png" alt="profile-pic"></img>
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


