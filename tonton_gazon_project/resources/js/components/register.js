import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './navbar'
import axios from 'axios'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const { name, email, password, password_confirmation } = this.state;
        axios.post('api/register', {
            name,
            email,
            password,
            password_confirmation
        })
            .then(response => {
                this.setState({ err: false });
                this.props.history.push("home");
            })
            .catch(error => {
                this.refs.name.value = "";
                this.refs.password.value = "";
                this.refs.email.value = "";
                this.refs.confirm.value = "";
                this.setState({ err: true });
            });
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        let error = this.state.err;
        let msg = (!error) ? 'Registered Successfully' : 'Oops! , Something went wrong.';
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger';
        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="page_title">Register</div>
                    <div className="form_container">
                        <div className="form_error_container">
                            {error != undefined && <div className={name} role="alert">{msg}</div>}
                        </div>
                        <form role="form" method="POST" onSubmit={this.onSubmit.bind(this)}>
                            <div className="form_group">
                                <label htmlFor="name" className="form_label">Name</label>

                                <div className="form_input_container">
                                    <input id="name" type="text" className="form_input" ref="name" name="name" onChange={this.onChange.bind(this)} required placeholder="name" />
                                </div>
                            </div>

                            <div className="form_group">
                                <label htmlFor="email" className="form_label">E-Mail Address</label>

                                <div className="form_input_container">
                                    <input id="email" type="email" className="form_input" ref="email" name="email" onChange={this.onChange.bind(this)} required placeholder="email" />
                                </div>
                            </div>

                            <div className="form_group">
                                <label htmlFor="password" className="form_label">Password</label>

                                <div className="form_input_container">
                                    <input id="password" type="password" className="form_input" ref="password" name="password" onChange={this.onChange.bind(this)} required placeholder="password" />
                                </div>
                            </div>

                            <div className="form_group">
                                <label htmlFor="password-confirm" className="form_label">Confirm Password</label>

                                <div className="form_input_container">
                                    <input id="password-confirm" type="password" className="form_input" ref="confirm" name="password_confirmation" onChange={this.onChange.bind(this)} required placeholder="password_confirmation" />
                                </div>
                            </div>

                            <div className="form_group">
                                <div className="form_submit_container">
                                    <button type="submit" className="form_submit btn_primary">
                                        Register
                                    </button>
                                    <li class="form_password_reset">
                                        <Link to="forgotpassword">Mot de passe oublié</Link>
                                    </li>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
