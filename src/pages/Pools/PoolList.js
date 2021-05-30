import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loading from '../../partials/Loading';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableRow from '../../partials/Table/TableRow';
import Linkify from '../../utils/Linkify';
import SidePanel from '../../utils/SidePanel';
import { UserContext } from '../../utils/UserProvider';
import { http } from '../../utils/utils';
import InvestForm from './InvestForm';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Label, ResponsiveContainer, Area } from 'recharts';
import { RATES } from './data';
import moment from 'moment';

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
            <Table>
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
                            <TableRow className="cursor-pointer hover:bg-lightblue-400 font-bold" onClick={onPoolClick(pool)}>
                                <TableCell>
                                    <span className="text-base">{pool.name}</span>
                                    <div className={`text-xs ${pool.active ? 'text-green-500' : 'text-red-500'}`}>
                                        {isAdmin
                                            ? pool.active ? 'active' : 'not active'
                                            : ''}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="uppercase">APY Yearly</span>
                                    <span className="text-lightblue-100 ml-3">{pool.apyYearly} %</span>
                                </TableCell>
                                <TableCell>
                                    <span className="uppercase">APY Monthly</span>
                                    <span className="text-lightblue-100 ml-3">{pool.apyMonthly} %</span>
                                </TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <span className="uppercase">Available</span>
                                        <span className="text-lightblue-100 ml-3">{pool.balanceAvailable}</span>
                                    </TableCell>
                                )}
                                <TableCell>
                                    <span className="uppercase">Sold</span>
                                    <span className="text-lightblue-100 ml-3">{pool.balanceSold}</span>
                                </TableCell>
                                <TableCell className="whitespace-nowrap w-px">
                                    <button
                                        className="btn text-white bg-lightblue-100 hover:bg-lightblue-200 py-1 px-3"
                                        onClick={onSelectPoolClick(pool)}
                                    >
                                        Invest
                                    </button>
                                </TableCell>
                            </TableRow>
                            {visibleRows.indexOf(pool._id) >= 0 && (
                                <TableRow className="bg-darkblue-100">
                                    <TableCell colSpan="6">
                                        <div
                                            className="grid grid-cols-1 md:grid-cols-12 gap-5 whitespace-normal break-words mb-2"
                                            style={{ lineHeight: 1.4 }}
                                        >
                                            <div className="col-span-3">
                                                <div className="tracking-wide uppercase text-white mb-2 font-medium">Description</div>
                                                <div className="overflow-hidden whitespace-normal text-darkblue-400">
                                                    <Linkify>
                                                        {pool.description.protocolDescription}
                                                    </Linkify>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="tracking-wide uppercase text-white mb-2 font-medium">Features</div>
                                                <ul>
                                                    {(pool.description.features || []).map((feature, index) => (
                                                        <li key={index} className="text-darkblue-400 mb-1">
                                                            <Linkify className="text-lightblue-100">
                                                                {feature}
                                                            </Linkify>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-span-6 row-span-3" style={{ maxHeight: 300 }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <ComposedChart data={RATES}>
                                                        <defs>
                                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#5e6f8d" stopOpacity={0.6}/>
                                                                <stop offset="95%" stopColor="#203a59" stopOpacity={0.6}/>
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid
                                                            vertical
                                                            horizontal
                                                            stroke="#203a59"
                                                            strokeDasharray="3 3"
                                                        />
                                                        <YAxis
                                                            type="number"
                                                            tickLine={false}
                                                            stroke="#fff"
                                                            unit="%"
                                                            domain={[ 0, 20 ]}
                                                        >
                                                            <Label position="left" />
                                                        </YAxis>
                                                        <XAxis
                                                            tickLine={false}
                                                            stroke="#fff"
                                                            dataKey="date"
                                                            padding={{ left: 20, top: 20 }}
                                                            allowDataOverflow={true}
                                                            tickFormatter={value => moment(value).format('D MMM')}
                                                        />
                                                        <Area
                                                            type="linear"
                                                            dataKey="value"
                                                            isAnimationActive={false}
                                                            strokeWidth={2}
                                                            fillOpacity={1}
                                                            fill="url(#colorUv)"
                                                        />
                                                        <Line
                                                            type="linear"
                                                            isAnimationActive={false}
                                                            dataKey="value"
                                                            stroke="#a8b0c6"
                                                            strokeWidth="3"
                                                            dot={({ cx, cy, key }) => (
                                                                <rect key={key} x={cx - 4} y={cy - 4} width="7" height="9" fill="#fff" />
                                                            )}
                                                        />
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <div className="col-span-3 row-span-2">
                                                <div className="tracking-wide uppercase text-white mb-2 font-medium">Details</div>
                                                <ul>
                                                    {(pool.description.details || []).map((detail, index) => (
                                                        <li key={index} className="text-darkblue-400 mb-2">
                                                            <div className="text-white font-medium mb-0">{detail.title}</div>
                                                            <div>{detail.data}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="tracking-wide uppercase text-white mb-2 font-medium">Sources of profit</div>
                                                <ul>
                                                    {(pool.description.sourceOfProfit || []).map((source, index) => (
                                                        <li key={index} className="text-darkblue-400 mb-1">
                                                            <Linkify>
                                                                {source}
                                                            </Linkify>
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