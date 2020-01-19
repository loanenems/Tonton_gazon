import React, {Component} from 'react'
import Nav from './navbar'

export default function Register() {
    return (
        <div>
            <Nav/>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" role="form" method="POST">
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-md-4 control-label">Nom</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text" className="form-control" name="name" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">Adresse Mail</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email"
                                                   required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Mot de
                                            passe</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control"
                                                   name="password" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password-confirm" className="col-md-4 control-label">Confirmation
                                            du mot de passe</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm" type="password" className="form-control"
                                                   name="password_confirmation" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary">
                                                Créer mon compte
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
