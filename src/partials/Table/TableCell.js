import React from 'react';

export default function TableCell(props) {
    const className = `px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ${props.className || ''}`;

    if (props.header) {
        return (
            <th className={`text-left ${className}`} style={props.style} colSpan={props.colSpan}>
                {props.children}
            </th>
        );
    } else {
        return (
            <td className={className} style={props.style} colSpan={props.colSpan}>
                {props.children}
            </td>
        );
    }
}