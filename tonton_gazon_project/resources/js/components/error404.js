import React from 'react';
import Nav from './navbar';

export default function Error404() {
    return (
        <div>
            <Nav/>
            <div className="container text-center title">
                <h1>Aucune page ne correspond à votre recherche</h1>
            </div>
        </div>
    )
}
