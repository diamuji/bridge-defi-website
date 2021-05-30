import React from 'react';

export default function TableHead(props) {
    return (
        <thead className="text-xs font-semibold uppercase text-gray-300 bg-darkblue-300 border-t border-b border-gray-600">
            {props.children}
        </thead>
    );
}