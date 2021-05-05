import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../../partials/Loading';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableHead from '../../partials/Table/TableHead';
import TableRow from '../../partials/Table/TableRow';
import SidePanel from '../../utils/SidePanel';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';
import InvestForm from './InvestForm';

export default function PoolList() {
    const [pools, setPools] = useState();
    const history = useHistory();
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;
    const [selectedPool, setSelectedPool] = useState();

    const fetchPools = useCallback(async () => {
        const pools = await http({ url: '/pool' });
        setPools(pools || []);
    }, []);
    const onPoolClick = (pool) => () => {
        if (isAdmin) {
            history.push(`/pools/${pool._id}`);
        }
    };
    const onSelectPoolClick = (pool) => e => {
        e.stopPropagation();
        setSelectedPool(pool);
    };

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
                        <TableCell header className="whitespace-nowrap"></TableCell>
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
                        <TableRow key={pool._id} className={isAdmin ? `cursor-pointer hover:bg-gray-100` : ''} onClick={onPoolClick(pool)}>
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
                            <TableCell className="whitespace-nowrap w-px">
                                <button className="btn text-white bg-blue-500 hover:bg-blue-600 py-1 px-3" onClick={onSelectPoolClick(pool)}>
                                    Invest
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <SidePanel
                title={`Invest in ${selectedPool?.name}`}
                isOpen={!!selectedPool}
                onClose={() => setSelectedPool(undefined)}
                content={close => <InvestForm pool={selectedPool} close={close} />}
            />
        </Loading>
    );
}