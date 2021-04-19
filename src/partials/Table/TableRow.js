import React from 'react';

export default function TableRow(props) {
    return (
        <tr className={props.className} onClick={props.onClick}>
            {props.children}
        </tr>
    );
}