import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import axios from "axios";


export default function MesAnnonces() {
    const [data, setData] = useState([]);
    let history = useHistory();
    //Fetch the data regarding the current user's profile
    useEffect(() => {
        axios.get('/api/advertGetOwner', {
                params: {
                    id: sessionStorage.getItem('user')
                }
            }
        ).then(res => {
            setData(res.data.data);
        });
    }, []);

    let handleRedirect = (e, id) => {
        e.preventDefault();
        history.push('/profil/' + id);

    };

    let responseJSX = data.map((d, i) => {
        return d.Advert.responseList.map((r, i) => {
            return (
                <div key={i}>
                    <p>Vous avez reçu une réponse pour votre annonce {d.Advert.title} !</p>
                    <a href="" className="btn btn_primary" onClick={(e) => handleRedirect(e, r.idMowerer)}>Voir
                        le profil de l'utilisateur</a>
                </div>
            )
        });

    });

    return (
        <>
            <p><b>Liste des réponses reçues</b></p>
            {responseJSX}
        </>
    )
};
