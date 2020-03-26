import React from 'react';
import {useParams} from "react-router-dom";

export default function Advert() {
    //Getting the ID of the current advert
    let {id} = useParams();

    return (
        <>
            {id}
        </>
    )
}
