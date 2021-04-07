import React from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../partials/LoggedPage';

function App() {
    return (
        <LoggedPage>
            <div className="text-center display-1 my-5">
                App
            </div>
        </LoggedPage>
    );
}

export default withRouter(App);
