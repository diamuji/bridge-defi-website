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
import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import { RATES } from './data';
import moment from 'moment';
import { CoinList } from './CoinList';

export default function PoolList() {
    const [pools, setPools] = useState();
    const history = useHistory();
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;
    const [selectedPool, setSelectedPool] = useState();
    const [visibleRows, setVisibleRows] = useState([]);
    const firstDate = moment(RATES[0].date);
    const xStepWidth = 3;

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
                                                            <CoinList content={feature}>
                                                                <Linkify className="text-lightblue-100">
                                                                    {feature}
                                                                </Linkify>
                                                            </CoinList>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-span-6 row-span-3 md:pt-4" style={{ maxHeight: 400 }}>
                                                <ResponsiveLine
                                                    data={[
                                                        {
                                                            id: 'data',
                                                            data: RATES.map(point => ({
                                                                x: point.date,
                                                                y: point.value
                                                            }))
                                                        }
                                                    ]}
                                                    margin={{ top: 5, left: 40, right: 5, bottom: 50 }}
                                                    xScale={{
                                                        type: 'time',
                                                        min: firstDate.subtract(xStepWidth, 'days').format('YYYY-MM-DD'),
                                                        format: '%Y-%m-%d',
                                                        precision: 'day',
                                                    }}
                                                    yScale={{ type: 'linear', min: 0, max: 20 }}
                                                    enableArea
                                                    areaOpacity={1}
                                                    axisTop={null}
                                                    axisRight={null}
                                                    axisLeft={{
                                                        orient: 'left',
                                                        format: value => value ? `${value} %` : '',
                                                        tickValues: 10,
                                                        tickSize: 0,
                                                        tickPadding: 10,
                                                        tickRotation: 0,
                                                    }}
                                                    axisBottom={{
                                                        orient: 'bottom',
                                                        format: value => {
                                                            const date = moment(value);
                                                            return date.isBefore(firstDate) ? '' : date.format('D MMM').toLowerCase();
                                                        },
                                                        tickValues: RATES
                                                            .filter((v, index) => index % xStepWidth === 0)
                                                            .map(point => new Date(point.date)),
                                                        tickSize: 0,
                                                        tickPadding: 10,
                                                        tickRotation: -90,
                                                    }}
                                                    enableGridX={true}
                                                    enableGridY={true}
                                                    gridYValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
                                                    gridXValues={RATES
                                                        .filter((v, index) => index % xStepWidth === 0)
                                                        .map(point => new Date(point.date))}
                                                    pointSymbol={() => <rect x="-2" y="-2" width="5" height="5" fill="#fff" />}
                                                    colors="#a8b0c6"
                                                    theme={{
                                                        textColor: '#fff',
                                                        axis: {
                                                            domain: {
                                                                line: {
                                                                    stroke: '#fff',
                                                                    strokeWidth: 1,
                                                                }
                                                            }
                                                        },
                                                        grid: {
                                                            line: {
                                                                stroke: '#203a59',
                                                                strokeWidth: 1,
                                                                strokeDasharray: '1 1',
                                                            }
                                                        }
                                                    }}
                                                    defs={[
                                                        linearGradientDef('gradientA', [
                                                            { offset: 0, color: '#a8b0c6', opacity: 0.8 },
                                                            { offset: 40, color: '#a8b0c6', opacity: 0.5 },
                                                            { offset: 100, color: '#a8b0c6', opacity: 0.1 },
                                                        ]),
                                                    ]}
                                                    fill={[{ match: '*', id: 'gradientA' }]}
                                                />
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