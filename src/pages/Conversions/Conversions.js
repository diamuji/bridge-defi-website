import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import ConversionList from './ConversionList';

function Conversions() {
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    return (
        <LoggedPage title={(
            <>
                Conversions
                {isAdmin && (
                    <span className="text-xs uppercase bg-lightblue-100 text-white px-2 py-1 rounded font-normal ml-5 align-middle">
                        All users
                    </span>
                )}
            </>
        )}>

            <ConversionList />

        </LoggedPage>
    );
}

export default withRouter(Conversions);
