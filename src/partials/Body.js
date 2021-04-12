import React from 'react';

export default function Body(props) {
    return (
        <div className={`z-10 ${props.className ?? ''}`}>
            {props.children}
        </div>
    );
}