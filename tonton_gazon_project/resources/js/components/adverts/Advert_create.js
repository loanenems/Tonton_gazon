import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FormData from 'form-data';

export default function Advert_create() {
    const [gardens, setGardens] = useState([]);

    useEffect(() => {
        axios.get('api/garden_get_id'
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
            url: '/api/advert_add',
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
        <form>
            <label htmlFor="garden_id">Jardin</label>
            <select name="garden_id" id="garden_id">
                {gardenSelectJSX}
            </select>
            <label htmlFor="title">Titre</label>
            <input type="text" id="title" name="title"/>
            <br/>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description"/>
            <br/>
            <button onClick={(e) => handleSubmit(e)}>Envoyer</button>
        </form>
    );
}

