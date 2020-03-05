import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import axios from "axios";

export default function Search_advert() {
    //This is used to access the URI parameters (search string, page number...)
    let query = new URLSearchParams(useLocation().search);
    //State about storing the fetched adverts
    const [adverts, setAdverts] = useState({data: []});
    //State about storing the current page
    const [currPage, setCurrPage] = useState(query.get('page'));

    const [currSearch, setCurrSearch] = useState({search: query.get('search'), page: query.get('page')});
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
        history.push("/search_advert?search=" + query.get('search') + "&page=" + e.target.id);
        setCurrPage(parseInt(e.target.id));
    };

    //----------Requests

    //Request fetching adverts corresponding to the search filter
    useEffect(() => {
        axios.get('/api/searchAdvert', {
                params: {
                    "search": query.get('search'),
                    "page": query.get('page'),
                }
            }
        ).then(res => {
            setAdverts(res.data.adverts);
            setCurrPage(res.data.adverts.current_page);
            setCurrSearch({search: query.get('search'), page: query.get('page')});
        });
    }, [currSearch]);

    return (
        <div>
            {advertsJSX}
            {paginateJSX()}
        </div>
    )
}
