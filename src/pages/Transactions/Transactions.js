import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import TransactionsTable from './TransactionTable';

function Transactions() {
    const user = useContext(UserContext);
    const isAdmin = user.me?.isAdmin;

    return (
        <LoggedPage>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl text-gray-800 font-bold">
                        Transactions
                        {isAdmin && (
                            <span className="text-xs uppercase bg-teal-400 text-white px-2 py-1 rounded font-normal ml-5 align-middle">
                                All users
                            </span>
                        )}
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="py-5">
                    <TransactionsTable
                        title="Deposits"
                        srcDstLabel="Source"
                        what="deposit"
                    />
                </div>

                <div className="py-5">
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
