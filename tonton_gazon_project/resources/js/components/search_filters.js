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
                    <input type="number" name="payout" id="payout" placeholder="0"/>
                </div>


                {/*user's eval */}
                <div className="advert_filter advert_filter_rate">
                    <div>
                        <input type="radio" id="eval_1" name="eval" value="1" />
                        <label htmlFor="eval_1">1</label>
                    </div>
                    <div>
                        <input type="radio" id="eval_2" name="eval" value="2" />
                        <label htmlFor="eval_2">2</label>
                    </div>
                    <div>
                        <input type="radio" id="eval_3" name="eval" value="3" />
                        <label htmlFor="eval_3">3</label>
                    </div>
                    <div>
                        <input type="radio" id="eval_4" name="eval" value="4" />
                        <label htmlFor="eval_4">4</label>
                    </div>
                    <div>
                        <input type="radio" id="eval_5" name="eval" value="5" />
                        <label htmlFor="eval_5">5</label>
                    </div>
                </div>
                
                {/*Dates des annonces*/}
                <div>
                    <label htmlFor="start_date">Date début (ou simple date si non range)</label>
                    <input type="date" name="start_date" id="start_date" />
                    <br />
                    <label htmlFor="end_date">Date fin (si range)</label>
                    <input type="date" name="end_date" id="end_date" />
                </div>

                <div className="advert_filter advert_filter_range">
                    <p>Distance entre l'annonce et votre domicile : </p>
                    <select name="distances" id="distances">
                        <option value="" selected>-- Choisissez une option --</option>
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
