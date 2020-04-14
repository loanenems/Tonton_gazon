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
import ResetPassword from './pages/auth/ResetPassword'

//Profile
import Profile from './pages/profile/index'

//Garden
import Garden from './pages/garden/index'

//Adverts
import Advert from './pages/adverts/index'
import AdvertDetail from './pages/adverts/Advert'
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
                <Route path='/mon-profil' component={Profile}/>

                {/* Garden */}
                <Route path='/garden' component={Garden}/>

                {/* Advert */}
                <Route path='/adverts' component={Advert}/>
                <Route path='/advert' component={AdvertDetail}/>
                <Route exact path='/create_advert' component={Advert_create}/>
                <Route exact path='/search_advert' component={Search_advert}/>

                {/* Informations */}
                <Route exact path='/mentions-legales' component={Legal}/>
                <Route exact path='/cgu' component={Cgu}/>
                <Route exact path='/aide' component={Aide}/>
                <Route exact path='/contact' component={Contact}/>
                <Route exact path='/politique-cookies' component={Cookies}/>

                {/* Feedback */}
                <Route exact path='/create_feedback' component={Feedback_create}/>

                {/* Others */}
                <Route exact path='/form-template' component={FormTemplate}/>
                <Route exact={false} component={Error}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    </div>,
    document.getElementById('app')
);
