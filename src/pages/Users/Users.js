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
        <LoggedPage admin title="Users">

            <Loading if={!users?.length} className="pb-5">
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
        </LoggedPage>
    );
}

export default withRouter(Users);
