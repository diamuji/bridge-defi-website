import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { http } from '../../utils/utils';
import User from './User';

const USERS_PER_PAGE = 15;

function Users() {
    const [page] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await http({ url: `/admin/users?skip=${page * USERS_PER_PAGE}&limit=${USERS_PER_PAGE}` });
            setUsers(users);
        };
        fetchUsers();
    }, [page]);

    return (
        <LoggedPage>
            <div className="flex flex-col md:flex-row">
                <aside className="md:w-1/3 mb-16 md:mb-0 md:mr-10 md:flex-shrink-0" data-aos="fade-up" data-aos-delay="200">
                    <h4 className="text-lg font-medium px-3 pb-3 border-b border-gray-800">Users</h4>
                    <nav>
                        <ul>
                            {users.map((user, key) => (
                                <li key={key} className="border-b border-gray-800">
                                    <div
                                        className={`cursor-pointer py-2 px-3 group text-gray-400 leading-4 hover:text-purple-600 ${selectedUserId === user._id && 'text-purple-600'}`}
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
            </div>
        </LoggedPage>
    );
}

export default withRouter(Users);
