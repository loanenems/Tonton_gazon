import React, {useState, useEffect} from 'react';
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom';
import Garden_create from './Garden_create';
import axios from "axios";


export default function Garden() {
    const [gardens, setGardens] = useState([]);

    useEffect(() => {
        axios.get('/api/garden_get_id'
        ).then(res => {
            setGardens(res.data.jardin);
        });
    }, []);

    let jsxGarden = gardens.map((garden) => {
        //Parse the images string to an object
        const images = JSON.parse(garden.image);
        //This array will stock the <img/> html with images src
        const jsxImages = [];
        //Iterating the object to create the html node
        for(let [key,value] of Object.entries(images)){
            jsxImages.push(<img src={value} alt="photo de jardin"/>);
        }
        //Then returning the structure displaying all the informations
        return (
            <div>
                <p>{garden.description}</p>
                <p>{garden.size}</p>
                <p>{garden.movableObstacle}</p>
                <p>{garden.unmovableObstacle}</p>
                <p>{garden.pets}</p>
                <p>{garden.equipment}</p>
                {jsxImages}
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
