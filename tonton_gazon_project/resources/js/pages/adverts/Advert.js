import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {useParams, useHistory} from 'react-router-dom';

export default function Advert() {
    let {id} = useParams();
    let history = useHistory();

    const [data, setData] = useState({});
    const [cpt, setCpt] = useState(0);


    useEffect(() => {
        Axios.get("/api/advertGetId", {params: {id: id}})
            .then(res => {
                setData(res.data.data);
                console.log(res.data.data);
            });
    }, [cpt]);

    let handleResponse = (e) => {
        e.preventDefault();
        if (data.Advert.response === 0) {
            Axios.post('/api/respond', {
                advertId: data.Advert.id,
                clientId: data.User.id,
                advertType: data.Advert.type
            }).then(res => {
                setCpt(cpt + 1);
            }).catch(err => {
            })
        } else {
            Axios.post('/api/respondRemove', {
                advertId: data.Advert.id,
                clientId: data.User.id,
                advertType: data.Advert.type
            }).then(res => {
                setCpt(cpt + 1);
            }).catch(err => {
            })
        }
    };

    let handleRedirect = (e) => {
        e.preventDefault();
        history.push('/profil/' + data.User.id);
    };

    let handleRemove = (e, idFeedback) => {
        e.preventDefault();

        axios.post('/api/removeFeedback', {
            id: idFeedback
        }).then(res => {
            setCpt(cpt + 1);
        }).catch(err => {

        });
    };

    let commentJSX = (() => {
        return data.User.feedbacks.feedbacks.map((feedback, index) => {
            return (
                <div className="advert_comment" key={index}>
                    <img src="./img/pierre-alain.jpg" alt=""/>
                    <div className="advert_comment_text">
                        <p><strong>{feedback.surname} {feedback.name}</strong></p>
                        <p>{feedback.comment}</p>
                        {removeCommentJSX(feedback.userId, feedback.id)}
                    </div>
                </div>
            )
        })
    });

    let removeCommentJSX = (idUser, idFeedback) => {
        if (parseInt(sessionStorage.getItem('user')) === idUser) {
            return (
                <>
                    <a href="" className="btn btn_primary" onClick={(e) => handleRemove(e, idFeedback)}>Supprimer le
                        commentaire</a>
                </>
            )
        }
    };

    let AdvertDetailJSX = (() => {
        if (!data.hasOwnProperty('User')) {
            return (
                <>
                </>
            );
        } else {
            let imgList = [];
            let imgJSX = [];
            let responseButton = "";
            for (const image in data.Garden.image) {
                imgList.push(data.Garden.image[image]);
            }
            imgList.map((src, index) => {
                imgJSX.push(<img src={src} alt="" key={index}/>);
            });
            if (sessionStorage.getItem('user') !== data.User.id.toString()) {
                if (data.Advert.response === 0) {
                    responseButton =
                        <a href="" className="btn btn_primary" onClick={(e) => handleResponse(e)}>Répondre à
                            l'annonce</a>;
                } else {
                    responseButton =
                        <a href="" className="btn btn_primary" onClick={(e) => handleResponse(e)}>Ne plus répondre à
                            l'annonce</a>;
                }
            }

            if( data.Advert.type != 1) {
                return (
                    <div className="advert_detail_container">
                        <div className="advert_head">
                            <div className="advert_bloc advert_image">
                                <div className="advert_slider advert_slider_big">
                                    {imgJSX}
                                </div>
                            </div>
                            <div className="advert_bloc advert_main_info">
                                <div className="advert_main_title">
                                    <img src="./img/pierre-alain.jpg" alt=""/>
                                    <p>Jardin de {data.User.surname} {data.User.name}</p>
                                </div>
                                <p className="advert_bloc_title">
                                    <img src="./img/information-source.png" alt=""/>
                                    <strong>Informations sur l'annonce</strong>
                                </p>
                                <div className="advert_main_info_list">
                                    <p className="advert_price">Tarif au m²
                                        : <i>{(data.Advert.payout / data.Garden.size).toFixed(2)} €</i></p>
                                    <p className="advert_size">Superficie : <i>{data.Garden.size} m²</i></p>
                                    <p className="advert_feedback">Note moyenne : <i>{data.User.feedbacks.rating}/5</i> <a
                                        href="">Voir toutes les
                                        évaluations ({data.User.feedbacks.nbFeedbacks})</a></p>
                                    <p className="advert_total_price">Paiement final : <i>{data.Advert.payout} €</i></p>
                                </div>
                                <div className="advert_main_info_action">
                                    {responseButton}
                                    <a href="" className="btn btn_secondary" onClick={(e) => handleRedirect(e)}>Consulter le
                                        profil</a>
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
                                    <li><b> Objets déplacables
                                        : </b> {data.Garden.movableObstacle !== "false" ? data.Garden.movableObstacle : "Aucun"}
                                    </li>
                                    <li><b> Objets non déplacables
                                        : </b> {data.Garden.unmovableObstacle !== "false" ? data.Garden.unmovableObstacle : "Aucun"}
                                    </li>
                                    <li><b> Animaux : </b> {data.Garden.pets !== "false" ? data.Garden.pets : "Aucun"}</li>
                                </ul>
                            </div>
                        </div>
    
    
                        <div className="advert_bloc advert_comments">
                            <p className="advert_bloc_title">
                                <img src="./img/face-with-monocle.png" alt=""/>
                                <strong>Commentaires</strong>
                            </p>
                            {commentJSX()}
                        </div>
    
                        {/* <div className="advert_bloc advert_comments">
                            <p className="advert_bloc_title">
                                <img src="./img/world-map.png" alt=""/>
                                <strong>Localisation</strong>
                            </p>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20300.913509097587!2d2.7641084662266873!3d50.50413793212912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd2564a8b9b897%3A0xf84f19931fd2bcf9!2sAuchy-les-Mines!5e0!3m2!1sfr!2sfr!4v1586865416975!5m2!1sfr!2sfr" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div> */}
                    </div>
                );
            } else {
                return (
                    <div className="advert_detail_container">
                        <div className="advert_head">
                            {/* <div className="advert_bloc advert_image">
                                <div className="advert_slider advert_slider_big">
                                    {imgJSX}
                                </div>
                            </div> */}
                            <div className="advert_bloc advert_main_info">
                                <div className="advert_main_title">
                                    <img src="./img/pierre-alain.jpg" alt=""/>
                                    <p>Annonce de {data.User.name} {data.User.name}</p>
                                </div>
                                <p className="advert_bloc_title">
                                    <img src="./img/information-source.png" alt=""/>
                                    <strong>Informations sur l'annonce</strong>
                                </p>
                                <div className="advert_main_info_list">
                                    {/* <p className="advert_price">Tarif au m²
                                        : <i>{(data.Advert.payout / data.Garden.size).toFixed(2)} €</i></p> */}
                                    {/* <p className="advert_size">Superficie : <i>{data.Garden.size} m²</i></p> */}
                                    <p className="advert_feedback">Note moyenne : <i>{data.User.feedbacks.rating}/5</i> <a
                                        href="">Voir toutes les
                                        évaluations ({data.User.feedbacks.nbFeedbacks})</a></p>
                                    <p className="advert_total_price">Paiement final : <i>{data.Advert.payout} €</i></p>
                                </div>
                                <div className="advert_main_info_action">
                                    {responseButton}
                                    <a href="" className="btn btn_secondary" onClick={(e) => handleRedirect(e)}>Consulter le
                                        profil</a>
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
    
                            {/* <div className="advert_more">
                                <p className="advert_bloc_title">
                                    <img src="./img/information-source.png" alt=""/>
                                    <strong>Informations supplémentaires</strong>
                                </p>
                                <ul>
                                    <li><b> Objets déplacables
                                        : </b> {data.Garden.movableObstacle !== "false" ? data.Garden.movableObstacle : "Aucun"}
                                    </li>
                                    <li><b> Objets non déplacables
                                        : </b> {data.Garden.unmovableObstacle !== "false" ? data.Garden.unmovableObstacle : "Aucun"}
                                    </li>
                                    <li><b> Animaux : </b> {data.Garden.pets !== "false" ? data.Garden.pets : "Aucun"}</li>
                                </ul>
                            </div> */}
                        </div>
    
    
                        <div className="advert_bloc advert_comments">
                            <p className="advert_bloc_title">
                                <img src="./img/face-with-monocle.png" alt=""/>
                                <strong>Commentaires</strong>
                            </p>
                            {commentJSX()}
                        </div>
    
                        {/* <div className="advert_bloc advert_comments">
                            <p className="advert_bloc_title">
                                <img src="./img/world-map.png" alt=""/>
                                <strong>Localisation</strong>
                            </p>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20300.913509097587!2d2.7641084662266873!3d50.50413793212912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd2564a8b9b897%3A0xf84f19931fd2bcf9!2sAuchy-les-Mines!5e0!3m2!1sfr!2sfr!4v1586865416975!5m2!1sfr!2sfr" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div> */}
                    </div>
                );
            }
                
        }
    });

    return (
        <>
            {AdvertDetailJSX()}
        </>
    )
}
