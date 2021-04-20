import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoggedPage from '../partials/LoggedPage';
import { UserContext } from '../utils/UserProvider';

function Dashboard() {
    const userContext = useContext(UserContext);
    const user = userContext?.me || {};
    const verified = user.verification
        && user.verification.personalInfo
        && user.verification.residenceAddress
        && user.verification.settlementAddress
        && user.verification.document
        && user.verification.document.documentType
        && user.verification.document.front
        && user.verification.document.retro
        && user.verification.document.profilePic;

    return (
        <LoggedPage>
            {!verified && !user.isAdmin && (
                <Link to="/verification" className="block mb-5 max-w-md mx-auto bg-gray-800 text-gray-300 hover:text-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="px-8 py-6 flex flex-row items-center justify-between ">
                        <div>
                            <div className="uppercase tracking-wide text-sm text-teal-400 font-semibold">
                                Verification
                            </div>
                            <div className="block mt-1 text-lg leading-tight font-medium">
                                Verify your account.
                            </div>
                        </div>
                        <svg className="ml-2 w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                    </div>
                </Link>
            )}

            {verified && (
                <div className="flex flex-row items-center">
                    User verified
                    <svg className="ml-2 h-4 text-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentcolor" />
                    </svg>
                </div>
            )}

            <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

                {/* Background illustration */}
                <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
                    <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                            <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                            <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                                <stop stopColor="#A5B4FC" offset="0%" />
                                <stop stopColor="#818CF8" offset="100%" />
                            </linearGradient>
                            <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                                <stop stopColor="#4338CA" offset="0%" />
                                <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
                            </linearGradient>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                            <g transform="rotate(64 36.592 105.604)">
                                <mask id="welcome-d" fill="#fff">
                                    <use xlinkHref="#welcome-a" />
                                </mask>
                                <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                                <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
                            </g>
                            <g transform="rotate(-51 91.324 -105.372)">
                                <mask id="welcome-f" fill="#fff">
                                    <use xlinkHref="#welcome-e" />
                                </mask>
                                <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                                <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
                            </g>
                            <g transform="rotate(44 61.546 392.623)">
                                <mask id="welcome-h" fill="#fff">
                                    <use xlinkHref="#welcome-g" />
                                </mask>
                                <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                                <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
                            </g>
                        </g>
                    </svg>
                </div>

                {/* Content */}
                <div className="relative">
                    <h1 className="text-2xl md:text-2xl text-gray-800 font-bold mb-1">
                        Welcome to Bridge DeFi
                    </h1>
                    <p className="text-gray-500">
                        Remove complexities and costs of managing exchanges and multiple wallets
                    </p>
                </div>
            </div>
        </LoggedPage>
    );
}

export default withRouter(Dashboard);
