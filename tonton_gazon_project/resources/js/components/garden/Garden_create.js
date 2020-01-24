import React, {useState} from 'react';

export default function Garden_create() {
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [movableObstacle, setMovableObstacle] = useState('');
    const [unmovableObstacle, setUnmovableObstacle] = useState('');
    const [pets, setPets] = useState('');
    const [equipment, setEquipment] = useState('');

    let submit = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'api/garden_add',
            data: {
                description,
                size,
                movableObstacle,
                unmovableObstacle,
                pets,
                equipment
            }
        })
            .then(function (reponse) {
                //On traite la réponse envoyée par le serveur
                console.log(reponse);
            })
            .catch(function (erreur) {
                //On traite ici les erreurs éventuellement survenues
                console.log(erreur);
            });
    };

    let change = (e) => {
        switch (e.target.name) {
            case 'description':
                setDescription(e.target.value);
                break;
            case 'size':
                setSize(e.target.value);
                break;
            case 'movableObstacle':
                setMovableObstacle(e.target.value);
                break;
            case 'unmovableObstacle':
                setUnmovableObstacle(e.target.value);
                break;
            case 'pets':
                setPets(e.target.value);
                break;
            case 'equipment':
                setEquipment(e.target.value);
                break;
        }
    };

    return (
        <div>
            <form onSubmit={(e) => submit(e)} method="post">
                <label htmlFor="description">description</label>
                <input type="text" id="description" name="description" value={description} onChange={(e) => change(e)}/>
                <br/>
                <label htmlFor="size">size</label>
                <input type="number" id="size" name="size" value={size} onChange={(e) => change(e)}/>
                <br/>
                <label htmlFor="movableObstacle">movableObstacle</label>
                <input type="text" id="movableObstacle" name="movableObstacle" value={movableObstacle}
                       onChange={(e) => change(e)}/>
                <br/>
                <label htmlFor="unmovableObstacle">unmovableObstacle</label>
                <input type="text" id="unmovableObstacle" name="unmovableObstacle" value={unmovableObstacle}
                       onChange={(e) => change(e)}/>
                <br/>
                <label htmlFor="pets">pets</label>
                <input type="text" id="pets" name="pets" value={pets} onChange={(e) => change(e)}/>
                <br/>
                <label htmlFor="equipment">equipment</label>
                <input type="text" id="equipment" name="equipment" value={equipment} onChange={(e) => change(e)}/>
                <br/>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}