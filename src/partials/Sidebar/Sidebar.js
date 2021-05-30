import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../utils/UserProvider';
import Logo from '../Logo';
import MENU from './MENU';

export default function Sidebar(props) {
    const sidebarOpen = props.open;
    const toggleSidebar = props.toggle;
    const location = useLocation();
    const page = location.pathname;
    const userContext = useContext(UserContext);
    const isAdmin = userContext.me?.isAdmin;

    return (
        <div className="lg:w-64">
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => toggleSidebar()}
            >
            </div>
            
            {/* Sidebar */}
            <div className={`
                absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll
                lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 p-4 transition-transform duration-200 ease-in-out
                bg-darkblue-100 border-r border-gray-600
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}
            `}>
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        className="lg:hidden text-gray-500 hover:text-gray-400"
                        onClick={() => toggleSidebar()}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link className="block" to="/dashboard">
                        <Logo className="h-5" />
                    </Link>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">Pages</h3>
                    <ul className="mt-3">
                        {MENU.filter(item => !item.admin || isAdmin).map((item, key) => (
                            <li key={key} className="mb-0.5 last:mb-0">
                                <Link
                                    className={`
                                        block px-3 py-2 text-gray-200 rounded hover:text-white transition duration-150
                                        flex items-center justify-between
                                        ${page.indexOf(item.url) === 0 && 'bg-darkblue-200 hover:text-gray-200'}
                                        ${item.disabled && 'opacity-60 cursor-default'}
                                    `}
                                    to={item.url}
                                    onClick={e => {
                                        if (item.disabled) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <span className={`flex flex-grow ${page.indexOf(item.url) === 0 && 'text-lightblue-100'}`}>
                                        {item.icon(page.indexOf(item.url) === 0)}
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </span>
                                    {item.badge}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}