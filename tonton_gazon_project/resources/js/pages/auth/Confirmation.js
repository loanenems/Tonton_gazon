import React from 'react';
import {Link} from 'react-router-dom';

export default function Confirmation() {

    return (
        <div className="alert_text">
            <p>Un mail de confirmation a été envoyé à l'adresse mail que vous avez fourni. Veuillez confirmer votre adresse mail afin de
                pouvoir acceder aux fonctionnalités de l'application.</p>
            <Link to="/login" className="navbar_element btn btn_secondary">Retourner à la connexion</Link>
            <Link to="/" className="navbar_element btn btn_primary">Retourner à l'accueil</Link>
        </div>
    )
}
