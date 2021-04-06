import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import './css/style.scss';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './utils/UserProvider';

import Home from './pages/Home';
import Help from './pages/Help';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import App from './pages/App';

export default function AppRoot() {
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 750,
            easing: 'ease-out-quart',
        });
    });

    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll({ top: 0 })
        document.querySelector('html').style.scrollBehavior = ''
        focusHandling('outline');
    }, [location.pathname]); // triggered on route change

    return (
        <UserProvider>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/app">
                    <App />
                </Route>
                <Route path="/help">
                    <Help />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signout">
                    <SignOut />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>

            <Toaster />
        </UserProvider>
    );
}
