import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import Portfolio from './Portfolio';
import Exchange from './Exchange/Exchange';
import VerificationBanner from './VerificationBanner';

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
            {!verified && !user.isAdmin && <VerificationBanner />}

            {verified && (
                <div className="flex flex-row items-center">
                    User verified
                    <svg className="ml-2 h-4 text-green-500" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentcolor" />
                    </svg>
                </div>
            )}

            <div className="flex flex-col items-center sm:flex-row sm:items-start">
                <Exchange className="mb-10 sm:mr-10 order-1 sm:order-none" />
                <Portfolio className="mb-10 flex-grow-0" />
            </div>

        </LoggedPage>
    );
}

export default withRouter(Dashboard);
