import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, Switch, useRouteMatch, useHistory, Link, useLocation} from "react-router-dom";
import Advert from "./Advert";
import SearchFilters from "../../components/search_filters";
import {urlFromFilter} from "../../helpers";


export default function Advert_Index() {

    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let {path, url} = useRouteMatch();
    let history = useHistory();
    let query = new URLSearchParams(useLocation().search);

    const [adverts, setAdverts] = useState({data: []});
    const [count, setCount] = useState(0);

    console.log(adverts);

    //----------Requests

    //Request fetching adverts corresponding to the search filter
    useEffect(() => {

        //Here, we define the various available params
        let params = {
            search: query.get('search'),
            page: query.get('page'),
            payout: query.get('payout'),
            eval: query.get('eval'),
            distance: query.get('distance'),
            position: query.get('position'),
            start_date: query.get('start_date'),
            end_date: query.get('end_date'),
        };

        axios.get('/api/searchAdvert', {
                params: params
            }
        ).then(res => {
            setAdverts(res.data.adverts);
        });
    }, [count]);

    /* This JSX handle the display of the paginate buttons
    Todo: Update the function to be adaptative depending on a nbDisplayedPages var
    */
    let paginateJSX = () => {
        //This array will contains the HTML Objects of each buttons
        let buttons = [];
        //We are creating an object to remember the infos about buttons rendering
        let display = {first_page: 0, current_page: adverts.current_page, last_page: 0};

        //If there is at least 1 result
        if (adverts.total > 0) {
            //If there are enough pages to display after the current (equal or more than 2)
            if (adverts.last_page - adverts.current_page >= 2) {
                //Then, we display 2 pages before and after the current
                display.first_page = adverts.current_page - 2;
                display.last_page = adverts.current_page + 2;
            } else {
                //Else, we display the five last pages
                display.first_page = adverts.last_page - 4;
                display.last_page = adverts.last_page;
            }
            //If there are less than 2 pages remaining to display before the beginning
            if (adverts.current_page - 1 < 2) {
                //Then we display the five first pages
                display.first_page = 1;
                display.last_page = (adverts.last_page - display.first_page) > 5 ? 5 : adverts.last_page;
            }

            //Once we've got all the informations, we can iterate and insert HTML Objects into the buttons[] array
            for (let i = display.first_page; i <= display.last_page; i++) {
                if (i !== adverts.current_page) {
                    buttons.push(<a id={i} style={{margin: 5 + 'px'}} onClick={(e) => handlePage(e)}>{i}</a>)
                } else {
                    //We don't want any change to be made while clicking the current page
                    buttons.push(<a id={i} style={{margin: 5 + 'px'}}>{i}</a>)
                }
            }
        }
        return buttons;
    };

    //----------Event handlers & callbacks

    //Called when the user wants to change the current page
    let handlePage = (e) => {
        e.preventDefault();
        history.push(urlFromFilter(e.target.id));
        setCount(count + 1);
    };

    let advertJSX = adverts.data.map((data) => {
        return (
            // Image
            // Nom utilisateur
            // Prix
            // Evaluation
            // Superficie

            <Link to={url + '/' + data.id}>
                {/* // Image */}
                <img src={JSON.parse(data.image).image_0}></img>
                <div className="advert_infos">
                    <div className="infos_first">
                        {/* // Nom utilisateur */}
                        <p className="info_name">{data.name}</p>
                        {/* // Prix */}
                        <p className="info_payout">{data.payout}€ ({(data.payout/data.size).toFixed(2)} par m²)</p>
                    </div>
                    <div className="infos_description">
                        <p className="info_payout">{data.description}</p>
                    </div>
                    <div className="infos_second">
                        {/* // Evaluation */}
                        <p className="info_note"><img src="./img/etoile_verte.svg"/>{data.xp}
                            <mark>({data.nbAvis})</mark>
                        </p>
                        {/* // Superficie */}
                        <p className="info_size">
                            <mark>Superficie :</mark>
                            {data.size}/m*
                        </p>
                    </div>
                </div>
            </Link>
        )
    });

    let updateState = () => {
        setCount(count + 1);
    };

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <div className="ttgz_advert_container">
                    <div className="advert_filter_container">
                        <SearchFilters updateState={updateState}/>
                    </div>
                    <div className="advert_list_container advert_list_container_grid">
                        {advertJSX}
                    </div>
                </div>
                {paginateJSX()}
            </Route>
            <Route path={`${path}/:id`}>
                <Advert/>
            </Route>
        </Switch>
    )
}
