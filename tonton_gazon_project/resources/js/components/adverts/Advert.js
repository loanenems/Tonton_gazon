import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Advert() {

    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        axios.get('api/adverts'
        ).then(res => {
            setAdverts(res.data.advert);
        });
    }, []);

    let jsx = adverts.map((adv) => {
        return(
            <div>
                <h1>{adv.title}</h1>
                <span>{adv.description}</span>
            </div>
        )
    });


    return (
        <div>
            {jsx}
        </div>
    )
}