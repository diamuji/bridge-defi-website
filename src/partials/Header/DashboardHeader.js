import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/UserProvider';
import DropdownMenu from './DropdownMenu';

export default function DashboardHeader(props) {
    const userContext = useContext(UserContext);

    return (
        <header className="sticky top-0 z-30 bg-darkblue-100">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-6 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            className="text-gray-500 hover:text-gray-600 lg:hidden"
                            onClick={() => props.onMenuToggle()}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="5" width="16" height="2" />
                                <rect x="4" y="11" width="16" height="2" />
                                <rect x="4" y="17" width="16" height="2" />
                            </svg>
                        </button>
                    </div>

                    <h1 className="flex-grow text-2xl text-gray-200 font-bold flex flex-row">
                        {props.title || <>&nbsp;</>}
                    </h1>

                    {/* Header: Right side */}
                    <div className="flex items-center">
                        {/* User button */}
                        <DropdownMenu
                            button={
                                <>
                                    <span className="sr-only">User</span>
                                    <svg className="w-4 h-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                        <path className="fill-current text-gray-500" d="M256,31C131.7,31,31,131.7,31,256s100.7,225,225,225s225-100.7,225-225S380.3,31,256,31z M256,118.1
                                            c44.1,0,79.8,35.7,79.8,79.8s-35.7,79.8-79.8,79.8s-79.8-35.7-79.8-79.8S211.9,118.1,256,118.1z M256,430.2
                                            c-53.3,0-101-24.1-132.9-61.9c17.1-32.1,50.4-54.3,89.4-54.3c2.2,0,4.4,0.4,6.4,1c11.8,3.8,24.1,6.3,37.1,6.3s25.4-2.4,37.1-6.3
                                            c2.1-0.6,4.3-1,6.4-1c38.9,0,72.3,22.1,89.4,54.3C357,406.1,309.3,430.2,256,430.2z"/>
                                    </svg>
                                </>
                            }
                        >
                            {userContext.me && (
                                <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
                                    <div className="font-medium text-gray-800">
                                        {userContext.me.firstName} {userContext.me.lastName}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {userContext.me.email}
                                    </div>
                                </div>
                            )}
                            <ul style={{ minWidth: 120 }}>
                                <li>
                                    <Link
                                        className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                                        to="/signout"
                                    >
                                        Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}