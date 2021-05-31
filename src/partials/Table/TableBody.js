import React from 'react';

export default function TableBody(props) {
    return (
        <tbody className="text-sm divide-y divide-darkblue-300">
            {props.children}
        </tbody>
    );
}