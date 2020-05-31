import React from 'react'
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import AnnonceTondu from "./AnnonceTondu";
import AnnonceTondeur from "./AnnonceTondeur";

export default function Advert_create() {
    let {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <div className="advert_role_select_container">
                    <img src="./img/tondeur-tondu.png" alt=""/>
                    <Link to={`${url}/tondeur`} className="advert_role_select_tondeur">
                        <strong>Tondeur</strong>
                        <span>Voir les annonces des tondeurs</span>
                    </Link>
                    <Link to={`${url}/tondu`} className="advert_role_select_tondu">
                        <strong>Tondu</strong>
                        <span>Voir les annonces des tondus</span>
                    </Link>
                    <strong className="advert_role_select_info">Vous pourrez changer plus tard le type d'annonce
                        affiché</strong>
                </div>
            </Route>
            <Route path={`${path}/tondu`}>
                <AnnonceTondu/>
            </Route>
            <Route path={`${path}/tondeur`}>
                <AnnonceTondeur/>
            </Route>
        </Switch>
    );
}

