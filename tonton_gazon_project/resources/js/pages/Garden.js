import React, {useState} from 'react';
import axios from 'axios'

export default function Garden() {
    let postData = (e) => {
        e.preventDefault();
        let formulaire = {
            description: document.getElementById('description').value,
            size: parseInt(document.getElementById('size').value),
            movableObstacle: document.getElementById('movable_obstacles').checked,
            unmovableObstacle: document.getElementById('unmovable_obstacles').checked,
            pets: document.getElementById('animals').checked,
            equipment: document.getElementById('equipments').value,
        };
        console.log(formulaire);

        axios.post('/api/createGarden', {
            formulaire
        })
            .then((response) => {
                console.log(response);
            })
    };

    return (
        <form>
            {/*description du jardin*/}
            <label for="description">Description</label>
            <textarea id="description" name="description" placeholder="Description du jardin"/>
            <br/>
            {/*Taille du jardin*/}
            <label htmlFor="size">Taille du jardin</label>
            <input type="number" id="size" name="size"/>
            <br/>
            {/*Obstacles pouvant être déplacés*/}
            <label htmlFor="movable_obstacles">Obstacle(s) pouvant être déplacé(s)</label>
            <input type="checkbox" id="movable_obstacles" name="movable_obstacles"/>
            <br/>
            {/*Obstacles ne pouvant pas être déplacés*/}
            <label htmlFor="unmovable_obstacles">Obstacle(s) ne pouvant pas être déplacé(s)</label>
            <input type="checkbox" id="unmovable_obstacles" name="unmovable_obstacles"/>
            <br/>
            {/*Animaux*/}
            <label htmlFor="animals">Animaux</label>
            <input type="checkbox" id="animals" name="animals"/>
            <br/>
            <label htmlFor="equipments">Equipement(s)</label>
            <select id="equipments" name="equipments">
                <option value="test_1">test_1</option>
                <option value="test_2">test_2</option>
                <option value="test_3">test_3</option>
                <option value="test_4">test_4</option>
            </select>
            <button type="submit" onClick={(e) => postData(e)}>Post</button>
        </form>
    );
}
