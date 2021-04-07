import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { UserContext } from '../utils/UserProvider';

export default function LoggedPage(props) {
    const history = useHistory();
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (!userContext.fetching && !userContext.me) {
            history.push('/');
        }
    }, [userContext, history]);

    if (userContext.fetching) {
        return (
            <div className="flex flex-col min-h-screen overflow-hidden">
                <Header absolute={false} />
                <div className="text-center my-5">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen overflow-hidden pb-5 mb-6">
            <Header absolute={false} />
            <div className="mt-5 max-w-6xl mx-auto px-4 sm:px-6 w-full">
                {props.children}
            </div>
        </div>
    );
}