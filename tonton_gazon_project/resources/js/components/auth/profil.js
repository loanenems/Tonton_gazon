import React from 'react'
import Nav from '../navbar'
import { ModalLink, ModalContainer, ModalRoute } from 'react-router-modal';
import { useRouteMatch, BrowserRouter, Link } from 'react-router-dom';

import 'react-router-modal/css/react-router-modal.css';


// Component qui sera affiché dans un ModalContainer
function AddAddress() {
    return <div>TODO : Ajouter formulaire adresse</div>;
  }

// Component qui sera affiché dans ModalContainer
  function AddAdvert() {
    return <div>TODO : Ajouter formulaire annonce</div>;
  }

  
/*
ModalLink : Affiche un lien qui affichera le modal selon le component mis en parametre
path => chemin du component modal (généré lors du click sur le lien)
parentPath => chemin du component parent (a définir pour revenir sur la page parente lors de la sortie du modal)
*/

// ModalContainer : affiche le modal

  

export default function Profil() {
    let {path} = useRouteMatch();
    return (
        <div>
            <Nav/>
            <p>Mon profil</p>


            <BrowserRouter>
                <div>
                <ModalLink component={AddAddress} path={`${path}/addaddress`} className='test-modal test-modal-foo' parentPath={`${path}`}>Ajouter une adresse</ModalLink>
                <ModalLink component={AddAdvert} path={`${path}/addadvert`} className='test-modal test-modal-foo' parentPath={`${path}`}>Ajouter une annonce</ModalLink>
                <ModalContainer />
                </div>
            </BrowserRouter>



        </div>
           )};