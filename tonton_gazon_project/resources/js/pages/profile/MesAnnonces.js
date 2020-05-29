import React, {useState, useEffect} from 'react'
import axios from "axios";


export default function MesAnnonces() {
    const [data,setData] = useState({});
    //Fetch the data regarding the current user's profile
    useEffect(() => {
        axios.get('/api/advertGetOwner', {
                params: {
                    id: sessionStorage.getItem('user')
                }
            }
        ).then(res => {
            setData(res.data);
            console.log(res.data);
        });
    }, []);
    return (
        <div>

        </div>
    )
};
