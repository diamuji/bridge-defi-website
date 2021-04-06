import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import Transition from '../utils/Transition.js';
import Logo from './Logo.js';
import { UserContext } from '../utils/UserProvider.js';

function Header(props) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const mobileNav = useRef(null);
    const userContext = useContext(UserContext);
    const { absolute } = props;

    // close the mobile menu on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!mobileNavOpen || mobileNav.current.contains(target)) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close the mobile menu if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!mobileNavOpen || keyCode !== 27) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <header className={"w-full " + (absolute === false ? "" : "absolute")}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">

                    <CookieConsent location="top">This website uses cookies to enhance the user experience.</CookieConsent>

                    {/* Site branding */}
                    <div className="flex-shrink-0 mr-5">
                        {/* Logo */}
                        <Link to="/" className="block" aria-label="Cruip">
                            <Logo className="w-8 h-8" />
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:flex-grow">
                        {/* Desktop sign in links */}
                        <ul className="flex flex-grow justify-end flex-wrap items-center">
                            {!userContext.fetching && userContext.me && (
                                <>
                                    <li>
                                        <Link
                                            to="/signout"
                                            replace={true}
                                            className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                        >
                                            Sign out
                                        </Link>
                                    </li>
                                </>
                            )}
                            {!userContext.fetching && !userContext.me && (
                                <>
                                    <li>
                                        <Link
                                            to="/signin"
                                            className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                        >
                                            Sign in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/signup"
                                            className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                                        >
                                            Sign up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>

                    {/* Mobile menu */}
                    <div className="inline-flex md:hidden">
                        {/* Hamburger button */}
                        <button className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                            <span className="sr-only">Menu</span>
                            <svg className="w-6 h-6 fill-current text-gray-900 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <rect y="4" width="24" height="2" rx="1" />
                                <rect y="11" width="24" height="2" rx="1" />
                                <rect y="18" width="24" height="2" rx="1" />
                            </svg>
                        </button>

                        {/*Mobile navigation */}
                        <Transition
                            show={mobileNavOpen}
                            tag="ul"
                            className="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg"
                            enter="transition ease-out duration-200 transform"
                            enterStart="opacity-0 -translate-x-full"
                            enterEnd="opacity-100 translate-x-0"
                            leave="transition ease-out duration-200"
                            leaveStart="opacity-100"
                            leaveEnd="opacity-0"
                        >
                            <nav id="mobile-nav" ref={mobileNav} className="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg">
                                <div className="py-6 pr-4 pl-20">
                                    {/* Logo */}
                                    <Logo className="w-8 h-8 mb-5" />

                                    {/* Links */}
                                    <ul>
                                        <li>
                                            <Link
                                                to="/help"
                                                className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2"
                                            >
                                                Help center
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/signup"
                                                className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2"
                                            >
                                                Sign up
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/signin"
                                                className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-2"
                                            >
                                                Sign in
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </Transition>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
