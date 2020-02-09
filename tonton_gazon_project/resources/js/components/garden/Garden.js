import React, {useState, useEffect} from 'react';
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom';
import Garden_create from './Garden_create';
import axios from "axios";


export default function Garden() {
    const [gardens, setGardens] = useState([]);

    useEffect(() => {
        axios.get('api/garden_get_id'
        ).then(res => {
            setGardens(res.data.jardin);
        });
    }, []);

    let jsxGarden = gardens.map((garden) => {
        let images = JSON.parse(garden.image);
        return (
            <div>
                <p>{garden.description}</p>
                <p>{garden.size}</p>
                <p>{garden.movableObstacle}</p>
                <p>{garden.unmovableObstacle}</p>
                <p>{garden.pets}</p>
                <p>{garden.equipment}</p>
            </div>
        )
    });

    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let {path, url} = useRouteMatch();

    return (
        <div>
            {jsxGarden}
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
