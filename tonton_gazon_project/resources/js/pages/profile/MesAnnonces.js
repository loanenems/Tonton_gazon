import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import axios from "axios";


export default function MesAnnonces() {
    const [data, setData] = useState([]);
    const [responses, setResponses] = useState([]);
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
    useEffect(() => {
        axios.get('/api/getResponses', {
                params: {
                    id: sessionStorage.getItem('user')
                }
            }
        ).then(res => {
            setResponses(res.data.response);
        });
    }, []);

    console.log(responses);

    let handleRedirect = (e, id) => {
        e.preventDefault();
        history.push('/profil/' + id);
    };

    let handleResponse = (e, response, advertId) => {
        e.preventDefault();
        axios.post('/api/respondUpdate', {
            state: response,
            advertId: advertId
        }).then(res => {
            window.location.reload();
        }).catch(err => {

        });
    };

    let asMowererJSX = responses.map((response, i) => {
        if (response.idMowerer === parseInt(sessionStorage.getItem('user'))) {
            if (response.state === 0) {
                return (
                    <div key={i}>
                        <p>Attente d'accord pour la tonte du jardin</p>
                        <a href="" className="btn btn_primary" onClick={(e) => handleRedirect(e, response.idMowered)}>Voir
                            le profil de l'utilisateur</a>
                    </div>
                )
            } else if (response.state === 1) {
                return (
                    <div key={i}>
                        <p>Vous êtes tous les deux d'accord !</p>
                        <a href="" className="btn btn_primary" onClick={(e) => handleRedirect(e, response.idMowered)}>Voir
                            le profil de l'utilisateur</a>
                    </div>
                )
            }
        }
    });

    let asMoweredJSX = data.map((d, i) => {
        return d.Advert.responseList.map((r, i) => {
            if (r.idMowered === d.User.id) {
                if (r.state === 0) {
                    return (
                        <div key={i}>
                            <p>Vous avez reçu une réponse pour votre annonce {d.Advert.title}</p>
                            <a href="" className="btn btn_primary" onClick={(e) => handleRedirect(e, r.idMowerer)}>Voir
                                le profil de l'utilisateur</a>
                            <a href="" className="btn btn_primary"
                               onClick={(e) => handleResponse(e, 1, d.Advert.id)}>Accepter</a>
                            <a href="" className="btn btn_primary"
                               onClick={(e) => handleResponse(e, 2, d.Advert.id)}>Refuser</a>
                        </div>
                    )
                }
            }
        });
    });

    return (
        <>
            <p><strong>Vos demandes</strong></p>
            {asMowererJSX}
            <p><strong>Vos receptions</strong></p>
            {asMoweredJSX}
        </>
    )
};
