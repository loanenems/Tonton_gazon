import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import axios from "axios";
import {urlFromFilter} from '../../helpers'

export default function Search_advert() {
    //This is used to access the URI parameters (search string, page number...)
    let query = new URLSearchParams(useLocation().search);
    //State about storing the fetched adverts
    const [adverts, setAdverts] = useState({data: []});

    //State about storing the current page and the current search
    const [currPage, setCurrPage] = useState(query.get('page'));
    const [currSearch, setCurrSearch] = useState(query.get('search'));
    const [currPayout, setCurrPayout] = useState(query.get('min_salary'));
    const [currEval, setCurrEval] = useState(query.get('eval'));
    const [currStartDate, setCurrStartDate] = useState(query.get('start_date'));
    const [currEndDate, setCurrEndDate] = useState(query.get('end_date'));
    const [currDistance, setCurrDistance] = useState(query.get('distance'));
    const [currPos, setCurrPos] = useState(query.get('position'));

    //We check if the search term and the page number has changed (we do it here because the handler is in header.js)
    if (query.get('search') !== currSearch) {
        setCurrSearch(query.get('search'));
    }
    if (query.get('page') !== currPage) {
        setCurrPage(query.get('page'));
    }
    if (query.get('payout') !== currPayout) {
        setCurrPayout(query.get('payout'));
    }
    if (query.get('eval') !== currEval) {
        setCurrEval(query.get('eval'));
    }
    if (query.get('start_date') !== currStartDate) {
        setCurrStartDate(query.get('start_date'));
    }
    if (query.get('end_date') !== currEndDate) {
        setCurrEndDate(query.get('end_date'));
    }
    if (query.get('distance') !== currDistance) {
        setCurrDistance(query.get('distance'));
    }
    if (query.get('position') !== currPos) {
        setCurrPos(query.get('position'));
    }

    //This is used to update the URI once a page button has been clicked
    let history = useHistory();

    //----------JSXs

    //This JSX display informations about each advert
    let advertsJSX = adverts.data.map((adv) => {
        return (
            <>
                <h1>{adv.title}</h1>
            </>
        )
    });

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
                if (i !== currPage) {
                    buttons.push(<a id={i} style={{margin: 5 + 'px'}} onClick={(e) => handlePage(e)}>{i}</a>)
                } else {
                    //We don't want any change to be made while clicking the current page
                    buttons.push(<a id={i} style={{margin: 5 + 'px'}}>{i}</a>)
                }
            }
        }
        return buttons;
    };

    //----------Event handlers

    //Called when the user wants to change the current page
    let handlePage = (e) => {
        e.preventDefault();
        history.push(urlFromFilter(e.target.id));
        setCurrPage(parseInt(e.target.id));
    };

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
            setCurrPage(query.get('page'));
            setCurrSearch(query.get('search'));
            setCurrPayout(query.get('payout'));
            setCurrEval(query.get('eval'));
            setCurrDistance(query.get('distance'));
            setCurrPos(query.get('position'));
            setCurrStartDate(query.get('start_date'));
            setCurrEndDate(query.get('end_date'));
        });
    }, [currPage, currSearch, currPayout, currEval, currDistance, currPos, currEndDate, currStartDate]);

    return (
        <div>
            {advertsJSX}
            {paginateJSX()}
        </div>
    )
}
