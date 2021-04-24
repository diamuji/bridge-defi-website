import React from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../partials/LoggedPage';

function Transactions() {
    return (
        <LoggedPage>
            i put out that gun
        </LoggedPage>
    );
}

export default withRouter(Transactions);
