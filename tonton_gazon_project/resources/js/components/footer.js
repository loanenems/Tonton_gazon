import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <footer className="footer">
            <div className="footer_container">
                <div className="footer_categorie">
                    <h2>Tonton Gazon</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="footer_categorie">
                    <a href="" className="footer_title">Liens</a>
                    <a href="" className="footer_link">Qui sommes-nous ?</a>
                    <a href="" className="footer_link">Espace membre</a>
                    <a href="" className="footer_link">Contact</a>
                    <a href="" className="footer_link">Aide</a>
                </div>
                <div className="footer_categorie">
                    <a href="" className="footer_title">Services</a>
                    <a href="" className="footer_link">Creer une annonce</a>
                    <a href="" className="footer_link">Parcourir les annonces</a>
                </div>
                <div className="footer_categorie">
                    <a href="" className="footer_title">Legal</a>
                    <a href="" className="footer_link">Politique de cookies</a>
                    <a href="" className="footer_link">Mentions légales</a>
                    <a href="" className="footer_link">CGV</a>
                </div>
            </div>
            <div className="footer_copryights">© 2019 Tontongazon.fr. Un site développé par moi. Tous droits réservés.</div>
        </footer>
    );
}
 