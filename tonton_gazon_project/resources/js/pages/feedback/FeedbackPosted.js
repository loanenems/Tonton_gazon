import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FeedbackPosted() {

    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        axios.get('/api/feedbackPosted')
        .then(res => {
            setFeedback(res.data.feedback);
        });
    }, []);
    console.log(feedback);

    let feedbackJSX = feedback.map((feedback) => {
        return(
            <>
            <h1>{feedback.title}</h1>
            <span>{feedback.comment}</span>
            <p>{feedback.name}</p>
            <p>{feedback.surname}</p>
        </>
        )
    })
        
    return( 
        <>
            {feedbackJSX}
        </>
    );
}