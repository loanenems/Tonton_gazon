import React from 'react'
import Nav from './navbar'
import Footer from './footer'


export default function Home() {
    return (
        <div className="container container_home">
            <Nav link="Logout"/>

            <div className="bloc home_presentation">
                <h2>Cuisinez du très bon couscous</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum ultrices lacus, et tincidunt tortor venenatis vitae.</p>
                <a href="">Commencez maintenant -></a>
                <img src="" alt=""></img>
            </div>

            <div className="bloc home_recent">
                <div className="bloc_title"> 
                    <img src="./img/waving-hand-sign.png" alt=""></img>
                    <h3>Annonces récentes</h3>
                    <p><a href="">Voir toutes les annonces</a></p> 
                </div>
               
                <div className="recent_list">
                    <div className="recent_element">
                        <img src="./img/jardin.png" alt=""></img>
                        <div className="garden_user"> 
                            <a href="" className="garden_username">Pierre-Alain X.</a>
                            <p className="garden_userstats"><b>4.7</b> 340 avis</p>
                        </div>
                        <div className="garden_stats"> 
                            <a href="" className="garden_stats_price btn btn_primary">10€/m²</a>
                            <p class="garden_stats_surface">Superficie : <b>120m²</b></p>
                        </div>
                    </div>
                    <div className="recent_element">
                        <img src="./img/jardin.png" alt=""></img>
                        <div className="garden_user"> 
                            <a href="" className="garden_username">Pierre-Alain X.</a>
                            <p className="garden_userstats"><b>4.7</b> 340 avis</p>
                        </div>
                        <div className="garden_stats"> 
                            <a href="" className="garden_stats_price btn btn_primary">10€/m²</a>
                            <p class="garden_stats_surface">Superficie : <b>120m²</b></p>
                        </div>
                    </div>
                    <div className="recent_element">
                        <img src="./img/jardin.png" alt=""></img>
                        <div className="garden_user"> 
                            <a href="" className="garden_username">Pierre-Alain X.</a>
                            <p className="garden_userstats"><b>4.7</b> 340 avis</p>
                        </div>
                        <div className="garden_stats"> 
                            <a href="" className="garden_stats_price btn btn_primary">10€/m²</a>
                            <p class="garden_stats_surface">Superficie : <b>120m²</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bloc home_explaination">
                <div className="bloc_title"> 
                    <img src="./img/waving-hand-sign.png" alt=""></img>
                    <h3>Comment ça marche ?</h3>
                </div>
                <div className="explaination_steps">
                    <div className="explaination_step explaination_step_one">
                        <p className="step step_one">01</p>
                        <p className="step_description step_descriptionone">Etape n°01 de Bonbon Lardon</p>
                    </div>
                    <div className="explaination_step explaination_step_two">
                        <p className="step step_two">02</p>
                        <p className="step_description step_description_two">Etape n°01 de RonRon Lazon</p>
                    </div>
                    <div className="explaination_step explaination_step_three">
                        <p className="step step_three">03</p>
                        <p className="step_description step_description_three">Etape n°01 de LonLon Targon</p>
                    </div>
                </div>
            </div>

            <div className="bloc home_tondeurs">
                <div className="bloc_title"> 
                    <img src="./img/waving-hand-sign.png" alt=""></img>
                    <h3>Les tondeurs à la une</h3>
                    <p><a href="">Voir tous les tondeurs</a></p> 
                </div>
                <div className="tondeurs_list">
                    <div className="tondeur">
                        <img src="./img/tondeur.png" alt=""></img>
                        <div className="tondeur_info"> 
                            <a href="" className="tondeur_username">Pierre-Alain X.</a>
                            <p className="tondeur_userstats"><b>4.7</b> 340 avis</p>
                            <a href="" className="tondeur_profil btn btn_primary">Voir le profil</a>
                        </div>
                    </div>
                    <div className="tondeur">
                        <img src="./img/tondeur.png" alt=""></img>
                        <div className="tondeur_info"> 
                            <a href="" className="tondeur_username">Pierre-Alain X.</a>
                            <p className="tondeur_userstats"><b>4.7</b> 340 avis</p>
                            <a href="" className="tondeur_profil btn btn_primary">Voir le profil</a>
                        </div>
                    </div>
                    <div className="tondeur">
                        <img src="./img/tondeur.png" alt=""></img>
                        <div className="tondeur_info"> 
                            <a href="" className="tondeur_username">Pierre-Alain X.</a>
                            <p className="tondeur_userstats"><b>4.7</b> 340 avis</p>
                            <a href="" className="tondeur_profil btn btn_primary">Voir le profil</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
