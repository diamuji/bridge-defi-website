import React from 'react';
// import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../partials/Header/Header';
import PageIllustration from '../partials/PageIllustration';
// import { UserContext } from '../utils/UserProvider';

function Users() {
    // const userContext = useContext(UserContext);

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            {/*  Site header */}
            <Header />

            {/*  Page content */}
            <main className="flex-grow">
                <section className="relative">
                </section>
            </main>
        </div>
    );
}

export default withRouter(Users);
