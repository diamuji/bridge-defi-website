import React from 'react';

export default function Checkmark(props) {
    return (
        <svg className={`inline w-5 h-5 ${props.className}`} viewBox="0 0 24 24">
            <path
                d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                className="fill-current"
            />
        </svg>
    );
}