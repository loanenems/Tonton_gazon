import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, Switch, useRouteMatch, useHistory, Link} from "react-router-dom";
import Advert from "./Advert";


export default function Advert_Index() {

    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let {path, url} = useRouteMatch();
    let history = useHistory();

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/adverts'
        ).then(res => {
            setData(res.data.data);
        })
    }, []);

    let advertJSX = data.map((data) => {
        return (
            // Image
            // Nom utilisateur
            // Prix
            // Evaluation
            // Superficie

            <Link to={url+'/'+data.Advert.id}>
                {/* // Image */}
                <img src={JSON.parse(data.Garden.image).image_0}></img>
                <div className="advert_infos">
                    <div className="infos_first">
                        {/* // Nom utilisateur */}
                        <p className="info_name">{data.User.name}</p>
                        {/* // Prix */}
                        <p className="info_payout">{data.Advert.payout}€</p>
                    </div>
                    <div className="infos_description">
                        <p className="info_payout">{data.Advert.description}</p>
                    </div>
                    <div className="infos_second">
                        {/* // Evaluation */}
                        <p className="info_note"><img src="./img/etoile_verte.svg"/>{data.User.xp}
                            <mark>({data.User.nbAvis})</mark>
                        </p>
                        {/* // Superficie */}
                        <p className="info_size">
                            <mark>Superficie :</mark>
                            {data.Garden.size}/m*
                        </p>
                    </div>
                </div>
            </Link>
        )
    });

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <div className="ttgz_advert_container">
                    <div className="advert_filter_container">
                        <div className="bloc_title">
                            <img src="./img/waving-hand-sign.png"></img>
                            <h3>Annonces</h3>
                        </div>
                        <div className="advert_filter_display">
                            <p>Affichage : </p>
                            <a className="display_option display_grid active" data-display="advert_list_container_grid"
                               alt="Affichage en colonne"></a>
                            <a className="display_option display_row" data-display="advert_list_container_row"
                               alt="Affichage en ligne"></a>
                        </div>
                    </div>
                    <div className="advert_list_container advert_list_container_grid">
                        {advertJSX}
                    </div>
                </div>
            </Route>
            <Route path={`${path}/:id`}>
                <Advert/>
            </Route>
        </Switch>
    )
}
