import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FormData from 'form-data';

export default function Advert_create() {
    const [gardens, setGardens] = useState([]);

    useEffect(() => {
        axios.get('/api/garden_get_id'
        ).then(res => {
            setGardens(res.data.jardin);
        });
    }, []);

    //This function handle the garden creation submit
    let handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();

        data.append('title', document.getElementById('title').value);
        data.append('description', document.getElementById('description').value);
        data.append('idGarden', document.getElementById('garden_id').value);

        axios({
            method: 'post',
            url: '/api/addAdvert',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            console.log(res);
        })
    };

    let gardenSelectJSX =
        gardens.map((g,i) => {
            return (
                <option key={i} value={g.id}>{g.id}</option>
            )
        });

    return (
        <form className="bloc bloc_form">
            <div className="bloc_title">
                <img src="./img/waving-hand-sign.png"></img>
                <h3>Creer une annonce</h3>
            </div>

            <div className="form_group">
                <label htmlFor="garden_id" className="form_label">Jardin</label>
                <select name="garden_id" className="form_input" id="garden_id">
                    {gardenSelectJSX}
                </select>
            </div>

            <div className="form_group">
                <label htmlFor="title" className="form_label">Titre</label>
                <input type="text" name="title" className="form_input" id="title"/>
            </div>

            <div className="form_group">
                <label className="form_label">Description</label>
                <textarea name="description" className="form_input" cols="30" rows="5" id="description" placeholder="ceci est un input"></textarea>
            </div>

            <br/>
            <a href="" className="btn btn_primary" onClick={(e) => handleSubmit(e)}>Envoyer le formulaire</a>
        </form>
    );
}

