import React from 'react';
import { Link } from 'react-router-dom';

export default function NonLoggedUserMenu() {
    return (
        <>
            <li>
                <Link
                    to="/signin"
                    className="font-medium text-lightblue-100 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                    Sign in
            </Link>
            </li>
            <li>
                <Link
                    to="/signup"
                    className="btn-sm text-white bg-lightblue-100 hover:bg-lightblue-100 ml-3"
                >
                    Sign up
            </Link>
            </li>
        </>
    );
}