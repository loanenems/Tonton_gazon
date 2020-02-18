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
import Profil from './components/auth/profil'
import Reset from './components/Reset'
import Home from './components/home'
//import Forgot from './components/auth/forgot'

import FormTemplate from './components/FormTemplate'

import Error404 from './components/error404'
import Advert from './components/adverts/Advert'
import Search_advert from "./components/adverts/search_advert"

import Garden from './components/garden/Garden'
import Advert_create from './components/adverts/Advert_create'

import Legal from './components/Legal'
import Cgu from './components/Cgu'
import Aide from './components/Aide'
import Contact from './components/Contact'
import Cookies from './components/Cookies'

import Slick from './vendors/slick';
import Script from './script/script';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/advertcreate' component={Advert_create}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/mon-profil' component={Profil}/>
            <Route path='/search_advert' component={Search_advert}/>
            <Route path='/garden' component={Garden}/>
            <Route path='/mentions-legales' component={Legal}/>
            <Route path='/reset' component={Reset}/>
            <Route path='/cgu' component={Cgu}/>
            <Route path='/aide' component={Aide}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/politique-cookies' component={Cookies}/>
            {/* <PrivateRoute exact path='/home' component={Home}/>
            <Route path='/forgotpassword' component={Forgot}/>
            <Route path='/resetPassword' component={ResetPassword}/>*/}

            <Route path='/form-template' component={FormTemplate}/>

            <Route path='/adverts' component={Advert}/>
          {/*  <Route path='/password/reset/:token' component={ResetPassword}/> */}

            <Route exact={false} component={Error404}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
