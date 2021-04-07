import React, { useContext, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Header from '../partials/Header';
import { UserContext } from '../utils/UserProvider';

function App() {
    const history = useHistory();
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (!userContext.fetching && !userContext.me) {
            console.log(userContext)
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
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/*  Site header */}
            <Header absolute={false} />

            <div className="text-center display-1 my-5">
                App
            </div>

        </div>
    );
}

export default withRouter(App);
