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


    return (
        <div className="advert_detail_container">
            <div className="advert_head">
                <div className="advert_bloc advert_image">
                    <div class="advert_slider advert_slider_big">
                        <img src="./img/jardin.jpg" alt=""/>
                        <img src="./img/jardin.jpg" alt=""/>
                        <img src="./img/jardin.jpg" alt=""/>
                        <img src="./img/jardin.jpg" alt=""/>
                    </div>
                    <div class="advert_slider advert_slider_small">
                        <img src="./img/jardin.jpg" alt=""/>
                        <img src="./img/jardin.jpg" alt=""/>
                        <img src="./img/jardin.jpg" alt=""/>
                        <img src="./img/jardin.jpg" alt=""/>
                    </div>
                </div>
                <div className="advert_bloc advert_main_info">
                    <div className="advert_main_title">
                        <img src="./img/pierre-alain.jpg" alt=""/>
                        <p>Jardin de Pierre-Alain X.</p>
                    </div>
                    <p className="advert_bloc_title">
                        <img src="./img/information-source.png" alt=""/>
                        <strong>Informations sur l'annonce</strong>
                    </p>
                    <div className="advert_main_info_list">
                        <p className="advert_price">Tarif au m² : <i>10€</i></p>
                        <p className="advert_size">Superficie : <i>120m²</i></p>
                        <p className="advert_feedback">Note moyenne : <i>4.7/5</i> <a href="">Voir toutes les
                            évaluations</a></p>
                        <p className="advert_total_price">Paiement final : <i>1200€</i></p>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Enim facilisis gravida neque convallis a cras semper. In
                        hendrerit gravida rutrum quisque non tellus orci. Blandit
                        aliquam etiam erat velit scelerisque. Tincidunt nunc pulvinar
                        sapien et ligula ullamcorper malesuada. Aliquet porttitor lacus
                        luctus accumsan tortor posuere ac ut consequat. Enim nulla
                        aliquet porttitor lacus luctus accumsan. Pretium lectus quam
                        id leo in vitae turpis massa. Facilisis mauris sit amet massa
                        vitae. Viverra tellus in hac habitasse. Ut eu sem integer
                        vitae justo eget magna fermentum. Tincidunt lobortis feugiat
                        vivamus at augue. Justo eget magna fermentum iaculis eu non.
                        Ut ornare lectus sit amet est placerat in egestas. Imperdiet
                        sed euismod nisi porta lorem mollis aliquam ut. Sagittis nisl
                        rhoncus mattis rhoncus urna neque viverra justo.</p>
                </div>

                <div className="advert_more">
                    <p className="advert_bloc_title">
                        <img src="./img/information-source.png" alt=""/>
                        <strong>Informations supplémentaires</strong>
                    </p>
                    <ul>
                        <li>Risus in hendrerit gravida rutrum quisque non tellus</li>
                        <li>nascetur ridiculus mus mauris vitae ultricies</li>
                        <li>porttitor eget dolor morbi non. In egestas erat</li>
                        <li>porta lorem. Morbi blandit cursus risus at ultrices</li>
                        <li>vivamus arcu felis. Lectus mauris ultrices eros</li>
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
