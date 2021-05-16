import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from '../partials/Loading';
import LoggedPage from '../partials/LoggedPage';
import Pagination from '../partials/Table/Paging';
import Table from '../partials/Table/Table';
import TableBody from '../partials/Table/TableBody';
import TableCell from '../partials/Table/TableCell';
import TableHead from '../partials/Table/TableHead';
import TableRow from '../partials/Table/TableRow';
import { http } from '../utils/utils';

const NUM_EVENTS = 50;

function Events() {
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [events, setEvents] = useState();
    const [actions, setActions] = useState([]);
    const [selectedAction, setSelectedAction] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const { events, total } = await http({ url: `/events?skip=${page * NUM_EVENTS}&limit=${NUM_EVENTS}` });
            const filteredEvents = events.reverse().slice(0, NUM_EVENTS);
            const actions = [];
            for (const event of filteredEvents) {
                if (actions.indexOf(event.name) < 0) {
                    actions.push(event.name);
                }
            }
            setEvents(filteredEvents);
            setActions(actions);
            setTotal(total);
        };
        fetchData();
    }, [page]);

    return (
        <LoggedPage admin>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl text-gray-800 font-bold">
                        Events
                    </h1>
                </div>
            </div>

            <Loading if={!events}>
                <Table title={`Last ${page + 1}-${Math.max((page + 2) * NUM_EVENTS, total)} events`}>
                    <TableHead>
                        <TableRow>
                            <TableCell header>
                                <select value={selectedAction} onChange={e => setSelectedAction(e.target.value)}>
                                    <option value="">All actions</option>
                                    {actions.map(action => (
                                        <option key={action}>{action}</option>
                                    ))}
                                </select>
                            </TableCell>
                            <TableCell header>Message / user</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!events?.length && (
                            <TableRow>
                                <TableCell colSpan="4">
                                    <i>No results</i>
                                </TableCell>
                            </TableRow>
                        )}
                        {(events || []).map(event => {
                            if (selectedAction && event.name !== selectedAction) {
                                return null;
                            } else {
                                return (
                                    <TableRow key={event._id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-gray-800">
                                                    {event.name}
                                                </div>
                                                <div className="text-xs">
                                                    {event.createdAt ? moment(event.createdAt).format('LLL') : '-'}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {event.message && (
                                                <pre
                                                    className="bg-gray-100 px-5 py-4 border rounded"
                                                    style={{ maxWidth: 600, maxHeight: 200, overflow: 'auto' }}
                                                >
                                                    {event.message}
                                                </pre>
                                            )}
                                            <div className="truncate text-xs mt-1 text-gray-500" title={event.user}>
                                                User: {event.user}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
                <Pagination
                    skip={page * NUM_EVENTS}
                    limit={NUM_EVENTS}
                    total={total}
                    prev={() => setPage(page - 1)}
                    next={() => setPage(page + 1)}
                />
            </Loading>
        </LoggedPage>
    );
}

export default withRouter(Events);
