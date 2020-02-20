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
import Reset from './pages/auth/Reset'

//Profile
import Profile from './pages/profile/index'

//Garden
import Garden from './pages/garden/index'

//Adverts
import Advert from './pages/adverts/index'
import Search_advert from './pages/adverts/search_advert'
import Advert_create from './pages/adverts/Advert_create'

//Informations
import Legal from './pages/Legal'
import Cgu from './pages/Cgu'
import Aide from './pages/Aide'
import Contact from './pages/Contact'
import Cookies from './pages/Cookies'

//Others
import Nav from './components/header'
import Footer from './components/footer'
import FormTemplate from './pages/FormTemplate'
import Error404 from './pages/Error404'

ReactDOM.render(
    <div className="container">
        <BrowserRouter>
            <Nav/>
            <Switch>
                <Route exact path='/' component={Index}/>

                {/* Authentication */}
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/reset' component={Reset}/>


                {/* Profile */}
                <Route path='/mon-profil' component={Profile}/>

                {/* Garden */}
                <Route path='/garden' component={Garden}/>

                {/* Advert */}
                <Route path='/adverts' component={Advert}/>
                <Route path='/create_advert' component={Advert_create}/>
                <Route path='/search_advert' component={Search_advert}/>

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
            <Footer/>
        </BrowserRouter>
    </div>,
    document.getElementById('app')
);
