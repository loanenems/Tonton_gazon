import React from 'react'
import Nav from './navbar'


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
               
                {/* <div className="recent_list">
                    <div className="recent_element">
                        <img src="" alt=""></img>
                        <div></div>
                    </div>
                    <div className="recent_element">
                        <img src="" alt=""></img>

                    </div>
                    <div className="recent_element">
                        <img src="" alt=""></img>

                    </div>
                </div> */}
            </div>

            <div className="bloc home_explaination">
                <div className="bloc_title"> 
                    <img src="./img/waving-hand-sign.png" alt=""></img>
                    <h3>Comment ça marche ?</h3>
                </div>
            </div>

            <div className="bloc home_tondeur">
                <div className="bloc_title"> 
                    <img src="./img/waving-hand-sign.png" alt=""></img>
                    <h3>Les tondeurs à la une</h3>
                    <p><a href="">Voir tous les tondeurs</a></p> 
                </div>
            </div>
        </div>
    );
}
