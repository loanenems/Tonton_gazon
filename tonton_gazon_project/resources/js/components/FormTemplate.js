import React from 'react'
import Nav from './navbar'
import Footer from './footer'


export default function Home() {

    return (
        <div className="container container_form">
            <Nav link="Logout"/>

            <form className="bloc bloc_form">
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
                    <textarea className="form_input"cols="30" rows="5" placeholder="ceci est un input"></textarea>
                </div>

                <div className="form_group">
                    <p className="form_label">Label type avec checkbox</p>
                    
                    <div class="checkbox_group">
                        <label class="control control-checkbox">
                            First checkbox
                                <input type="checkbox" checked="checked" />
                            <div class="control_indicator"></div>
                        </label>
                        <label class="control control-checkbox">
                            Second checkbox
                                <input type="checkbox" />
                            <div class="control_indicator"></div>
                        </label>
                        <label class="control control-checkbox">
                            Third checkbox
                                <input type="checkbox" />
                            <div class="control_indicator"></div>
                        </label>
                        <label class="control control-checkbox">
                            Disabled & checked
                                <input type="checkbox" disabled="disabled" checked="checked" />
                            <div class="control_indicator"></div>
                        </label>
                    </div>
                </div>

                <div className="form_group">
                    <p className="form_label">Label type avec checkbox</p>
                    
                    <div class="radio_group">
                        <label class="control control-radio">
                            First radio
                                <input type="radio" name="radio" checked="checked" />
                            <div class="control_indicator"></div>
                        </label>
                        <label class="control control-radio">
                            Second radio
                                <input type="radio" name="radio" />
                            <div class="control_indicator"></div>
                        </label>
                        <label class="control control-radio">
                            Disabled
                                <input type="radio" name="radio2" disabled="disabled" />
                            <div class="control_indicator"></div>
                        </label>
                        <label class="control control-radio">
                            Disabled & checked
                                <input type="radio" name="radio2" disabled="disabled" checked="checked" />
                            <div class="control_indicator"></div>
                        </label>
                    </div>
                </div>

                <a href="" className="btn btn_primary">Envoyer le formulaire</a>
                <a href="" className="btn btn_secondary">Annuler le fomulaire</a>
            </form>

            <Footer/>
        </div>
    );
}
