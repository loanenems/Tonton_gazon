require('./bootstrap');
require('./script/form-animation');

import $ from 'jquery';

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {PrivateRoute} from './components/helpers/PrivateRoute'

//Routes
// import Index from './components/index'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Home from './components/home'
import Forgot from './components/auth/forgot'
import Reset from './components/auth/reset'

import Error404 from './components/error404'
import Advert from './components/adverts/Advert'
import Garden_create from './components/garden/Garden_create'

import Slick from './vendors/slick';
import Script from './script/script';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/garden' component={Garden_create}/>
            {/* <PrivateRoute exact path='/home' component={Home}/> */}
            <Route path='/forgotpassword' component={Forgot}/>
            <Route path='/resetPassword' component={Reset}/>

            <Route path='/adverts' component={Advert}/>
            <Route path='/password/reset/:token' component={Reset}/>

            <Route exact={false} component={Error404}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
