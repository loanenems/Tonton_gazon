import React, { useState } from 'react'
import Calendar from "react-calendar"
import 'react-datepicker/dist/react-datepicker.css';

export default function FormTemplate() {

    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date)
    };

    return (
        <div>
            <Calendar onChange={onChange} value={date} />"é"
        </div>
    );
}
