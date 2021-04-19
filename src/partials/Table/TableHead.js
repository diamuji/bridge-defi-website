import React from 'react';

export default function TableHead(props) {
    return (
        <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
            {props.children}
        </thead>
    );
}