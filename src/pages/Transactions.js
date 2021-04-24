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
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getValues = async () => {
            const res = await http({
                method: 'GET',
                url: '/deposit/me',
            });
            setTransactions(res);
            console.log(res)
        }
        getValues();
    }, []);

    return (
        <LoggedPage>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl text-gray-800 font-bold">Transactions</h1>
                </div>
            </div>

            <Loading if={!transactions?.length} className="py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    <Table title="Deposits">
                        <TableHead>
                            <TableRow>
                                <TableCell header>Amount</TableCell>
                                <TableCell header className="text-center w-24">IBAN</TableCell>
                                <TableCell header className="text-center w-24">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map(transaction => (
                                <TableRow key={transaction._id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                {transaction.amountType} {transaction.amount}
                                            </div>
                                            <div className="text-xs">
                                                {CURRENCIES.filter(currency => currency.symbol === transaction.amountType)[0].name}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {transaction.iban}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {transaction.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Loading>
        </LoggedPage>
    );
}

export default withRouter(Transactions);
