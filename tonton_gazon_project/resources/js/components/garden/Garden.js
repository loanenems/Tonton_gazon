import React from 'react';
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom';
import Garden_create from './Garden_create';


export default function Garden() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let {path, url} = useRouteMatch();

    return (
        <div>
            <ul>
                <li>
                    <Link to={`${url}/garden_create`}>Créer un jardin</Link>
                </li>
            </ul>
            <Switch>
                <Route path={`${path}/garden_create`}>
                    <Garden_create/>
                </Route>
            </Switch>
        </div>
    );
}