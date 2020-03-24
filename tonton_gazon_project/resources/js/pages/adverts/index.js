import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Index() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/adverts'
        ).then(res => {
            setData(res.data.data);
            (res.data.data);
        });
    }, []);
    
    console.log(data);

    let jsx = data.map((data) => {
        return (
            // Image
            // Nom utilisateur
            // Prix
            // Evaluation
            // Superficie

            <a href="" className="advert_solo_container">
                {/* // Image */}
                <img src="./img/jardin.jpg"></img>
                {/* <p>{data.Garden.image}</p> */}
                <div className="advert_infos">
                    <div className="infos_first">
                        {/* // Nom utilisateur */}
                        <p className="info_name">{data.User.name}</p>
                        {/* // Prix */}
                        <p className="info_payout">{data.Advert.payout}€</p>
                    </div>
                    <div className="infos_description">
                        <p className="info_payout">{data.Advert.description}</p>
                    </div>
                    <div className="infos_second">
                        {/* // Evaluation */}
                        <p className="info_note"> <img src="./img/etoile_verte.svg"/>{data.User.xp} <mark>(23)</mark></p>
                        {/* // Superficie */}
                        <p className="info_size"><mark>Superficie : </mark>{data.Garden.size}/m*</p>
                    </div>
                </div>
            </a>
        )
    });


    return (
        <div className="advert_list_container_row">
            {jsx}
        </div>
    )
}
