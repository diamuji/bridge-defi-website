import React from 'react';

export default function TableBody(props) {
    return (
        <tbody className="text-sm divide-y divide-gray-200">
            {props.children}
        </tbody>
    );
}