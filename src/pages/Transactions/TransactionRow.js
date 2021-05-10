import React from 'react';
import Checkmark from '../../partials/icons/Checkmark';
import Clear from '../../partials/icons/Clear';
import TableCell from '../../partials/Table/TableCell';
import TableRow from '../../partials/Table/TableRow';
import { CURRENCIES } from '../../partials/currencies/currencies';
import moment from 'moment';

export default function TransactionRow(props) {
    const { transaction, isAdmin, updateStatus, singleUser } = props;

    return (
        <TableRow>
            {!singleUser && (
                <TableCell style={{ maxWidth: '3rem' }}>
                    <div className="truncate" title={transaction.user}>
                        {transaction.user}
                    </div>
                </TableCell>
            )}
            <TableCell>
                <div>
                    <div className="font-medium text-gray-800">
                        <span className="text-gray-600">{transaction.amountType}</span>&nbsp;
                        <b>{transaction.amount}</b>
                    </div>
                    <div className="text-xs">
                        {CURRENCIES.filter(currency => currency.symbol === transaction.amountType)[0].name}
                    </div>
                </div>
            </TableCell>
            <TableCell className="overflow-clip small">
                {transaction.source || transaction.destination || transaction.iban}
                <div className="text-xs text-gray-500">
                    {transaction.createdAt ? moment(transaction.createdAt).format('LL') : '-'}
                </div>
            </TableCell>
            <TableCell className="text-center">
                {transaction.status !== 'approved' && transaction.status !== 'rejected' && 'open'}
                {transaction.status === 'approved' && <span className="text-green-500">approved</span>}
                {transaction.status === 'rejected' && <span className="text-red-500">rejected</span>}
                {isAdmin && transaction.status === 'open' && (
                    <div>
                        <a href="#0" onClick={updateStatus('approve', transaction._id)}>
                            <Checkmark className="text-lightblue-100" />
                        </a>
                        <a href="#0" onClick={updateStatus('reject', transaction._id)}>
                            <Clear className="text-red-500" />
                        </a>
                    </div>
                )}
            </TableCell>
        </TableRow>
    );
}