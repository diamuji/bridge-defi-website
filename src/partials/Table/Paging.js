import React from 'react';

export default function Pagination(props) {
    const { skip, limit, total, prev, next } = props;
    const prevDisabled = skip <= 0;
    const nextDisabled = skip + limit >= total;
    const onClickPrev = e => {
        e.preventDefault();
        if (prev && !prevDisabled) prev();
    };
    const onClickNext = e => {
        e.preventDefault();
        if (next && !nextDisabled) next();
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-5">
            <nav className="mb-4 sm:order-1" role="navigation" aria-label="Navigation">
                <ul className="flex justify-center">
                    <li className="ml-3 first:ml-0">
                        <a
                            className={`
                                btn bg-white border-gray-200 w-32 py-2 px-0 whitespace-nowrap
                                ${prevDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:border-gray-300 text-indigo-500'}
                            `}
                            href="#0"
                            disabled={prevDisabled}
                            onClick={onClickPrev}
                        >
                            <svg viewBox="0 0 24 24" className="w-5 mr-1">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentcolor" />
                            </svg>
                            Previous
                        </a>
                    </li>
                    <li className="ml-3 first:ml-0">
                        <a
                            className={`
                                btn bg-white border-gray-200 w-32 py-2 px-0 whitespace-nowrap
                                ${nextDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:border-gray-300 text-indigo-500'}
                            `}
                            href="#0"
                            disabled={nextDisabled}
                            onClick={onClickNext}
                        >
                            Next
                            <svg viewBox="0 0 24 24" className="w-5 ml-1">
                                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentcolor" />
                            </svg>
                        </a>
                    </li>            
                </ul>
            </nav>
            <div className="text-sm text-gray-500 text-center sm:text-left">
                Showing
                <span className="font-medium text-gray-600 mx-1">{skip + 1}</span>
                to
                <span className="font-medium text-gray-600 mx-1">{Math.min(skip + limit, total)}</span>
                of
                <span className="font-medium text-gray-600 mx-1">{total}</span>
                results
            </div>
        </div>
    );
}