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

const NUM_EVENTS = 20;

function Events() {
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [events, setEvents] = useState();
    const [actions, setActions] = useState([]);
    const [selectedAction, setSelectedAction] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setEvents(undefined);
            const { events, total } = await http({ url: `/events?skip=${page * NUM_EVENTS}&limit=${NUM_EVENTS}` });
            const actions = [];
            for (const event of events) {
                if (actions.indexOf(event.name) < 0) {
                    actions.push(event.name);
                }
            }
            setEvents(events);
            setActions(actions);
            setTotal(total);
        };
        fetchData();
    }, [page]);

    return (
        <LoggedPage title="Events" admin>
            <Loading if={!events}>
                <Table title={
                    <div className="flex flex-row items-center">
                        <span className="flex-grow">
                            Page {page + 1} of {Math.ceil(total / NUM_EVENTS)}
                        </span>
                        <span className="text-gray-400 text-xs">
                            {NUM_EVENTS} events/page
                        </span>
                    </div>
                }>
                    <TableHead>
                        <TableRow>
                            <TableCell header>
                                <select className="form-input" value={selectedAction} onChange={e => setSelectedAction(e.target.value)}>
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
                                                <div className="font-medium text-gray-200">
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
