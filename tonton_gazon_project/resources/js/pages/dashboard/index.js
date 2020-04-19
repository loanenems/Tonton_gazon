import React from 'react'

import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";


import Profil from './Profil';
import Jardins from './Jardins';
import Annonces from './Annonces';
import Materiel from './Materiel';
import Notifications from './Notifications';
import Avis from './Avis';
import Virements from './Virements';
import Data from './Data';

export default function Dashboard() {
    let {path, url} = useRouteMatch();
    return (
        <div>
            <h2>Dashboard</h2>
            <ul>
                <li>
                    <Link to={`${url}`}>Mon profil</Link>
                </li>
                <li>
                    <Link to={`${url}/jardins`}>Mes jardins</Link>
                </li>
                <li>
                    <Link to={`${url}/annonces`}>Mes annonces</Link>
                </li>
                <li>
                    <Link to={`${url}/materiel`}>Mon materiel</Link>
                </li>
                <li>
                    <Link to={`${url}/notifications`}>Mes notifications</Link>
                </li>
                <li>
                    <Link to={`${url}/avis`}>Mes avis</Link>
                </li>
                <li>
                    <Link to={`${url}/virements`}>Mes virements</Link>
                </li>
                <li>
                    <Link to={`${url}/data`}>Mes données personnelles</Link>
                </li>
            </ul>
            
            <Switch>
                <Route exact path={path}>
                    <Profil/>
                </Route>
                <Route path={`${path}/jardins`}>
                    <Jardins/>
                </Route>
                <Route path={`${path}/annonces`}>
                    <Annonces/>
                </Route>
                <Route path={`${path}/materiel`}>
                    <Materiel/>
                </Route>
                <Route path={`${path}/notifications`}>
                    <Notifications/>
                </Route>
                <Route path={`${path}/avis`}>
                    <Avis/>
                </Route>
                <Route path={`${path}/virements`}>
                    <Virements/>
                </Route><Route path={`${path}/data`}>
                    <Data/>
                </Route>
            </Switch>
        </div>
    )
};


