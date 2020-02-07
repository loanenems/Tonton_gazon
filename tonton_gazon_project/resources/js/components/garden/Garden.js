import React, {useState, useEffect} from 'react';
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom';
import Garden_create from './Garden_create';
import axios from "axios";


export default function Garden() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('api/garden_images'
        ).then(res => {
            setImages(res.data);
        });
    }, []);

    let jsxImage = images.map((i) => {
        return (
            <img src={i}/>
        )
    });
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let {path, url} = useRouteMatch();

    return (
        <div>
            {jsxImage}
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
