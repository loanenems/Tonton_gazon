import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

export default function OtherProfile() {
    const [data,setData] = useState({});
    let { id } = useParams();
    useEffect(() => {
        axios.get('/api/userInformations', {
                params: {
                    id: id
                }
            }
        ).then(res => {
            setData(res.data);
        });
    }, []);

    return (
        <>
            Mettre les informations de l'utilisateur ici
        </>
    )
}
