import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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

export default function InvestmentList(props) {
    const { userData } = props;
    const [investments, setInvestments] = useState(userData);
    const [updatePayback, setUpdatePayback] = useState();
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;
    const singleUser = isAdmin && userData;

    const fetchInvestments = useCallback(async () => {
        const investments = await http({
            url: isAdmin ? '/investment/list' : '/investment/me'
        });
        setInvestments(investments || []);
    }, [isAdmin]);
    const updateStatus = (verb, id) => async e => {
        e.preventDefault();
        await http({
            method: 'PATCH',
            url: `/investment/${verb}/${id}`
        });
        fetchInvestments();
    };
    const onPaybackClick = investment => async e => {
        e.preventDefault();
        setUpdatePayback(investment);
        try {
            await http({
                method: 'PATCH',
                url: `/investment/request-payback/${investment}`
            });
            toast.success('Payback request completed successfully');
        } catch (e) {
            console.error(e);
            toast.error(e?.reason?.error || `${e}`);
        }
        setUpdatePayback(undefined);
        fetchInvestments();
    };
    const onConfirmPaybackClick = investment => async e => {
        e.preventDefault();
        setUpdatePayback(investment);
        try {
            await http({
                method: 'PATCH',
                url: `/investment/approve-payback/${investment}`
            });
            toast.success('Payback confirmed successfully');
        } catch (e) {
            console.error(e);
            toast.error(e?.reason?.error || `${e}`);
        }
        setUpdatePayback(undefined);
        fetchInvestments();
    };

    useEffect(() => {
        if (!userData) {
            fetchInvestments();
        }
    }, [userData, fetchInvestments]);

    return (
        <Loading if={!investments}>
            <Table title="Investments">
                <TableHead>
                    <TableRow>
                        {!singleUser && <TableCell header>User</TableCell>}
                        <TableCell header>Amount</TableCell>
                        <TableCell header>Pool</TableCell>
                        <TableCell header className="text-center">Status</TableCell>
                        <TableCell header className="whitespace-nowrap"></TableCell>
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
                            {!singleUser && (
                                <TableCell>
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
                                {investment.status !== 'approved' && investment.status !== 'rejected' && investment.status}
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
                            <TableCell className="whitespace-nowrap w-px">
                                {investment.status === 'approved' && (
                                    <button
                                        className="btn text-white bg-blue-500 hover:bg-blue-600 py-1 px-3"
                                        onClick={onPaybackClick(investment._id)}
                                        disabled={updatePayback === investment._id}
                                    >
                                        Payback
                                    </button>
                                )}
                                {investment.status === 'paybackRequested' && (
                                    <button
                                        className="btn text-white bg-blue-500 hover:bg-blue-600 py-1 px-3"
                                        onClick={onConfirmPaybackClick(investment._id)}
                                        disabled={updatePayback === investment._id}
                                    >
                                        Confirm
                                    </button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Loading>
    );
}