import React from 'react';
import Axios from 'axios';

export default function FeedbackReceived() {

    Axios.get('api/feedbackReceived').then(res => {
        console.log(res);
    });
    
    return(
        <div>aaa</div>
    );
}