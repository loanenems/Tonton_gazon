require('./bootstrap');
require('./script/form-animation');

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Slick from './vendors/slick';
import Script from './script/script';

//Routes
//Index
import Index from './pages/Index'

//Authentication
import Login from './pages/auth/login'
import Register from './pages/auth/register'

//Profile
import Profile from './pages/profile/index'

//Garden
import Garden from './pages/garden/index'

//Adverts
import Advert from './pages/adverts/index'

//Informations
import Legal from './pages/Legal'
import Cgu from './pages/Cgu'
import Aide from './pages/Aide'
import Contact from './pages/Contact'
import Cookies from './pages/Cookies'

//Others
import FormTemplate from './pages/FormTemplate'
import Error404 from './pages/Error404'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Index}/>

            {/* Authentication */}
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>

            {/* Profile */}
            <Route path='/mon-profil' component={Profile}/>

            {/* Garden */}
            <Route path='/garden' component={Garden}/>

            {/* Advert */}
            <Route path='/adverts' component={Advert}/>

            {/* Informations */}
            <Route path='/mentions-legales' component={Legal}/>
            <Route path='/cgu' component={Cgu}/>
            <Route path='/aide' component={Aide}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/politique-cookies' component={Cookies}/>

            {/* Others */}
            <Route path='/form-template' component={FormTemplate}/>
            <Route exact={false} component={Error404}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);
