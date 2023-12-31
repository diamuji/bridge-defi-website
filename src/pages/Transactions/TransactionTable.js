import React, { useCallback, useContext, useEffect, useState } from 'react';
import Loading from '../../partials/Loading';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableHead from '../../partials/Table/TableHead';
import TableRow from '../../partials/Table/TableRow';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';
import TransactionRow from './TransactionRow';

export default function TransactionsTable(props) {
    const { srcDstLabel, what, title, userData } = props
    const [data, setData] = useState(userData);
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin === true;
    const singleUser = isAdmin && userData;

    const fetchData = useCallback(async () => {
        const results = await http({
            method: 'GET',
            url: isAdmin
                ? `/${what}/list`
                : `/${what}/me`
        });
        setData(results || []);
    }, [isAdmin, what]);
    const updateStatus = (verb, id) => async e => {
        e.preventDefault();
        await http({
            method: 'PATCH',
            url: `/${what}/${verb}/${id}`
        });
        fetchData(what);
    };

    useEffect(() => {
        console.log('useEffect', userData)
        if (!userData) {
            fetchData();
        }
    }, [userData, fetchData]);

    return (
        <Loading if={!data} className={props.className}>
            <Table title={title}>
                <TableHead>
                    <TableRow>
                        {!singleUser && <TableCell header>User</TableCell>}
                        <TableCell header>Amount</TableCell>
                        <TableCell header className="w-24">{srcDstLabel}</TableCell>
                        <TableCell header className="text-center w-24">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!data?.length && (
                        <TableRow>
                            <TableCell colSpan="4">
                                <i>No results</i>
                            </TableCell>
                        </TableRow>
                    )}
                    {(data || []).map(row => (
                        <TransactionRow
                            key={row._id}
                            transaction={row}
                            isAdmin={isAdmin}
                            updateStatus={updateStatus}
                            singleUser={singleUser}
                        />
                    ))}
                </TableBody>
            </Table>
        </Loading>
    );
}