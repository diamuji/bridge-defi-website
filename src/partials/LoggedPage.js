import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header/Header';
import { UserContext } from '../utils/UserProvider';
import Sidebar from './Sidebar/Sidebar';
import DashboardHeader from './Header/DashboardHeader';

export default function LoggedPage(props) {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!userContext.fetching) {
            if (!userContext.me || (props.admin === true && !userContext.me.isAdmin)) {
                history.push('/');
            }
        }
    }, [userContext, history, props.admin]);

    if (userContext.fetching) {
        return (
            <div className="flex flex-col min-h-screen overflow-hidden">
                <Header absolute={false} />
                <div className="text-center my-5">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar open={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                <DashboardHeader title={props.title} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

                <div className="px-4 sm:px-8 lg:px-10 pt-0 pb-8 w-full max-w-9xl mx-auto">
                    {props.children}
                </div>
            </div>
        </div>
    );
}