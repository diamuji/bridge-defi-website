import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { CURRENCIES } from '../../partials/currencies/currencies';
import Checkmark from '../../partials/icons/Checkmark';
import Clear from '../../partials/icons/Clear';
import Loading from '../../partials/Loading';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableHead from '../../partials/Table/TableHead';
import TableRow from '../../partials/Table/TableRow';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';

export default function InvestmentList() {
    const [investments, setInvestments] = useState();
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    const fetchInvestments = useCallback(async () => {
        const investments = await http({
            url: isAdmin ? '/investment/list' : '/investment/me'
        });
        setInvestments(investments || []);
    }, []);
    const updateStatus = (verb, id) => async e => {
        e.preventDefault();
        await http({
            method: 'PATCH',
            url: `/investment/${verb}/${id}`
        });
        fetchInvestments();
    };

    useEffect(() => {
        fetchInvestments();
    }, [fetchInvestments]);

    return (
        <Loading if={!investments}>
            <Table title="Investments">
                <TableHead>
                    <TableRow>
                        {isAdmin && <TableCell header>User</TableCell>}
                        <TableCell header>Amount</TableCell>
                        <TableCell header className="w-24">Pool</TableCell>
                        <TableCell header className="text-center w-24">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!investments?.length && (
                        <TableRow>
                            <TableCell colSpan="4">
                                <i>No results</i>
                            </TableCell>
                        </TableRow>
                    )}
                    {(investments || []).map(investment => (
                        <TableRow key={investment._id} className={isAdmin ? `cursor-pointer hover:bg-gray-100` : ''}>
                            {isAdmin && (
                                <TableCell style={{ maxWidth: '3rem' }}>
                                    <div className="truncate" title={investment.user}>
                                        {investment.user}
                                    </div>
                                </TableCell>
                            )}
                            <TableCell>
                                <div className="font-medium text-gray-800">
                                    <span className="text-gray-600">{investment.amountType}</span>&nbsp;
                                    <b>{investment.amount}</b>
                                </div>
                                <div className="text-xs">
                                    {CURRENCIES.filter(currency => currency.symbol === investment.amountType)[0].name}
                                </div>
                            </TableCell>
                            <TableCell className="overflow-clip small">
                                {investment.pool}
                                <div className="text-xs text-gray-500">
                                    {investment.createdAt ? moment(investment.createdAt).format('LL') : '-'}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                {investment.status !== 'approved' && investment.status !== 'rejected' && 'open'}
                                {investment.status === 'approved' && <span className="text-green-500">approved</span>}
                                {investment.status === 'rejected' && <span className="text-red-500">rejected</span>}
                                {isAdmin && investment.status === 'open' && (
                                    <div>
                                        <a href="#0" onClick={updateStatus('approve', investment._id)}>
                                            <Checkmark className="text-teal-500" />
                                        </a>
                                        <a href="#0" onClick={updateStatus('reject', investment._id)}>
                                            <Clear className="text-red-500" />
                                        </a>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Loading>
    );
}