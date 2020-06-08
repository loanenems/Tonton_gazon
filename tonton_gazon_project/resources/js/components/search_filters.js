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
                    <img src="/img/waving-hand-sign.png"></img>
                    <h3>Annonces</h3>
                </div>

                <div id="advert_filter_display" className="bloc_title">
                    <img src="/img/waving-hand-sign.png"></img>
                    <h4>Afficher les filtres</h4>
                    <img src="/img/waving-hand-sign.png"></img>
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
                    <label><a className="btn btn_role_select tondu active" alt="Affichage des annonces de tondeur">Tondu</a> <input type="radio" id="tondu" name="type" defaultChecked={true}></input></label>
                    <label><a className="btn btn_role_select tondeur" alt="Affichage des annonces de tondu">Tondeur</a> <input type="radio" id="tondeur" name="type"></input></label>
                </div>

                {/*Min payout for a job*/}
                <div className="advert_filter advert_filter_payout">
                    <label htmlFor="payout">Tarif min</label>
                    <input type="number" name="payout" id="payout" placeholder="0" />
                </div>


                {/*user's eval */}
                <div className="advert_filter advert_filter_rate">
                    <label>Évaluation minimum de l'utilisateur : </label>
                    <fieldset className="rating">
                        <input type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                    </fieldset>
                </div>

                {/*Dates des annonces*/}
                <div className="advert_filter advert_filter_date">
                    <label htmlFor="start_date">Date début (ou simple date si non range)</label> <br/>
                    <input type="date" name="start_date" id="start_date" />
                    <br /> <br />
                    <label htmlFor="end_date">Date fin (si range)</label> <br/>
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

                <div className="advert_filter advert_filter_equipment">
                    <input type="checkbox" name="equipment" id="equipment"/>
                    <label>Matériel de tonte à disposition ?</label>
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
