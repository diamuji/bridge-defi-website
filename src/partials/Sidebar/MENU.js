import React from 'react';

export default [
    {
        url: '/dashboard',
        label: 'Dashboard',
        icon: active => (
            <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-200'}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                <path className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-300'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
            </svg>
        )
    },
    {
        url: '/users',
        label: 'Users',
        icon: active => (
            <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                <path className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
            </svg>
        ),
        admin: true,
    },
    {
        url: '/transactions',
        label: 'Transactions',
        icon: active => (
            <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} d="M7 0l6 7H8v10H6V7H1z" />
                <path className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} d="M18 7v10h5l-6 7-6-7h5V7z" />
            </svg>
        ),
    },
    {
        url: '/investments',
        label: 'Investments',
        icon: active => (
            <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                {/* <path className={`fill-current ${!active ? 'text-gray-700' : 'text-teal-600'}`} d="M12 10l12 7-12 7-12-7z" />
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-teal-300'}`} d="M12 5l12 7-12 7-12-7z" />
                <path className={`fill-current ${!active ? 'text-gray-300' : 'text-teal-200'}`} d="M12 0l12 7-12 7L0 7z" /> */}
                <path className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                <path className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />
            </svg>
        ),
    },
    {
        url: '/pools',
        label: 'Pools',
        icon: active => (
            <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                <circle className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} cx="18.5" cy="5.5" r="4.5" />
                <circle className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} cx="5.5" cy="5.5" r="4.5" />
                <circle className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} cx="18.5" cy="18.5" r="4.5" />
                <circle className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} cx="5.5" cy="18.5" r="4.5" />
            </svg>
        ),
    },
    // {
    //     url: '/team',
    //     label: 'Team',
    //     icon: active => (
    //         <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
    //             <path className={`fill-current ${!active ? 'text-gray-400' : 'text-teal-300'}`} d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
    //             <path className={`fill-current ${!active ? 'text-gray-700' : 'text-teal-600'}`} d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
    //             <path className={`fill-current ${!active ? 'text-gray-600' : 'text-teal-500'}`} d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />
    //         </svg>
    //     ),
    //     disabled: true,
    // },
    // {
    //     url: '/messages',
    //     label: 'Messages',
    //     icon: active => (
    //         <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
    //             <path className={`fill-current ${!active ? 'text-gray-600' : 'text-teal-500'}`} d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
    //             <path className={`fill-current ${!active ? 'text-gray-400' : 'text-teal-300'}`} d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
    //         </svg>
    //     ),
    //     badge: (
    //         <div className="flex flex-shrink-0 ml-2">
    //             <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-teal-500 px-2 rounded-sm">
    //                 4
    //             </span>
    //         </div>
    //     ),
    //     disabled: true,
    // },
    // {
    //     url: '/tasks',
    //     label: 'Tasks',
    //     icon: active => (
    //         <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
    //             <path className={`fill-current ${!active ? 'text-gray-600' : 'text-teal-500'}`} d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z" />
    //             <path className={`fill-current ${!active ? 'text-gray-600' : 'text-teal-500'}`} d="M1 1h22v23H1z" />
    //             <path className={`fill-current ${!active ? 'text-gray-400' : 'text-teal-300'}`} d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z" />
    //         </svg>
    //     ),
    //     disabled: true,
    // },
    // {
    //     url: '/settings',
    //     label: 'Settings',
    //     icon: active => (
    //         <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
    //             <path className={`fill-current ${!active ? 'text-gray-600' : 'text-teal-500'}`} d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
    //             <path className={`fill-current ${!active ? 'text-gray-400' : 'text-teal-300'}`} d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
    //             <path className={`fill-current ${!active ? 'text-gray-600' : 'text-teal-500'}`} d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
    //             <path className={`fill-current ${!active ? 'text-gray-400' : 'text-teal-300'}`} d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />
    //         </svg>
    //     ),
    //     disabled: true,
    // },
    {
        url: '/events',
        label: 'Events',
        icon: active => (
            <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                <path className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z" />
                <path className={`fill-current ${!active ? 'text-gray-600' : 'text-lightblue-200'}`} d="M1 1h22v23H1z" />
                <path className={`fill-current ${!active ? 'text-gray-400' : 'text-lightblue-100'}`} d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z" />
            </svg>
        ),
        admin: true,
    },
];