import React, {useEffect,useState} from 'react';
import {useLocation,useHistory} from 'react-router-dom'
import axios from "axios";

export default function ResetPassword() {
    let query = new URLSearchParams(useLocation().search);
    let history = useHistory();
    const [token,setToken] = useState('');

    useEffect(() => {
        axios.get('api/find/'+query.get('token')
        ).then(res => {
            setToken(res.data.token);
        }).catch((error) => {
        });
    }, []);

    const [errors, setErrors] = useState([]);

    let errorsJSX = () => {
        //Ce tableau va contenir l'ensemble des messages d'erreur
        let messages = [];

        //On parcours l'objet contenant la/les erreurs pour chaque champ
        errors.map((error, index) => {
            for (let [key, value] of Object.entries(error)) {
                //Key = nom du champ
                //value = tableau contenant un ou plusieurs messages d'erreur
                
                value.map((message, index) => {
                    messages.push(message);
                });
            }
        });

        //On construit l'affichage
        return messages.map((message, index) => {
            return (
                <div key={index}>
                    <p>{message}</p>
                </div>
            )
        })
    };

    let handleReset = (e) => {
        e.preventDefault();
      axios.post('api/reset',{
          'email':document.getElementById('email').value,
          'password':document.getElementById('password').value,
          'password_confirmation':document.getElementById('password_confirmation').value,
          'token':token
      }).then((res) => {
          history.push('/');
      }).catch(error => {
        setErrors([error.response.data.errors]);
    });
    };

    if(token) {
        return (
            <div>
                <form className="bloc bloc_form">
                    <div className="bloc_title">
                        <img src="./img/waving-hand-sign.png"></img>
                        <h3>Mot de passe oublié</h3>
                    </div>

                    <div className="form_error">
                        {errorsJSX()}
                    </div>

                    <div className="form_group">
                        <label className="form_label" htmlFor="email">Email</label>
                        <input className="form_input" type="text" name="email" id="email" placeholder="exemple@mail.fr"></input>
                    </div>
                    <div className="form_group">
                        <label className="form_label" htmlFor="password">Mot de passe</label>
                        <input className="form_input" type="password" name="password" id="password"></input>
                    </div>
                    <div className="form_group">
                        <label className="form_label" htmlFor="password_confirmation">Confirmation du mot de passe</label>
                        <input className="form_input" type="password" name="password_confirmation" id="password_confirmation"></input>
                    </div>

                    <a href="" className="btn btn_primary"  onClick={(e) => handleReset(e)}>Confirmer</a>
                    {/* <button type="submit" onClick={(e) => handleReset(e)}>Confirmer</button> */}
                </form>
            </div>
        )
    } else {
        return (
            <div>Le lien auquel vous essayez d'acceder n'est plus valide ou n'existe pas.</div>
        )
    }
}
