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
import Dashboard from './pages/Dashboard/Dashboard';
import Verification from './pages/Verification/Verification';
import Users from './pages/Users/Users';
import ForgotPassword from './pages/ForgotPassword';
import User from './pages/Users/User';
import Transactions from './pages/Transactions/Transactions';
import Events from './pages/Events';
import Pools from './pages/Pools/Pools';
import Pool from './pages/Pools/Pool';

const routes = {
    '/': { component: Home, },
    '/help': { component: Help },
    '/signup': { component: SignUp },
    '/signin': { component: SignIn },
    '/signout': { component: SignOut },
    '/confirm/:id': { component: Confirmation },
    '/forgotPassword': { component: ForgotPassword },
    '/dashboard': { component: Dashboard },
    '/verification': { component: Verification },
    '/users': { component: Users },
    '/users/:id': { component: User },
    '/transactions': { component: Transactions },
    '/events': { component: Events },
    '/pools': { component: Pools },
    '/pools/create': { component: Pool },
    '/pools/:id': { component: Pool },
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
        document.documentElement.classList.add('dark');
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
