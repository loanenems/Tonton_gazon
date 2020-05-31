import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

export default function OtherProfile() {
    const [data, setData] = useState({});
    let {id} = useParams();
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
        <div className="visit_profile_container">
            <div className="user_main_info">
                <img src={data.hasOwnProperty('User') ? data.User.profile_picture : ""} alt="Photo de profil"/>
                <h3>Profil de Théo Fromager</h3>
            </div>
            <div className="user_info">
                <h4>A propos de moi</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Nunc mattis enim ut tellus elementum. Massa vitae tortor
                    condimentum lacinia quis. Vulputate dignissim suspendisse
                    in est ante in. Et sollicitudin ac orci phasellus egestas.
                    Tortor consequat id porta nibh venenatis cras sed felis eget.
                    Arcu bibendum at varius vel pharetra. Et odio pellentesque diam
                    volutpat commodo sed egestas. Tortor pretium viverra suspendisse
                    potenti nullam ac tortor.</p>
            </div>
            <div className="user_stat">
                <h4>Statistiques</h4>
                <div className="user_stat_container">
                    <div className="user_stat_solo user_stat_rate">
                        <p className="stat_title">Note moyenne</p>
                        <p className="stat_info">4.5 <img src="./img/etoile_verte.svg" alt="étoile"/></p>
                    </div>
                    <div className="user_stat_solo user_stat_note">
                        <p className="stat_title">Nombre de notes</p>
                        <p className="stat_info">97</p>
                    </div>
                    <div className="user_stat_solo user_stat_number">
                        <p className="stat_title">Nombre de tonte</p>
                        <p className="stat_info">12</p>
                    </div>
                </div>
            </div>
            <a class="btn btn_primary" href="">Prendre contact avec Théo</a>
        </div>
    )
}
