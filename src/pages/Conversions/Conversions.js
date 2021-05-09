import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import ConversionList from './ConversionList';

function Conversions() {
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    return (
        <LoggedPage>
            <div className={`flex flex-row mb-8`}>
                <h1 className="text-2xl text-gray-800 font-bold flex-grow">
                    Conversions
                    {isAdmin && (
                        <span className="text-xs uppercase bg-teal-400 text-white px-2 py-1 rounded font-normal ml-5 align-middle">
                            All users
                        </span>
                    )}
                </h1>
            </div>

            <ConversionList />

        </LoggedPage>
    );
}

export default withRouter(Conversions);
