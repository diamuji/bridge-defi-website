import React from 'react';

export default function TableRow(props) {
    return (
        <tr className={props.className} onClick={props.onClick} style={props.style}>
            {props.children}
        </tr>
    );
}