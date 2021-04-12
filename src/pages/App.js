import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoggedPage from '../partials/LoggedPage';
import { UserContext } from '../utils/UserProvider';

function App() {
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
            {!verified && (
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
        </LoggedPage>
    );
}

export default withRouter(App);
