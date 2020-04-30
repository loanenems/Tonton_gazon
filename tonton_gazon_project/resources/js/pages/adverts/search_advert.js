import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import axios from "axios";
import {urlFromFilter} from '../../helpers'

export default function Search_advert() {
    //This is used to access the URI parameters (search string, page number...)
    //State about storing the fetched adverts
    const [adverts, setAdverts] = useState({data: []});
    return (
        <div>
            {advertsJSX}
            {paginateJSX()}
        </div>
    )
}
