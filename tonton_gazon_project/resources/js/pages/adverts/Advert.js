import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import axios from "axios";

export default function Advert() {

    const [data, setData] = useState({advert: {}, rating: null});

    //Getting the ID of the current advert
    let {id} = useParams();
    let history = useHistory();

    useEffect(() => {
        axios.get('/api/advertGetId', {
                params:
                    {id: id}
            }
        ).then(res => {
            if(res.data.advert !== null) {
                setData(res.data);
            } else {
                history.push('/adverts');
            }
        });
    }, []);

    let advertJSX =
        (
            <>
                <h1>{data.rating}</h1>
                <span>{data.advert.title}</span>
            </>
        );


    return (
        <>
            {advertJSX}
        </>
    )
}
