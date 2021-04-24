import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Loading from '../../partials/Loading';
import LoggedPage from '../../partials/LoggedPage';
import Table from '../../partials/Table/Table';
import TableBody from '../../partials/Table/TableBody';
import TableCell from '../../partials/Table/TableCell';
import TableHead from '../../partials/Table/TableHead';
import TableRow from '../../partials/Table/TableRow';
import { http } from '../../utils/utils';

const USERS_PER_PAGE = 5;

function Users() {
    const [page] = useState(0);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const goToUserPage = (userId) => {
        history.push(`/users/${userId}`);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await http({ url: `/admin/users?skip=${page * USERS_PER_PAGE}&limit=${USERS_PER_PAGE}` });
            setUsers(users);
        };
        fetchUsers();
    }, [page]);

    return (
        <LoggedPage admin>
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl text-gray-800 font-bold">Users</h1>
                </div>

                {/* Right: Actions */}
                {/* <%= require('html-loader!./partials/table-actions.html') %> */}

            </div>

            <Loading if={!users?.length} className="py-5">
                <Table title="Users">
                    <TableHead>
                        <TableRow>
                            <TableCell header>Name</TableCell>
                            <TableCell header className="text-center w-24">Confirmed</TableCell>
                            <TableCell header className="text-center w-24">Admin</TableCell>
                            <TableCell header className="text-center w-24">Enabled</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => goToUserPage(user._id)}>
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-gray-800">{user.firstName} {user.lastName}</div>
                                        <div className="text-xs">{user.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className={!user.confirmed ? 'text-red-500' : ''}>{user.confirmed ? 'true' : 'false'}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    {user.isAdmin ? 'true' : 'false'}
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className={!user.enabled ? 'text-red-500' : ''}>{user.enabled ? 'true' : 'false'}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Loading>

            {/* <div className="flex flex-col md:flex-row">
                <aside className="md:w-1/3 mb-16 md:mb-0 md:mr-10 md:flex-shrink-0" data-aos="fade-up" data-aos-delay="200">
                    <h4 className="text-lg font-medium px-3 pb-3 border-b border-gray-800">Users</h4>
                    <nav>
                        <ul className="overflow-auto h-96">
                            {users.map((user, key) => (
                                <li key={key} className="border-b border-gray-800">
                                    <div
                                        className={`cursor-pointer py-2 px-3 group text-gray-400 leading-4 ${selectedUserId === user._id ? 'text-teal-500' : 'hover:text-gray-100'}`}
                                        onClick={() => setSelectedUserId(user._id)}
                                    >
                                        {user.firstName} {user.lastName}
                                        <div className="text-xs opacity-75">{user.email}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="md:flex-auto order-1" data-aos="fade-up">
                    {selectedUserId && <User id={selectedUserId} />}
                </main>
            </div> */}
        </LoggedPage>
    );
}

export default withRouter(Users);
