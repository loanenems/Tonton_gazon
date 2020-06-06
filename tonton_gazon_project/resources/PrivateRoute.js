import React from 'react';
import Redirect from "react-router-dom/es/Redirect";
import Route from "react-router-dom/es/Route";

export default function PrivateRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === "true" ? <Component {...props} />
                : <Redirect to={{pathname: "/login", state: {from: props.location}}}/>}
        />
    )
}
