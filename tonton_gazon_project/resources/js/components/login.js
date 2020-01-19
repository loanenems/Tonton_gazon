import React from 'react'
import Nav from './navbar'
import {Link} from 'react-router-dom'


export default function Login() {
    return (
        <div>
            <Nav/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" role="form" method="POST">

                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">Adresse mail</label>
                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email"
                                                   required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Mot de passe</label>
                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control"
                                                   name="password" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember"/> Se souvenir de moi
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-8 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary">
                                                Se connecter
                                            </button>
                                            <li className="btn btn-link">
                                                <Link to="forgotpassword">Mot de passe oublié ?</Link>
                                            </li>
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
