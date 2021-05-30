import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import InvestmentList from './InvestmentList';

function Investments() {
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    return (
        <LoggedPage title={(
            <>
                Investments
                {isAdmin && (
                    <span className="text-xs uppercase bg-lightblue-100 text-white px-2 py-1 rounded font-normal ml-5 align-middle">
                        All users
                    </span>
                )}
            </>
        )}>

            <InvestmentList />

        </LoggedPage>
    );
}

export default withRouter(Investments);
