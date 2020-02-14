import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import axios from "axios";

export default function Search_advert() {
    const [adverts, setAdverts] = useState({data: []});
    const [currPage, setCurrPage] = useState(1);
    const maxPages = 5;

    let history = useHistory();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let handlePage = (e) => {
        e.preventDefault();
        history.push("/search_advert?search=" + query.get('search') + "&page=" + e.target.id);
        setCurrPage(parseInt(e.target.id));
    };

    let query = useQuery();

    useEffect(() => {
        axios.get('api/advert_search', {
                params: {
                    "search": query.get('search'),
                    "page": query.get('page'),
                }
            }
        ).then(res => {
            setAdverts(res.data.adverts);
            setCurrPage(res.data.adverts.current_page);
        });
    }, [currPage]);

    let advertsJSX = adverts.data.map((adv) => {
        return (
            <>
                <h1>{adv.title}</h1>
            </>
        )
    });

    let paginateJSX = () => {
        let buttons = [];
        let display = {first_page: 0, current_page: adverts.current_page, last_page: 0};


        //Gesture of the first displayed page
        if (adverts.last_page - 4 >= 1) {
            display.first_page = adverts.current_page - 4;
        } else {
            display.first_page = 1;
        }

        //Gesture of the last displayed page
        if (display.first_page + 4 <= adverts.last_page) {
            display.last_page = display.first_page + 4;
        } else {
            display.last_page = adverts.last_page;
        }

        console.log(display);

        for (let i = display.first_page; i <= display.last_page; i++) {
            buttons.push(<a id={i} style={{margin: 5 + 'px'}} onClick={(e) => handlePage(e)}>{i}</a>)
        }
        return buttons;
    };


    return (
        <div>
            {advertsJSX}
            {paginateJSX()}
        </div>
    )
}