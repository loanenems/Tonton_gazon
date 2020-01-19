require('./bootstrap');
import React from 'react'
import ReactDOM from 'react-dom'
import {  BrowserRouter, Switch, Route} from 'react-router-dom';

//Routes
import Index from './components/index'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import Forgot from './components/forgot'
import Reset from './components/reset'

import Error404 from './components/error404';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Index}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/home' component={Home}/>
            <Route path='/forgotpassword' component={Forgot}/>
            <Route path='/password/reset/:token' component={Reset}/>
            <Route exact={false} component={Error404}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
