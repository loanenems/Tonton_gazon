require('./bootstrap');

import $ from 'jquery';

import React from 'react'
import ReactDOM from 'react-dom'
import {  BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Index from './components/index'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import Forgot from './components/forgot'
import Reset from './components/reset'
// import Garden from './components/Garden'

import FormAnimation from './script/form-animation'


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={Index}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/home' component={Home}/>
            <Route path='/forgotpassword' component={Forgot}/>
            {/* <Route path='/Garden' component={Garden}/> */}
            <Route path='/password/reset/:token' component={Reset}/>
        </Switch>
    </Router>,
    document.getElementById('app')
);
