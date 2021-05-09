import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { CURRENCIES } from '../../partials/currencies/currencies';
import Loading from '../../partials/Loading';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableHead from '../../partials/Table/TableHead';
import TableRow from '../../partials/Table/TableRow';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';

export default function ConversionList(props) {
    const { userData } = props;
    const [conversions, setConversions] = useState(userData);
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;
    const singleUser = isAdmin && userData;

    const fetchConversions = useCallback(async () => {
        const conversions = await http({
            url: isAdmin
                ? '/conversion/list'
                : '/conversion/me'
        });
        setConversions(conversions || []);
    }, [isAdmin]);

    useEffect(() => {
        if (!userData) {
            fetchConversions();
            console.log('fetch')
        }
    }, [userData, fetchConversions]);

    return (
        <Loading if={!conversions}>
            <Table title="Conversions">
                <TableHead>
                    <TableRow>
                        {!singleUser && <TableCell header>User</TableCell>}
                        <TableCell header>Data</TableCell>
                        <TableCell header>From</TableCell>
                        <TableCell header>To</TableCell>
                        {isAdmin && <TableCell header>Reviewer</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!conversions?.length && (
                        <TableRow>
                            <TableCell colSpan="4">
                                <i>No results</i>
                            </TableCell>
                        </TableRow>
                    )}
                    {(conversions || []).map(conversion => (
                        <TableRow key={conversion._id}>
                            {!singleUser && (
                                <TableCell>
                                    <div className="truncate" title={conversion.user}>
                                        {conversion.user}
                                    </div>
                                </TableCell>
                            )}
                            <TableCell className="overflow-clip small">
                                {conversion.createdAt ? moment(conversion.createdAt).format('LL') : '-'}
                            </TableCell>
                            <TableCell>
                                <div className="font-medium text-gray-800">
                                    <span className="text-gray-600">{conversion.from.amountType}</span>&nbsp;
                                    <b>{conversion.from.amount}</b>
                                </div>
                                <div className="text-xs">
                                    {CURRENCIES.filter(currency => currency.symbol === conversion.from.amountType)[0].name}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium text-gray-800">
                                    <span className="text-gray-600">{conversion.to.amountType}</span>&nbsp;
                                    <b>{conversion.to.amount}</b>
                                </div>
                                <div className="text-xs">
                                    {CURRENCIES.filter(currency => currency.symbol === conversion.to.amountType)[0].name}
                                </div>
                            </TableCell>
                            {isAdmin && (
                                <TableCell>
                                    <div className="truncate" title={conversion.reviewer}>
                                        {conversion.reviewer}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Loading>
    );
}