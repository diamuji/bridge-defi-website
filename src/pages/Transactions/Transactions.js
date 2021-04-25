import React, { useCallback, useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../../partials/Loading';
import LoggedPage from '../../partials/LoggedPage';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableHead from '../../partials/Table/TableHead';
import TableRow from '../../partials/Table/TableRow';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';
import TransactionRow from './TransactionRow';

function Transactions() {
    const [deposits, setDeposits] = useState();
    const [withdrawals, setWithdrawals] = useState();
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin === true;

    const fetchData = useCallback(async (what) => {
        const results = await http({
            method: 'GET',
            url: isAdmin ? `/${what}/list` : `/${what}/me`,
        });
        const updateFn = what === 'deposit' ? setDeposits : setWithdrawals;
        updateFn(results || []);
    }, [isAdmin]);
    const updateStatus = (what, verb, id) => async e => {
        e.preventDefault();
        await http({
            method: 'PATCH',
            url: `/${what}/${verb}/${id}`
        });
        fetchData(what);
    };

    useEffect(() => {
        fetchData('deposit');
        fetchData('withdrawal');
    }, [fetchData]);

    return (
        <LoggedPage>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl text-gray-800 font-bold">
                        Transactions
                        <span className="text-xs uppercase bg-teal-400 text-white px-2 py-1 rounded font-normal ml-5 align-middle">
                            All users
                        </span>
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Loading if={!deposits} className="py-5">
                    <div>
                        <Table title="Deposits">
                            <TableHead>
                                <TableRow>
                                    {isAdmin && <TableCell header>User</TableCell>}
                                    <TableCell header>Amount</TableCell>
                                    <TableCell header className="text-center w-24">IBAN</TableCell>
                                    <TableCell header className="text-center w-24">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!deposits?.length && (
                                    <TableRow>
                                        <TableCell colSpan="4">
                                            <i>No results</i>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {(deposits || []).map(deposit => (
                                    <TransactionRow transaction={deposit} isAdmin={isAdmin} updateStatus={updateStatus} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Loading>

                <Loading if={!withdrawals} className="py-5">
                    <div>
                        <Table title="Withdrawals">
                            <TableHead>
                                <TableRow>
                                    {isAdmin && <TableCell header>User</TableCell>}
                                    <TableCell header>Amount</TableCell>
                                    <TableCell header className="text-center w-24">IBAN</TableCell>
                                    <TableCell header className="text-center w-24">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!withdrawals?.length && (
                                    <TableRow>
                                        <TableCell colSpan="4">
                                            <i>No results</i>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {(withdrawals || []).map(withdraw => (
                                    <TransactionRow transaction={withdraw} isAdmin={isAdmin} updateStatus={updateStatus} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Loading>
            </div>
        </LoggedPage>
    );
}

export default withRouter(Transactions);
