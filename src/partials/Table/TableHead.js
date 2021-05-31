import React from 'react';

export default function TableHead(props) {
    return (
        <thead className="text-xs font-semibold uppercase text-gray-300 bg-darkblue-300 border-b border-darkblue-200">
            {props.children}
        </thead>
    );
}