import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, Switch, useRouteMatch, useHistory} from "react-router-dom";
import Advert from "./Advert";


export default function Index() {

    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let {path} = useRouteMatch();
    let history = useHistory();

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/adverts'
        ).then(res => {
            setData(res.data.data);
            (res.data.data);
        }).catch(error => {
            if(error.response.status === 401) {
                history.push('/login');
            }
            else if(error.response.status === 403) {
                history.push('/');
            }
        });
    }, []);

    let jsx = data.map((data) => {
        return (
            <div>
                <h1>{data.Advert.title}</h1>
                <span>{data.Advert.description}</span>
            </div>
        )
    });

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    {jsx}
                </Route>
                <Route exact path={path+'/:id'}>
                    <Advert/>
                </Route>
            </Switch>
        </div>
    )
}
