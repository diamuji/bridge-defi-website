import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import { UserContext } from '../../utils/UserProvider';
import PersonalData from './PersonalData';
import ResidenceAddress from './ResidenceAddress';
import SettlementAddress from './SettlementAddress';
import Document from './Document';
import ProfilePicture from './ProfilePicture';

const pages = {
    1: { title: 'Personal data', component: PersonalData, section: 'personalInfo' },
    2: { title: 'Residence address', component: ResidenceAddress, section: 'residenceAddress' },
    3: { title: 'Settlement address', component: SettlementAddress, section: 'settlementAddress' },
    4: { title: 'Verify your document', component: Document, section: 'document', subsections: ['documentType', 'front', 'retro'] },
    5: { title: 'Profile picture', component: ProfilePicture, section: 'document', subsections: ['profilePic'] },
};

function Verification() {
    const [page, setPage] = useState(1);
    const userContext = useContext(UserContext);
    const verification = userContext?.me?.verification || {};

    return (
        <LoggedPage>
            <div className="flex flex-col md:flex-row">
                <aside className="md:w-64 mb-16 md:mb-0 md:mr-10 md:flex-shrink-0" data-aos="fade-up" data-aos-delay="200">
                    <h4 className="text-lg font-medium px-3 pb-3 border-b border-gray-400">Complete your profile</h4>
                    <nav>
                        <ul>
                            {Object.keys(pages).map((pageId, key) => {
                                const isValid = !pages[pageId].subsections
                                    ? verification[pages[pageId].section]
                                    : pages[pageId].subsections.filter(subsection => {
                                            return !!verification[pages[pageId].section] && !!verification[pages[pageId].section][subsection];
                                        }).length === pages[pageId].subsections.length;
                                
                                return (
                                    <li key={key} className="border-b border-gray-400">
                                        <div
                                            className={`cursor-pointer flex items-center py-2 px-3 group text-gray-600 hover:text-lightblue-200 transition duration-150 ease-in-out ${page === parseInt(pageId) && 'text-lightblue-100'}`}
                                            onClick={() => setPage(parseInt(pageId))}
                                        >
                                            {pages[pageId].title}
                                            {isValid && (
                                                <svg className="ml-2 h-4 text-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentcolor" />
                                                </svg>
                                            )}
                                            <svg className="ml-2 w-3 h-3 fill-current flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:text-lightblue-100 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                                            </svg>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                <main className="md:flex-auto md:pl-10 order-1" data-aos="fade-up">
                    {Object.keys(pages).map((pageId, key) => {
                        const Component = pages[pageId].component;
                        return page === parseInt(pageId) ? <Component key={key} /> : null;
                    })}
                </main>
            </div>
        </LoggedPage>
    );
}

export default withRouter(Verification);
