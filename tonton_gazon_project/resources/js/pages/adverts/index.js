import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Index() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/adverts'
        ).then(res => {
            setData(res.data.data);
            (res.data.data);
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
            {jsx}
        </div>
    )
}
