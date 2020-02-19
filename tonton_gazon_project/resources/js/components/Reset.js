import React, {useEffect,useState} from 'react';
import {useLocation,useHistory} from 'react-router-dom'
import axios from "axios";

export default function Reset() {
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

    let handleReset = (e) => {
        e.preventDefault();
      axios.post('api/reset',{
          'email':document.getElementById('email').value,
          'password':document.getElementById('password').value,
          'password_confirmation':document.getElementById('password_confirmation').value,
          'token':token
      }).then((res) => {
          history.push('/');
      })
    };

    if(token !== '') {
        return (
            <div>
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email"/>
                    <br/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password"/>
                    <br/>
                    <label htmlFor="password_confirmation">Confirmation du mot de passe</label>
                    <input type="password" name="password_confirmation" id="password_confirmation"/>
                    <br/>
                    <button type="submit" onClick={(e) => handleReset(e)}>Confirmer</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>Le lien auquel vous essayez d'acceder n'est plus valide ou n'existe pas.</div>
        )
    }
}
