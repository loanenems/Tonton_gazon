import React from 'react'
import Nav from './navbar'
import Footer from './footer'


export default function Home() {

    return (
        <div className="container container_form">
            <Nav link="Logout"/>

            <div className="bloc bloc_form">
                <div className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h3>Formulaire type</h3>
                </div>

                <div className="form_group">
                    <label className="form_label">Label type avec champs normal</label>
                    <input className="form_input" type="text" placeholder="ceci est un input"></input>
                </div>

                <div className="form_group">
                    <label className="form_label">Label type avec champs valide</label>
                    <input className="form_input valid" type="text" placeholder="ceci est un input"></input>
                </div>

                <div className="form_group">
                    <label className="form_label">Label type avec champs invalide</label>
                    <input className="form_input error" type="text" placeholder="ceci est un input"></input>
                </div>

                <div className="form_group">
                    <label className="form_label">Label type avec dropdown</label>
                    <select className="form_input" name="carlist" form="carform">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

                <div className="form_group">
                    <label className="form_label">Label type avec text area</label>
                    <input className="form_input error" type="textarea" rows="5" placeholder="ceci est un input"></input>
                </div>

            </div>

            <Footer/>
        </div>
    );
}
