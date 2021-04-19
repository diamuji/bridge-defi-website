import React from 'react';

export default function TableActions() {
    return (
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {/* Delete button */}
            <div className="table-items-action hidden">
                <div className="flex items-center">
                    <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span className="table-items-count"></span> items selected</div>
                    <button className="btn bg-white border-gray-200 hover:border-gray-300 text-red-500 hover:text-red-600">Delete</button>
                </div>
            </div>

            {/* Dropdown */}
            <div className="relative">
                <button
                    className="btn justify-between min-w-44 bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
                    aria-label="Select date range"
                    aria-haspopup="true"
                    // @click.prevent="open = !open"
                    // :aria-expanded="open" 
                >
                    <span className="flex items-center">
                        <svg className="w-4 h-4 fill-current text-gray-500 flex-shrink-0 mr-2" viewBox="0 0 16 16">
                            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                        </svg>
                        <span x-text="$refs.options.children[selected].children[1].innerHTML"></span>
                    </span>
                    <svg className="flex-shrink-0 ml-1 fill-current text-gray-400" width="11" height="7" viewBox="0 0 11 7">
                        <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                    </svg>
                </button>
                <div
                    className="z-10 absolute top-full right-0 w-full bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"                
                    // @click.away="open = false"
                    // @keydown.escape.window="open = false"
                    // x-show="open"
                    // x-transition:enter="transition ease-out duration-100 transform"
                    // x-transition:enter-start="opacity-0 -translate-y-2"
                    // x-transition:enter-end="opacity-100 translate-y-0"
                    // x-transition:leave="transition ease-out duration-100"
                    // x-transition:leave-start="opacity-100"
                    // x-transition:leave-end="opacity-0"
                    // x-cloak                
                >
                    <ul className="font-medium text-sm text-gray-600" x-ref="options">
                        <li
                            tabindex="0"
                            className="flex items-center hover:bg-gray-50 py-1 px-3 cursor-pointer"
                            // :className="selected === 0 && 'text-indigo-500'"
                            // @click="selected = 0;open = false"
                            // @keydown.enter="selected = 0;open = false"
                            // @focus="open = true"
                            // @focusout="open = false"
                        >
                            <svg className={`flex-shrink-0 mr-2 fill-current text-indigo-500 ${selected !== 0 && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                                <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                            <span>Today</span>
                        </li>
                        <li
                            tabindex="0"
                            className="flex items-center hover:bg-gray-50 py-1 px-3 cursor-pointer"
                            // :className="selected === 1 && 'text-indigo-500'"
                            // @click="selected = 1;open = false"
                            // @keydown.enter="selected = 1;open = false"
                            // @focus="open = true"
                            // @focusout="open = false"
                        >
                            <svg className={`flex-shrink-0 mr-2 fill-current text-indigo-500 ${selected !== 1 && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                                <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                            <span>Last 7 Days</span>
                        </li>
                        <li
                            tabindex="0"
                            className="flex items-center hover:bg-gray-50 py-1 px-3 cursor-pointer"
                            // :className="selected === 2 && 'text-indigo-500'"
                            // @click="selected = 2;open = false"
                            // @keydown.enter="selected = 2;open = false"
                            // @focus="open = true"
                            // @focusout="open = false"                                        
                        >
                            <svg className={`flex-shrink-0 mr-2 fill-current text-indigo-500 ${selected !== 2 && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                                <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                            <span>Last Month</span>
                        </li>
                        <li
                            tabindex="0"
                            className="flex items-center hover:bg-gray-50 py-1 px-3 cursor-pointer"
                            // :className="selected === 3 && 'text-indigo-500'"
                            // @click="selected = 3;open = false"
                            // @keydown.enter="selected = 3;open = false"
                            // @focus="open = true"
                            // @focusout="open = false"                                        
                        >
                            <svg className={`flex-shrink-0 mr-2 fill-current text-indigo-500 ${selected !== 3 && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                                <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                            <span>Last 12 Months</span>
                        </li>
                        <li
                            tabindex="0"
                            className="flex items-center hover:bg-gray-50 py-1 px-3 cursor-pointer"
                            // :className="selected === 4 && 'text-indigo-500'"
                            // @click="selected = 4;open = false"
                            // @keydown.enter="selected = 4;open = false"
                            // @focus="open = true"
                            // @focusout="open = false"                                        
                        >
                            <svg className={`flex-shrink-0 mr-2 fill-current text-indigo-500 ${selected !== 4 && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                                <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                            <span>All Time</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Filter button */}
            <div className="relative inline-flex">
                <button className="btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Filter</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                        <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
                    </svg>
                </button>
            </div>

            {/* Add customer button */}
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg className="w-4 h-4 fill-current opacity-50 flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2">Add Customer</span>
            </button>                            
            
        </div>
    );
}