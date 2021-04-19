import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header/Header';
import { UserContext } from '../utils/UserProvider';
import Body from './Body';
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
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar open={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                <DashboardHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    {props.children}
                </div>
            </div>

            {/* <div className="flex flex-col min-h-screen overflow-hidden pb-5 mb-6">
                <Header absolute={false} />
                <Body className="mt-5 max-w-6xl mx-auto px-4 sm:px-6 w-full">
                    {props.children}
                </Body>
            </div> */}
        </div>
    );
}