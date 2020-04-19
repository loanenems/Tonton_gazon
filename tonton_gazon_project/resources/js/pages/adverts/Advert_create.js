import React, {useState, useEffect} from 'react'
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import AnnonceTondu from "./AnnonceTondu";
import AnnonceTondeur from "./AnnonceTondeur";

export default function Advert_create() {
    let {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                    <Link to={`${url}/tondeur`}>Tondeur</Link>
                    <Link to={`${url}/tondu`}>Tondu</Link>
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

