import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import LoggedPage from '../../partials/LoggedPage';
import PersonalData from './PersonalData';
import ResidenceAddress from './ResidenceAddress';

const pages = {
    1: { title: 'Personal data', component: PersonalData },
    2: { title: 'Residence address', component: ResidenceAddress },
    3: { title: 'Living address', component: PersonalData },
    4: { title: 'Verify your document', component: PersonalData },
};

function Verification() {
    const [page, setPage] = useState(1);

    return (
        <LoggedPage>
            <div className="flex flex-col md:flex-row">
                <aside className="md:w-64 mb-16 md:mb-0 md:mr-10 md:flex-shrink-0" data-aos="fade-up" data-aos-delay="200">
                    <h4 className="text-lg font-medium px-3 pb-3 border-b border-gray-800">Complete your profile</h4>
                    <nav>
                        <ul>
                            {Object.keys(pages).map((pageId, key) => (
                                <li key={key} className="border-b border-gray-800">
                                    <div
                                        className={`cursor-pointer flex items-center py-2 px-3 group text-gray-400 hover:text-purple-600 transition duration-150 ease-in-out ${page === parseInt(pageId) && 'text-purple-600'}`}
                                        onClick={() => setPage(parseInt(pageId))}
                                    >
                                        {pages[pageId].title}
                                        <svg className="w-3 h-3 fill-current flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-purple-600 group-hover:translate-x-1 transition duration-150 ease-in-out transform" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
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
