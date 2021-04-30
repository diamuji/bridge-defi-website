import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../../partials/Loading';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableHead from '../../partials/Table/TableHead';
import TableRow from '../../partials/Table/TableRow';
import { http } from '../../utils/utils';

export default function PoolList() {
    const [pools, setPools] = useState();
    const history = useHistory();

    const fetchPools = useCallback(async () => {
        const pools = await http({
            method: 'GET',
            url: '/pool',
        });
        setPools(pools || []);
    }, []);

    useEffect(() => {
        fetchPools();
    }, [fetchPools]);

    return (
        <Loading if={!pools}>
            <Table title="Pools">
                <TableHead>
                    <TableRow>
                        <TableCell header>Name</TableCell>
                        <TableCell header>APY Yearly</TableCell>
                        <TableCell header>APY Monthly</TableCell>
                        <TableCell header>Available</TableCell>
                        <TableCell header>Sold</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!pools?.length && (
                        <TableRow>
                            <TableCell colSpan="4">
                                <i>No results</i>
                            </TableCell>
                        </TableRow>
                    )}
                    {(pools || []).map(pool => (
                        <TableRow key={pool._id} className="cursor-pointer hover:bg-gray-100" onClick={() => history.push(`/pools/${pool._id}`)}>
                            <TableCell>
                                {pool.name}
                                <div className={`text-xs ${pool.active ? 'text-green-500' : 'text-red-500'}`}>
                                    {pool.active ? 'active' : 'not active'}
                                </div>
                            </TableCell>
                            <TableCell>{pool.apyYearly}</TableCell>
                            <TableCell>{pool.apyMonthly}</TableCell>
                            <TableCell>{pool.balanceAvailable}</TableCell>
                            <TableCell>{pool.balanceSold}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Loading>
    );
}