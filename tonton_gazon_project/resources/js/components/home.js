import React from 'react'
import Nav from './navbar'


export default function Home() {
    return (
        <div>
            <Nav link="Logout"/>
            <div className="container text-center title">
                <h1>Vous êtes connecté !</h1>
            </div>
        </div>
    );
}
