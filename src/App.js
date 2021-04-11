import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import './css/style.scss';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './utils/UserProvider';
import { PathProvider } from './utils/PathProvider';

import Home from './pages/Home';
import Help from './pages/Help';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Confirmation from './pages/Confirmation';
import App from './pages/App';
import Verification from './pages/Verification/Verification';
import Users from './pages/Users';

const routes = {
    '/': { component: Home, },
    '/help': { component: Help },
    '/signup': { component: SignUp },
    '/signin': { component: SignIn },
    '/signout': { component: SignOut },
    '/confirmation': { component: Confirmation },
    '/app': { component: App },
    '/verification': { component: Verification },
    '/users': { component: Users },
    '*': { component: PageNotFound },
};

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
        document.querySelector('html').style.scrollBehavior = 'auto';
        window.scroll({ top: 0 });
        document.querySelector('html').style.scrollBehavior = '';
        focusHandling('outline');
    }, [location.pathname]); // triggered on route change

    return (
        <PathProvider>
            <UserProvider>
                <Switch>
                    {Object.keys(routes).map((path, key) => {
                        const route = routes[path];
                        return (
                            <Route key={key} path={path} exact={true} {...route} />
                        );
                    })}
                </Switch>
                <Toaster />
            </UserProvider>
        </PathProvider>
    );
}
