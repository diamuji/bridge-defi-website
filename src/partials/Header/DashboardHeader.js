import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

export default function DashboardHeader(props) {
    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
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

                    {/* Header: Right side */}
                    <div className="flex items-center">
                        {/* Search button */}
                        {/* <SearchDialog>
                            <span className="sr-only">Search</span>
                            <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path className="fill-current text-gray-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                                <path className="fill-current text-gray-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                            </svg>
                        </SearchDialog> */}

                        {/* Notifications button */}
                        {/* <DropdownMenu
                            button={(
                                <>
                                    <span className="sr-only">Notifications</span>
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path className="fill-current text-gray-500" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" />
                                        <path className="fill-current text-gray-400" d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z" />
                                    </svg>
                                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></div>
                                </>
                            )}
                        >
                            <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">Notifications</div>
                            <ul>
                                <li className="border-b border-gray-200 last:border-0">
                                    <a
                                        className="block py-2 px-4 hover:bg-gray-50"
                                        href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                    >
                                        <span className="block text-sm mb-2"><span className="font-medium text-gray-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                                        <span className="block text-xs font-medium text-gray-400">Feb 12, 2021</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-200 last:border-0">
                                    <a
                                        className="block py-2 px-4 hover:bg-gray-50"
                                        href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                    >
                                        <span className="block text-sm mb-2"><span className="font-medium text-gray-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                                        <span className="block text-xs font-medium text-gray-400">Feb 9, 2021</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-200 last:border-0">
                                    <a
                                        className="block py-2 px-4 hover:bg-gray-50"
                                        href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                    >
                                        <span className="block text-sm mb-2"><span className="font-medium text-gray-800">Say goodbye to paper receipts!</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                                        <span className="block text-xs font-medium text-gray-400">Jan 24, 2020</span>
                                    </a>
                                </li>
                            </ul>
                        </DropdownMenu> */}

                        {/* Info button */}
                        {/* <DropdownMenu
                            button={(
                                <>
                                    <span className="sr-only">Info</span>
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path className="fill-current text-gray-500" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                                    </svg>
                                </>
                            )}
                        >
                            <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-3">Need help?</div>
                            <ul>
                                <li>
                                    <a
                                        className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                                        href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                    >
                                        <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                                            <rect y="3" width="12" height="9" rx="1" />
                                            <path d="M2 0h8v2H2z" />
                                        </svg>
                                        <span>Documentation</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                                        href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                    >
                                        <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                                            <path d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM10 7L8.207 5.207l-3 3-1.414-1.414 3-3L5 2h5v5z" />
                                        </svg>
                                        <span>Support Site</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                                        href="#0"
                                        // @click="open = false"
                                        // @focus="open = true"
                                        // @focusout="open = false"
                                    >
                                        <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                                            <path d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z" />
                                        </svg>
                                        <span>Contact us</span>
                                    </a>
                                </li>
                            </ul>
                        </DropdownMenu> */}

                        {/* Divider */}
                        {/* <hr className="w-px h-6 bg-gray-200 mx-3" /> */}

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