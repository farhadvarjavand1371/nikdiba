import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import MainPage from './pages/MainPage';
import {CookiesProvider} from 'react-cookie';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage";
import UpdateProfileinfoPage from "./pages/UpdateProfileinfoPage";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>

            <CookiesProvider>
                <Switch>
                    <Route exact path={'/'} component={MainPage}/>
                    <Route exact path={'/register'} component={RegisterPage}/>
                    <Route exact path={'/login'} component={LoginPage}/>
                    <Route exact path={'/profile'} component={ProfilePage}/>
                    <Route exact path={'/updateProfile'} component={UpdateProfileinfoPage}/>


                    <Route exact path={''} component={MainPage}/>
                </Switch>
            </CookiesProvider>


        </BrowserRouter>
    </React.StrictMode>
    ,
    document.getElementById('root')
);
