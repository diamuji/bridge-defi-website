import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import TransactionsTable from './TransactionTable';

function Transactions() {
    const user = useContext(UserContext);
    const isAdmin = user.me?.isAdmin;

    return (
        <LoggedPage title={(
            <>
                Transactions
                {isAdmin && (
                    <span className="text-xs uppercase bg-lightblue-100 text-white px-2 py-1 rounded font-normal ml-5 align-middle">
                        All users
                    </span>
                )}
            </>
        )}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="pb-5">
                    <TransactionsTable
                        title="Deposits"
                        srcDstLabel="Source"
                        what="deposit"
                    />
                </div>

                <div className="pb-5">
                    <TransactionsTable
                        title="Withdrawals"
                        srcDstLabel="Destination"
                        what="withdrawal"
                    />
                </div>
            </div>
        </LoggedPage>
    );
}

export default withRouter(Transactions);
