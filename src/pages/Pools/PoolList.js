import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
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
    const [visibleRows, setVisibleRows] = useState([]);

    const fetchPools = useCallback(async () => {
        const pools = await http({ url: '/pool' });
        setPools(pools || []);
    }, []);
    const onPoolClick = (pool) => () => {
        if (isAdmin) {
            history.push(`/pools/${pool._id}`);
        } else {
            const index = visibleRows.indexOf(pool._id);
            const isVisible = index >= 0;
            if (isVisible) {
                visibleRows.splice(index, 1);
            } else {
                visibleRows.push(pool._id);
            }
            setVisibleRows(visibleRows.slice());
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
                    {pools && pools.map(pool => (
                        <Fragment key={pool._id}>
                            <TableRow className="cursor-pointer hover:bg-gray-100" onClick={onPoolClick(pool)}>
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
                            {visibleRows.indexOf(pool._id) >= 0 && (
                                <TableRow className="bg-gray-50">
                                    <TableCell colSpan="6" className="whitespace-normal">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 whitespace-normal">
                                            <div className="col-span-1 md:col-span-3">
                                                <span className="text-xs tracking-wide uppercase text-gray-500">Description</span>
                                                <div className="text-sm overflow-hidden whitespace-normal">
                                                    {pool.description.protocolDescription}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-xs tracking-wide uppercase text-gray-500">Features</span>
                                                <ul>
                                                    {(pool.description.features || []).map((feature, index) => (
                                                        <li key={index} className="border-b last:border-b-0 py-1">{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <span className="text-xs tracking-wide uppercase text-gray-500">Sources of profit</span>
                                                <ul>
                                                    {(pool.description.sourceOfProfit || []).map((source, index) => (
                                                        <li key={index} className="border-b last:border-b-0 py-1">{source}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <span className="text-xs tracking-wide uppercase text-gray-500">Details</span>
                                                <ul>
                                                    {(pool.description.details || []).map((detail, index) => (
                                                        <li key={index} className="border-b last:border-b-0 py-1">
                                                            {detail.title}
                                                            <div className="text-xs">{detail.data}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </Fragment>
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