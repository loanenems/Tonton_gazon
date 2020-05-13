import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {useParams} from 'react-router-dom';

export default function Advert() {
    let {id} = useParams();

    const [data, setData] = useState({});


    useEffect(() => {
        Axios.get("/api/advertGetId", {params: {id: id}})
            .then(res => {
                setData(res.data.data);
            });
    }, []);

    let AdvertDetailJSX = (() => {
        if (!data.hasOwnProperty('User')) {
            return (
                <>
                </>
            );
        } else {
            let imgList = [];
            let imgJSX = [];
            for (const image in data.Garden.image) {
                imgList.push(data.Garden.image[image]);
            }
            imgList.map((src) => {
                imgJSX.push(<img src={src} alt=""/>);
            });
            return (
                <div className="advert_detail_container">
                    <div className="advert_head">
                        <div className="advert_bloc advert_image">
                            <div className="advert_slider advert_slider_big">
                                <img src="./img/jardin.jpg" alt="" />
                                <img src="./img/jardin.jpg" alt="" />
                                <img src="./img/jardin.jpg" alt="" />
                                <img src="./img/jardin.jpg" alt="" />
                            </div>
                            <div className="advert_slider advert_slider_small">
                                <img src="./img/jardin.jpg" alt=""/>
                                <img src="./img/jardin.jpg" alt=""/>
                                <img src="./img/jardin.jpg" alt=""/>
                                <img src="./img/jardin.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="advert_bloc advert_main_info">
                            <div className="advert_main_title">
                                <img src="./img/pierre-alain.jpg" alt=""/>
                                <p>Jardin de {data.User.name}</p>
                            </div>
                            <p className="advert_bloc_title">
                                <img src="./img/information-source.png" alt=""/>
                                <strong>Informations sur l'annonce</strong>
                            </p>
                            <div className="advert_main_info_list">
                                <p className="advert_price">Tarif au m²
                                    : <i>{(data.Advert.payout / data.Garden.size).toFixed(2)} €</i></p>
                                <p className="advert_size">Superficie : <i>{data.Garden.size} m²</i></p>
                                <p className="advert_feedback">Note moyenne : <i>4.7/5</i> <a href="">Voir toutes les
                                    évaluations</a></p>
                                <p className="advert_total_price">Paiement final : <i>{data.Advert.payout} €</i></p>
                            </div>
                            <div className="advert_main_info_action">
                                <a href="" className="btn btn_primary">Répondre à l'annonce</a>
                                <a href="" className="btn btn_secondary">Envoyer un message</a>
                            </div>
                        </div>
                    </div>
                    <div className="advert_bloc advert_more_info">
                        <div className="advert_description">
                            <p className="advert_bloc_title">
                                <img src="./img/memo.png" alt=""/>
                                <strong>Description de l'annonce</strong>
                            </p>
                            <p>{data.Advert.description}</p>
                        </div>

                        <div className="advert_more">
                            <p className="advert_bloc_title">
                                <img src="./img/information-source.png" alt=""/>
                                <strong>Informations supplémentaires</strong>
                            </p>
                            <ul>
                                <li>{data.Garden.movableObstacle !== "false" ? data.Garden.movableObstacle : "Aucun"}</li>
                                <li>{data.Garden.unmovableObstacle !== "false" ? data.Garden.unmovableObstacle : "Aucun"}</li>
                                <li>{data.Garden.pets !== "false" ? data.Garden.pets : "Aucun"}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="advert_bloc advert_comments">
                        <p className="advert_bloc_title">
                            <img src="./img/face-with-monocle.png" alt=""/>
                            <strong>Commentaires</strong>
                        </p>
                        <div className="advert_comment">
                            <img src="./img/pierre-alain.jpg" alt=""/>
                            <div className="advert_comment_text">
                                <p><strong>L'avis de Jean-Edouard Paris</strong></p>
                                <p>Urna et pharetra pharetra massa massa. Adipiscing commodo elit at imperdiet.
                                    Elementum tempus egestas sed sed risus</p>
                            </div>
                        </div>
                        <div className="advert_comment">
                            <img src="./img/pierre-alain.jpg" alt=""/>
                            <div className="advert_comment_text">
                                <p><strong>L'avis de Jean-Edouard Paris</strong></p>
                                <p>Urna et pharetra pharetra massa massa. Adipiscing commodo elit at imperdiet.
                                    Elementum tempus egestas sed sed risus</p>
                            </div>
                        </div>
                        <div className="advert_comment">
                            <img src="./img/pierre-alain.jpg" alt=""/>
                            <div className="advert_comment_text">
                                <p><strong>L'avis de Jean-Edouard Paris</strong></p>
                                <p>Urna et pharetra pharetra massa massa. Adipiscing commodo elit at imperdiet.
                                    Elementum tempus egestas sed sed risus</p>
                            </div>
                        </div>
                        <div className="advert_comment">
                            <img src="./img/pierre-alain.jpg" alt=""/>
                            <div className="advert_comment_text">
                                <p><strong>L'avis de Jean-Edouard Paris</strong></p>
                                <p>Urna et pharetra pharetra massa massa. Adipiscing commodo elit at imperdiet.
                                    Elementum tempus egestas sed sed risus</p>
                            </div>
                        </div>
                    </div>

                    <div className="advert_bloc advert_comments">
                        <p className="advert_bloc_title">
                            <img src="./img/world-map.png" alt=""/>
                            <strong>Localisation</strong>
                        </p>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20300.913509097587!2d2.7641084662266873!3d50.50413793212912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd2564a8b9b897%3A0xf84f19931fd2bcf9!2sAuchy-les-Mines!5e0!3m2!1sfr!2sfr!4v1586865416975!5m2!1sfr!2sfr" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                    </div>
                </div>
            )
        }
    });

    return (
        <>
            {AdvertDetailJSX()}
        </>
    )
}
