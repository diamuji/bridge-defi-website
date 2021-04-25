import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../partials/Loading';
import LoggedPage from '../partials/LoggedPage';
import Table from '../partials/Table/Table';
import TableBody from '../partials/Table/TableBody';
import TableCell from '../partials/Table/TableCell';
import TableHead from '../partials/Table/TableHead';
import TableRow from '../partials/Table/TableRow';
import { CURRENCIES } from '../utils/currencies';
import { http } from '../utils/utils';

function Transactions() {
    const [deposits, setDeposits] = useState();
    const [withdrawals, setWithdrawals] = useState();

    useEffect(() => {
        const getValues = async () => {
            const deposits = await http({
                method: 'GET',
                url: '/deposit/me',
            });
            setDeposits(deposits || []);
        };
        getValues();
    }, []);

    useEffect(() => {
        const getValues = async () => {
            const withdrawals = await http({
                method: 'GET',
                url: '/withdrawal/me',
            });
            setWithdrawals(withdrawals || []);
        };
        getValues();
    }, []);

    return (
        <LoggedPage>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl text-gray-800 font-bold">Transactions</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Loading if={!deposits} className="py-5">
                    <div>
                        <Table title="Deposits">
                            <TableHead>
                                <TableRow>
                                    <TableCell header>Amount</TableCell>
                                    <TableCell header className="text-center w-24">IBAN</TableCell>
                                    <TableCell header className="text-center w-24">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!deposits?.length && (
                                    <TableRow>
                                        <TableCell>
                                            <i>No results</i>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {(deposits || []).map(deposit => (
                                    <TableRow key={deposit._id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-gray-800">
                                                    <span className="text-gray-600">{deposit.amountType}</span>&nbsp;
                                                    <b>{deposit.amount}</b>
                                                </div>
                                                <div className="text-xs">
                                                    {CURRENCIES.filter(currency => currency.symbol === deposit.amountType)[0].name}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {deposit.iban}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {deposit.status}
                                        </TableCell>
                                    </TableRow>
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
                                    <TableCell header>Amount</TableCell>
                                    <TableCell header className="text-center w-24">IBAN</TableCell>
                                    <TableCell header className="text-center w-24">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!withdrawals?.length && (
                                    <TableRow>
                                        <TableCell>
                                            <i>No results</i>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {(withdrawals || []).map(withdraw => (
                                    <TableRow key={withdraw._id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-gray-800">
                                                    {withdraw.amountType} {withdraw.amount}
                                                </div>
                                                <div className="text-xs">
                                                    {CURRENCIES.filter(currency => currency.symbol === withdraw.amountType)[0].name}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {withdraw.iban}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {withdraw.status}
                                        </TableCell>
                                    </TableRow>
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
