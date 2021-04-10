import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminMenu() {
    return (
        <>
            <li>
                <Link
                    to="/users"
                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                    Users
                </Link>
            </li>
        </>
    );
}