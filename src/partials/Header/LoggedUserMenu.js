import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/UserProvider';
import AdminMenu from './AdminMenu';

export default function LoggedUserMenu() {
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin ?? false;

    return (
        <>
            {isAdmin && <AdminMenu />}
            <li>
                <Link
                    to="/signout"
                    replace={true}
                    className="font-medium text-teal-500 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                    Sign out
                </Link>
            </li>
        </>
    );
}