import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { urlFromFilter } from "../helpers";

export default function SearchFilters(props) {
    let history = useHistory();
    let handleSearch = (e) => {
        e.preventDefault();
        if (document.getElementById('distances').options[document.getElementById('distances').selectedIndex].value !== "") {
            navigator.geolocation.getCurrentPosition(function (pos) {
                history.push(urlFromFilter(1, pos));
            }, function () {
                history.push(urlFromFilter());
                props.updateState();
            });
        } else {
            history.push(urlFromFilter());
            props.updateState();
        }
    };
    let jsxSearch = () => {
        return (
            <>
                <div className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h3>Annonces</h3>
                </div>

                <div id="advert_filter_display" className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h4>Afficher les filtres</h4>
                    <img src="./img/waving-hand-sign.png"></img>
                </div>

                {/*Search bar*/}
                <div className="advert_filter advert_fitler_search">
                    <input className="advert_search_input" placeholder="Rechercher" type="text" name="search" id="search" />
                    <button className="advert_search_submit" onClick={(e) => handleSearch(e)}>search</button>
                </div>

                {/* Display type */}
                <div className="advert_filter advert_filter_display">
                    <p>Affichage : </p>
                    <a className="option display_option display_grid active" data-display="advert_list_container_grid"
                        alt="Affichage en colonne"></a>
                    <a className="option display_option display_row" data-display="advert_list_container_row"
                        alt="Affichage en ligne"></a>
                </div>

                {/* Advert type */}
                <div className="advert_filter advert_filter_role_display">
                    <p>Annonce de : </p>
                    <a className="option role_option tondeur active" alt="Affichage des annonces de tondeur"></a>
                    <a className="option role_option tondu" alt="Affichage des annonces de tondu"></a>
                </div>

                {/*Min payout for a job*/}
                <div className="advert_filter advert_filter_payout">
                    <label htmlFor="payout">Tarif min</label>
                    <input type="number" name="payout" id="payout" placeholder="0" />
                </div>


                {/*user's eval */}
                <div className="advert_filter advert_filter_rate">
                    <p>Évaluation minimum de l'utilisateur : </p>
                    <div className="rating-group">
                        <input disabled checked className="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio" />
                        <label aria-label="1 star" className="rating__label" htmlFor="rating3-1"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-1" value="1" type="radio" />
                        <label aria-label="2 stars" className="rating__label" htmlFor="rating3-2"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-2" value="2" type="radio" />
                        <label aria-label="3 stars" className="rating__label" htmlFor="rating3-3"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-3" value="3" type="radio" />
                        <label aria-label="4 stars" className="rating__label" htmlFor="rating3-4"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-4" value="4" type="radio" />
                        <label aria-label="5 stars" className="rating__label" htmlFor="rating3-5"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                        <input className="rating__input" name="rating3" id="rating3-5" value="5" type="radio" />
                    </div>
                </div>

                {/*Dates des annonces*/}
                <div className="advert_filter advert_filter_date">
                    <label htmlFor="start_date">Date début (ou simple date si non range)</label>
                    <input type="date" name="start_date" id="start_date" />
                    <br />
                    <label htmlFor="end_date">Date fin (si range)</label>
                    <input type="date" name="end_date" id="end_date" />
                </div>

                <div className="advert_filter advert_filter_range">
                    <p>Distance entre l'annonce et votre domicile : </p>
                    <select name="distances" id="distances">
                        <option value="" defaultValue>-- Choisissez une distance --</option>
                        <option value="5">5 Km</option>
                        <option value="15">15 Km</option>
                        <option value="20">20 Km</option>
                        <option value="25">25 Km</option>
                        <option value="30">30 Km</option>
                        <option value="35">35 Km</option>
                    </select>
                </div>
            </>
        )
    };
    return (
        <>
            {jsxSearch()}
        </>
    )
}
