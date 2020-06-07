require('./bootstrap');
require('./script/form-animation');

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Slick from './vendors/slick';
import Script from './script/script';

//Routes
//Private route
import PrivateRoute from "./PrivateRoute";

//Advert_Index
import Index from './pages/Index'

//Authentication
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ResetPassword from './pages/auth/ResetPassword'

//Profile
import Profile from './pages/profile/index'
import OtherProfile from "./pages/profile/OtherProfile";


//Garden
import Garden from './pages/garden/index'

//Adverts
import Advert_Index from './pages/adverts/Advert_Index'
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
import Error from './pages/error'
import Feedback_create from './pages/feedback/Feedback_create';

//Disclaimer: Don't put exact if there are nested route inside the rendered component !
ReactDOM.render(
    <div className="container">
        <BrowserRouter>
            <Nav/>
            <Switch>
                <Route exact path='/' component={Index}/>

                {/* Authentication */}
                <Route path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/reset_password' component={ResetPassword}/>

                {/* Profile */}
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} path='/mon-profil' component={Profile}/>
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} path='/profil/:id' component={OtherProfile}/>

                {/* Garden */}
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} path='/garden' component={Garden}/>

                {/* Advert */}
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} path='/adverts' component={Advert_Index}/>
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} path='/create_advert' component={Advert_create}/>

                {/* Informations */}
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} exact path='/mentions-legales' component={Legal}/>
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} exact path='/cgu' component={Cgu}/>
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} exact path='/aide' component={Aide}/>
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} exact path='/contact' component={Contact}/>
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} exact path='/politique-cookies' component={Cookies}/>

                {/* Feedback */}
                <PrivateRoute authenticated={sessionStorage.getItem("is_logged")} exact path='/create_feedback/:id' component={Feedback_create}/>

                {/* Others */}
                <Route exact path='/form-template' component={FormTemplate}/>
                <Route exact={false} component={Error}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    </div>,
    document.getElementById('app')
);
